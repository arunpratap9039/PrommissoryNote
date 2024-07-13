import { useState } from 'react';

export default function FormInput({ onSubmit }) {
    const [lenderName, setLenderName] = useState('');
    const [lenderAddress, setLenderAddress] = useState('');
    const [borrowerName, setBorrowerName] = useState('');
    const [borrowerAddress, setBorrowerAddress] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [repaymentSchedule, setRepaymentSchedule] = useState('');
    const [endDate, setEndDate] = useState('');
    const [effectiveDate, setEffectiveDate] = useState('');
    const [stateCountry, setStateCountry] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            lenderName,
            lenderAddress,
            borrowerName,
            borrowerAddress,
            loanAmount,
            interestRate,
            repaymentSchedule,
            endDate,
            effectiveDate,
            stateCountry,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Loan Agreement Form</h2>
            <div>
                <label>Lender Name:</label>
                <input type="text" value={lenderName} onChange={(e) => setLenderName(e.target.value)} required />
            </div>
            <div>
                <label>Lender Address:</label>
                <input type="text" value={lenderAddress} onChange={(e) => setLenderAddress(e.target.value)} required />
            </div>
            <div>
                <label>Borrower Name:</label>
                <input type="text" value={borrowerName} onChange={(e) => setBorrowerName(e.target.value)} required />
            </div>
            <div>
                <label>Borrower Address:</label>
                <input type="text" value={borrowerAddress} onChange={(e) => setBorrowerAddress(e.target.value)} required />
            </div>
            <div>
                <label>Loan Amount:</label>
                <input type="text" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required />
            </div>
            <div>
                <label>Interest Rate:</label>
                <input type="text" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} required />
            </div>
            <div>
                <label>Repayment Schedule:</label>
                <input type="text" value={repaymentSchedule} onChange={(e) => setRepaymentSchedule(e.target.value)} required />
            </div>
            <div>
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
            <div>
                <label>Effective Date:</label>
                <input type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} required />
            </div>
            <div>
                <label>State/Country:</label>
                <input type="text" value={stateCountry} onChange={(e) => setStateCountry(e.target.value)} required />
            </div>
            <button type="submit">Generate Agreement</button>
        </form>
    );
}
