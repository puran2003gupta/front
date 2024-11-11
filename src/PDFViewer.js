import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import io from 'socket.io-client';
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
const socket = io('https://server-dzcy.onrender.com');

function PDFViewer({ pdfUrl, isAdmin }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        socket.on('pageChange', (page) => {
            setPageNumber(page);
        });

        return () => {
            socket.off('pageChange');
        };
    }, []);

    const handlePageChange = (newPage) => {
        setPageNumber(newPage);
        if (isAdmin) {
            socket.emit('changePage', newPage);
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="pdf-viewer-container">
            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error) => console.error('Error loading PDF: ', error)}
                className="pdf-document"
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p className="pdf-info">
                Page {pageNumber} of {numPages}
            </p>
            {isAdmin && (
                <div className="pdf-navigation">
                    <button
                        onClick={() => handlePageChange(pageNumber - 1)}
                        disabled={pageNumber <= 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(pageNumber + 1)}
                        disabled={pageNumber >= numPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default PDFViewer;
