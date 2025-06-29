import React, { useEffect, useRef, useState } from "react";
import { Plus, CircleX } from "lucide-react";
import Button from "@mui/material/Button";

export default function Page1() {  
  const [formMode, setformMode] = useState(null);
  const [data, setData] = useState([]);
  function DataCard({ data, onDelete }) {
    return (
      <>
        {data.map((item) => (
          <div key={item.Id} className="grid grid-cols-5 text-center p-4">
            <div className="bg-white p-2 m-2 rounded-md  flex">
              <Button
                variant="outlined"
                type="submit "
                className="flex-none"
                onClick={() => onDelete(item.id)}
              >
                del
              </Button>
              <Button variant="outlined" type="submit" className="flex-none" onClick={() => setformMode("edit")}>
                edit
              </Button>

              <p className="grow mt-[6px]"> {item.date}</p>
            </div>
            <div className="text-black bg-white p-2 m-2 rounded-md">
              Rp {parseInt(item.income).toLocaleString("id-ID")}
            </div>
            <div className="text-black bg-white p-2 m-2 rounded-md">
              Rp {parseInt(item.expense).toLocaleString("id-ID")}
            </div>
            <div className="bg-white p-2 m-2 rounded-md">{item.category}</div>
            <div className="bg-white p-2 m-2 rounded-md">
              Rp{" "}
              {parseInt(item.income) -
                parseInt(item.expense).toLocaleString("id-ID")}
            </div>
          </div>
        ))}
      </>
    );
  }

  const date = useRef();
  const income = useRef();
  const expense = useRef();
  const category = useRef();
  const note = useRef();
  const updatedDate = useRef();
  const updatedIncome = useRef();
  const updatedExpense = useRef();
  const updatedcategory = useRef();
  const updatedNote = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      date: date.current.value,
      income: income.current.value,
      expense: expense.current.value,
      category: category.current.value,
      note: note.current.value,
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
        setformMode(null);
      })
      .catch((err) => {
        console.error("Error sending data:", err);
      });
  };
  useEffect(() => {
    fetch("http://localhost:8080/api/getData")
      .then((res) => res.json())
      .then((data) => {
        console.log("getting data", data);
        setData(data);
      })
      .catch((err) => {
        console.error("error getting data :", err);
      });
  }, []);

  const handleUpdateData = (id) => {
    id.preventDefault()
     const dataUpdated = {
      id: id,
      date: date.current.value,
      income: income.current.value,
      expense: expense.current.value,
      category: category.current.value,
      note: note.current.value,
  };
    fetch(
      "http://localhost:8080/api/updateData",
      {
        method: "PATCH",
        header: {
          "Contet-Type": "application,json",
        },
        body: JSON.stringify(dataUpdated),
      }
        .then((res) => res.json())
        .then((result) => {
          console.log("Data update successfully:", result);
          alert("data updated");
        })
        .catch((err) => {
          console.error("error updating data:", err);
        })
    );
  };

  const handleDelete = (id) => {
    fetch("http://localhost:8080/api/deleteData", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Deleted:", result);
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error("Delete failed:", err);
      });
  };
  return (
    <div>
      <ul className="text-black grid grid-cols-3 p-2 text-center">
        <li className="p-4 text-green-400">Income</li>
        <li className="p-4 text-red-400">Expense</li>
        <li className="p-4 text-blue-400">Total</li>
        <li className="text-green-400">Rp 1000</li>
        <li className="text-red-400">Rp 1000</li>
        <li className="text-blue-400">Rp 1000</li>
      </ul>
      <hr></hr>
      <div>
        <div>
          <div className="bg-white grid grid-cols-5 text-center font-bold">
            <div>Date</div>
            <div className="text-blue">Income</div>
            <div className="text-red">Expense</div>
            <div className="">Category</div>
            <div>Total</div>
          </div>
          <hr />
          <DataCard data={data} onDelete={handleDelete} />
        </div>
      </div>


      <div
        className={`flex justify-center mt-[50px] ${formMode ? "" : "hidden"}`}
      >
    {formMode === "create" && (
        <div className="bg-white border-1 rounded-lg p-4 w-1/4 flex justify-center ">
          <button className="cursor-pointer" onClick={() => setformMode(null)}>
            <CircleX size={24} />
          </button>


          
          <form onSubmit={handleSubmit} className="flex flex-col p-4">
            <label className="p-2">
              Date:
              <input
                type="date"
                className="border cursor-pointer"
                ref={date}
              ></input>
            </label>
            <label className="p-2">
              <input type="text" ref={income}></input>
            </label>
            <label className="p-2">
              Expense
              <input type="text" ref={expense}></input>
            </label>
            Category:
            <input type="text" ref={category}></input>
            <label className="p-2">
              Note
              <input type="text" className="border" ref={note}></input>
            </label>
            <Button variant="outlined" type="submit">
              Submit
            </Button>
          </form>
          
        </div>)}
      </div>
      <button
        className={`w-17 h-17 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 cursor-pointer fixed top-164 left-354 ${
          formMode ? "hidden" : ""
        }`}
        onClick={() => setformMode("create")}
      >
        <Plus size={34} />
      </button>



     {formMode === "edit" && (
  <div className="flex justify-center mt-[50px]">
    <div className="bg-white border-1 rounded-lg p-4 w-1/4 relative">
      <button
        type="button"
        onClick={() => setformMode(null)}
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
      >
        <CircleX size={24} />
      </button>

      <form onSubmit={handleUpdateData} className="flex flex-col p-4">
        <label className="p-2">
          Date:
          <input type="date" className="border" ref={updatedDate} />
        </label>
        <label className="p-2">
          Income
          <input type="text" ref={updatedIncome} />
        </label>
        <label className="p-2">
          Expense
          <input type="text" ref={updatedExpense} />
        </label>
        Category:
        <input type="text" ref={updatedcategory} />
        <label className="p-2">
          Note
          <input type="text" className="border" ref={updatedNote} />
        </label>
        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </form>
    </div>
  </div>
)}

      </div>
  );
}
