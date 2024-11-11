import React, { useState } from 'react';
import PDFViewer from './PDFViewer';
import './PDFViewer.css'; 
function App() {
    const [isAdmin, setIsAdmin] = useState(true); 
    const pdfUrl = "/Research.pdf"; 

    return (
        <div>
            <h1>Real-Time PDF Co-Viewer</h1>
            <h4>Made by Puran kumar gupta (21BCE2877)</h4>
            <PDFViewer pdfUrl={pdfUrl} isAdmin={isAdmin} />
            <div className='pdf-navigation'>
              <button  onClick={() => setIsAdmin(!isAdmin)}>
                  Toggle Role: {isAdmin ? 'Admin' : 'Viewer'}
              </button>
            </div>
        </div>
    );
}

export default App;
