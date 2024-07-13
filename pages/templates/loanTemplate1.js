const loanTemplate1 = ({
    lenderName,
    lenderAddress,
    borrowerName,
    borrowerAddress,
    loanAmount,
    interestRate,
    repaymentSchedule,
    endDate,
    effectiveDate,
    stateCountry
}) => `
Loan Agreement

This Loan Agreement (the "Agreement") is entered into on ${effectiveDate} (the “Effective Date”) by and between ${lenderName} with an address of ${lenderAddress} (referred to as the “Lender”) and ${borrowerName} with an address of ${borrowerAddress} (referred to as the “Borrower”), collectively “the Parties.”

[Purpose of Loan]
1. The Lender agrees to lend a specific amount of money to the Borrower. The Borrower agrees to repay the principal amount along with interest, according to the terms set out in this Agreement.

1.1. Both Parties agree that it is in their best interests to adhere to the repayment schedule and conditions specified herein, ensuring a mutual understanding and financial arrangement.

1.2. The Borrower agrees to use the loan amount solely for the purposes described in this Agreement and to repay the amount on the agreed-upon dates.

[Loan Details]
2. This section outlines the principal amount of the loan, the interest rate, repayment schedule, term of the loan, and any collateral securing the loan. It also includes any specific conditions or covenants agreed upon by the Parties.

[Term of Loan]
3. The Borrower is committed to repaying the loan in full by ${endDate}, including any accrued interest, according to the repayment schedule detailed in this Agreement.

[Governing Law]
4. This Contract shall be governed by and construed in accordance with the laws of ${stateCountry}, without giving effect to its conflicts of law principles.

[Breach of Agreement]
5. In the event of a breach of this Agreement, including failure to repay the loan as agreed, the Lender has the right to demand immediate repayment of all outstanding amounts. The Lender may also pursue any other remedies available under law.

The Parties agree to the terms and conditions of this Agreement set forth above, as demonstrated by their signatures as follows:

Lender
${lenderName}
_________________________
Signature
Date:

Borrower
${borrowerName}
_________________________
Signature
Date:
`;

export default loanTemplate1;
