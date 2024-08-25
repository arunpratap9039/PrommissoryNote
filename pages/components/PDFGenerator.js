"use client";

import { useState, useRef, useEffect } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import Draggable from 'react-draggable';
import { saveAs } from 'file-saver';

export default function PDFGenerator({ template, formData, setPdfData }) {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [signatures, setSignatures] = useState({ lender: null, borrower: null });
    const [lenderSignature, setLenderSignature] = useState('');
    const [borrowerSignature, setBorrowerSignature] = useState('');
    const pdfContainerRef = useRef(null);

    useEffect(() => {
        if (pdfUrl && setPdfData) {
            (async () => {
                const response = await fetch(pdfUrl);
                const blob = await response.blob();
                setPdfData(blob);
            })();
        }
    }, [pdfUrl, setPdfData]);

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

    const handleDownload = async () => {
        if (pdfUrl) {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const pdfDoc = await PDFDocument.load(await blob.arrayBuffer());
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];

            if (signatures.lender && lenderSignature) {
                firstPage.drawText(lenderSignature, {
                    x: signatures.lender.x,
                    y: signatures.lender.y,
                    size: 10,
                    color: rgb(0, 0, 0)
                });
            }

            if (signatures.borrower && borrowerSignature) {
                firstPage.drawText(borrowerSignature, {
                    x: signatures.borrower.x,
                    y: signatures.borrower.y,
                    size: 10,
                    color: rgb(0, 0, 0)
                });
            }

            const signedPdfBytes = await pdfDoc.save();
            saveAs(new Blob([signedPdfBytes], { type: 'application/pdf' }), 'SignedLoanAgreement.pdf');
        }
    };

    const handleSignatureDrop = (name, position) => {
        const rect = pdfContainerRef.current.getBoundingClientRect();
        setSignatures((prev) => ({
            ...prev,
            [name]: { x: position.x - rect.left, y: rect.bottom - position.y },
        }));
    };

    return (
        <div>
            <button onClick={generatePdf}>Generate PDF</button>

            {pdfUrl && (
                <div>
                    <h3>PDF Preview</h3>
                    <div
                        ref={pdfContainerRef}
                        style={{ position: 'relative', width: '600px', height: '800px', border: '1px solid black' }}
                    >
                        <iframe src={pdfUrl} width="600" height="800"></iframe>
                        <Draggable
                            onStop={(e, data) => handleSignatureDrop('lender', { x: data.x, y: data.y })}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 50,
                                    left: 50,
                                    backgroundColor: 'yellow',
                                    padding: '5px',
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="Lender Signature"
                                    value={lenderSignature}
                                    onChange={(e) => setLenderSignature(e.target.value)}
                                />
                            </div>
                        </Draggable>
                        <Draggable
                            onStop={(e, data) => handleSignatureDrop('borrower', { x: data.x, y: data.y })}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 150,
                                    left: 50,
                                    backgroundColor: 'yellow',
                                    padding: '5px',
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="Borrower Signature"
                                    value={borrowerSignature}
                                    onChange={(e) => setBorrowerSignature(e.target.value)}
                                />
                            </div>
                        </Draggable>
                    </div>
                    <button onClick={handleDownload}>Download Signed PDF</button>
                </div>
            )}
        </div>
    );
}
