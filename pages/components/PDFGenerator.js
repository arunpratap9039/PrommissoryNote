import { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import Draggable from 'react-draggable';
import { saveAs } from 'file-saver';

export default function PDFGenerator({ template, formData }) {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [signatures, setSignatures] = useState({ lender: null, borrower: null });

    const generatePdf = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);
        const { width, height } = page.getSize();

        const text = template(formData);

        page.drawText(text, {
            x: 50,
            y: height - 50,
            size: 12,
            lineHeight: 20,
            color: rgb(0, 0, 0)
        });

        const pdfBytes = await pdfDoc.save();
        const pdfUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
        setPdfUrl(pdfUrl);
    };

    const handleDownload = () => {
        if (pdfUrl) {
            saveAs(pdfUrl, 'LoanAgreement.pdf');
        }
    };

    const handleSignatureDrop = (name, position) => {
        setSignatures((prev) => ({ ...prev, [name]: position }));
    };

    return (
        <div>
            <button onClick={generatePdf}>Generate PDF</button>

            {pdfUrl && (
                <div>
                    <h3>PDF Preview</h3>
                    <iframe src={pdfUrl} width="600" height="800"></iframe>
                    <button onClick={handleDownload}>Download PDF</button>

                    <h3>Drag and Drop Signatures</h3>
                    <div style={{ position: 'relative', width: '600px', height: '800px', border: '1px solid black' }}>
                        <iframe src={pdfUrl} width="600" height="800"></iframe>
                        <Draggable
                            onStop={(e, data) => handleSignatureDrop('lender', { x: data.x, y: data.y })}
                        >
                            <div style={{ position: 'absolute', top: 50, left: 50, backgroundColor: 'yellow', padding: '5px' }}>
                                Lender Signature
                            </div>
                        </Draggable>
                        <Draggable
                            onStop={(e, data) => handleSignatureDrop('borrower', { x: data.x, y: data.y })}
                        >
                            <div style={{ position: 'absolute', top: 150, left: 50, backgroundColor: 'yellow', padding: '5px' }}>
                                Borrower Signature
                            </div>
                        </Draggable>
                    </div>
                </div>
            )}
        </div>
    );
}
