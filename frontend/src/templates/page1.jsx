import React, { useRef } from "react";

function DataCard({ data }) {
  return(
  <>
    {data.map((item, index) => (
      <React.Fragment key={index}>
        <div>
          <li>{item.date}</li>
          <li>{item.income}</li>
          <li>{item.expense}</li>
          <li>{item.total}</li>
        </div>
      </React.Fragment>
    ))}
  </>
  )
}

export default function Page1() {
  const date = useRef();
  const income = useRef();
  const expense = useRef();
  const category = useRef();
  const note = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      date: date.current.value,
      income: income.current.value,
      expense: expense.current.value,
      category: category.current.value,
      note: note.current.value
    };
    console.log("Sending data:", data);

    fetch("http://localhost:8080/api/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Data sent successfully:", result);
        alert("data submitted!");
      })
      .catch((err) => {
        console.error("Error sending data:", err);
      });
  };
  return (
    <div>
      <ul className="text-black grid grid-cols-4 p-4 text-center">
        <li className="p-4 mt-[-5px]">Date</li>
        <li className="p-4">Income</li>
        <li className="p-4">Expense</li>
        <li className="p-4">Total</li>
        <li></li>
        <li>Rp </li>
        <li>Rp </li>
        <li>Rp </li>
      </ul>
      <hr></hr>
      <div>
        <ul className="text-black grid grid-cols-4 p-4 text-center">
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="">
        <label>
          Date:
          <input type="date" className="border" ref={date} ></input>
        </label>
        <label>
          Income:
          <input type="text" className="border" ref={income}></input>
        </label>
        <label>
          Expense
          <input type="text" className="border" ref={expense}></input>
        </label>
        <label>
          Category
          <input type="text" className="border" ref={category}></input>
        </label>
        <label>
          Note
          <input type="text" className="border" ref={note}></input>
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
