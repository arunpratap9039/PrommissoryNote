"use client";

import { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';


export default function BorrowerSign({ pdfData, signatures, onSignaturesSubmit }) {
    const [signedPdfData, setSignedPdfData] = useState(null);

    const handleSaveSignatures = (newSignatures) => {
        onSignaturesSubmit(newSignatures);
    };

    useEffect(() => {
        const signPdf = async () => {
            if (!pdfData || !signatures.lender || !signatures.borrower) return;

            const pdfDoc = await PDFDocument.load(pdfData);
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];

            if (signatures.lender) {
                const lenderSignatureImage = await pdfDoc.embedPng(signatures.lender);
                firstPage.drawImage(lenderSignatureImage, {
                    x: signatures.lender.x,
                    y: signatures.lender.y,
                    width: lenderSignatureImage.width,
                    height: lenderSignatureImage.height,
                });
            }

            if (signatures.borrower) {
                const borrowerSignatureImage = await pdfDoc.embedPng(signatures.borrower);
                firstPage.drawImage(borrowerSignatureImage, {
                    x: signatures.borrower.x,
                    y: signatures.borrower.y,
                    width: borrowerSignatureImage.width,
                    height: borrowerSignatureImage.height,
                });
            }

            const signedPdfBytes = await pdfDoc.save();
            setSignedPdfData(URL.createObjectURL(new Blob([signedPdfBytes], { type: 'application/pdf' })));
        };

        signPdf();
    }, [pdfData, signatures]);

    const handleDownload = () => {
        if (signedPdfData) {
            saveAs(signedPdfData, 'SignedLoanAgreement.pdf');
        }
    };

    return (
        <div>
            <h3>Sign the Document</h3>
            <SignatureInput onSave={handleSaveSignatures} />
            <button onClick={handleDownload}>Download Signed PDF</button>

            {signedPdfData && (
                <div>
                    <h3>Signed PDF Preview</h3>
                    <iframe src={signedPdfData} width="600" height="800"></iframe>
                </div>
            )}
        </div>
    );
}
