import useWindowDimensions from '../hooks/useWindowDimensions';
import { useEffect, useState } from 'react';
import Link from 'next/link';
// import default react-pdf entry
import { Document, Page, pdfjs } from 'react-pdf';
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from '../pdf-worker';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfViewer(props) {
    const { width } = useWindowDimensions();
    console.log('width', width);
    const [numPages, setNumPages] = useState(null);
    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }
    function base64ToArrayBuffer(data) {
        var bString = window.atob(data);
        var bLength = bString.length;
        var bytes = new Uint8Array(bLength);
        for (var i = 0; i < bLength; i++) {
            var ascii = bString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }
    function base64toPDF() {
        var bufferArray = base64ToArrayBuffer(props.file);
        var blobStore = new Blob([bufferArray], { type: 'application/pdf' });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blobStore);
            return;
        }
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement('a');
        document.body.appendChild(link);

        //download PDF
        link.href = data;
        link.download = 'CarePlan.pdf';
        link.click();
        window.URL.revokeObjectURL(data);
        link.remove();

        // Open PDF
        // window.open(data);
    }
    return (
        <>
            <div className="p-5 flex items-center">
                <button
                    onClick={base64toPDF}
                    className="cursor-pointer mr-4 bg-blue-750 py-2 px-4 border-b-4 border-blue-950 text-lg font-bold text-white hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-750"
                >
                    Download
                </button>
                <Link
                    href={'/documents/' + props.query}
                    className="font-bold text-black hover:underline"
                >
                    Back
                </Link>
            </div>
            <Document
                file={`data:application/pdf;base64,${props.file}`}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {Array.from({ length: numPages }, (_, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={width > 1023 ? 815 : width}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                    />
                ))}
            </Document>
        </>
    );
}
