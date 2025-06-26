import React from 'react';

export default function Page1() {
  return (
    <div>
      <ul className="text-black grid grid-cols-4 p-4 text-center">
        <li className="p-4">Date</li>
        <li className="p-4">Income</li>
        <li className="p-4">Expense</li>
        <li className="p-4">Total</li>
      </ul>
    </div>
  );
}