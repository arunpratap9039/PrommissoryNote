import { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

export default function BorrowerSign({ pdfData, signatures }) {
    const [signedPdfData, setSignedPdfData] = useState(null);

    const handleSign = async () => {
        const pdfDoc = await PDFDocument.load(pdfData);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        if (signatures.lender) {
            firstPage.drawText('Lender Signature', {
                x: signatures.lender.x,
                y: firstPage.getHeight() - signatures.lender.y,
                size: 12,
                color: rgb(0, 0, 0),
            });
        }

        if (signatures.borrower) {
            firstPage.drawText('Borrower Signature', {
                x: signatures.borrower.x,
                y: firstPage.getHeight() - signatures.borrower.y,
                size: 12,
                color: rgb(0, 0, 0),
            });
        }

        const pdfBytes = await pdfDoc.save();
        setSignedPdfData(URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' })));
    };

    const handleDownload = () => {
        if (signedPdfData) {
            saveAs(signedPdfData, 'SignedLoanAgreement.pdf');
        }
    };

    return (
        <div>
            <button onClick={handleSign}>Sign PDF</button>

            {signedPdfData && (
                <div>
                    <h3>Signed PDF Preview</h3>
                    <iframe src={signedPdfData} width="600" height="800"></iframe>
                    <button onClick={handleDownload}>Download Signed PDF</button>
                </div>
            )}
        </div>
    );
}
