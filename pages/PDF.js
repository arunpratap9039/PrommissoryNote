import { useState } from 'react';
import styles from '../styles/signup.module.css';
import FormInput from '../pages/components/FormInput';
import PDFGenerator from '../pages/components/PDFGenerator';
import BorrowerSign from '../pages/components/BorrowerSign';
import loanTemplate1 from '../pages/templates/loanTemplate1';

export default function Home() {
    const [formData, setFormData] = useState(null);
    const [pdfData, setPdfData] = useState(null);
    const [signatures, setSignatures] = useState(null);

    const handleFormSubmit = (data) => {
        setFormData(data);
    };

    return (
        <div>
            <h1>Loan Agreement Generator</h1>
            <FormInput onSubmit={handleFormSubmit} />
            {formData && <PDFGenerator template={loanTemplate1} formData={formData} />}
            {pdfData && <BorrowerSign pdfData={pdfData} signatures={signatures} />}
        </div>
    );
}
