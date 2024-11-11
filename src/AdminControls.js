import React from 'react';

function AdminControls({ pageNumber, numPages, onPrevious, onNext }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <button onClick={onPrevious} disabled={pageNumber <= 1}>
                Previous
            </button>
            <button onClick={onNext} disabled={pageNumber >= numPages}>
                Next
            </button>
        </div>
    );
}

export default AdminControls;
