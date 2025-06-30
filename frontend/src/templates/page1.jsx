import React, { useEffect, useRef, useState } from "react";
import { Plus, CircleX } from "lucide-react";
import Button from "@mui/material/Button";


  
export default function Page1() {

  const [formMode, setformMode] = useState(null);
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [total, setTotal] = useState([])

  useEffect(() => {
  if (formMode === "edit" && editingItem) {
    updatedDate.current.value = editingItem.date;
    updatedIncome.current.value = editingItem.income;
    updatedExpense.current.value = editingItem.expense;
    updatedcategory.current.value = editingItem.category;
    updatedNote.current.value = editingItem.note;
  }
}, [formMode, editingItem]);

  function DataCard({ data, onDelete }) {
    if (!data){
     <div>No data entries</div>     
    }else{
    return (
      <>
        {data.map((item) => (
          <div key={item.id} className="grid grid-cols-5 text-center p-4">
            <div className="bg-white p-2 m-2 rounded-md  flex">
              <Button
                variant="outlined"
                type="submit "
                className="flex-none"
                onClick={() => onDelete(item.id)}
              >
                del
              </Button>
              <Button
                variant="outlined"
                type="submit"
                className="flex-none"
                onClick={() => {
                  setEditingItem(item);  
                  setformMode("edit"); 
                  
                }}
              >
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

  useEffect(() => {
    fetch("http://localhost:8080/api/getData/total")
    .then((res) => res.json())
    .then((data) => {
      console.log("getting total", data);
      setTotal(data);
    })
    .catch((err) => {
      console.error("error getting total data:", err)
    });
  }, [])

  const handleUpdateData = (e) => {
    e.preventDefault();
    const dataUpdated = {
      id: editingItem.id,
      date: updatedDate.current.value,
      income: updatedIncome.current.value,
      expense: updatedExpense.current.value,
      category: updatedcategory.current.value,
      note: updatedNote.current.value,
    };
    fetch(
      "http://localhost:8080/api/editData",
      {
        method: "PATCH",
        header: {
          "Contet-Type": "application,json",
        },
        body: JSON.stringify(dataUpdated),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("Data update successfully:", result);
          alert("data updated");
        })
        .catch((err) => {
          console.error("error updating data:", err);
        });
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
        <li className="text-green-400">Rp {total.totalincome}</li>
        <li className="text-red-400">Rp  {total.totalexpense}</li>
        <li className="text-blue-400">Rp {total.totalboth}</li>
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
          <div className="bg-white border rounded-lg p-6 w-1/3 shadow-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setformMode(null)}
            >
              <CircleX size={24} />
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col text-sm font-medium">
                Date:
                <input
                  type="date"
                  className="border rounded px-3 py-2 mt-1"
                  ref={date}
                />
              </label>

              <label className="flex flex-col text-sm font-medium">
                Income:
                <input
                  type="text"
                  className="border rounded px-3 py-2 mt-1"
                  ref={income}
                />
              </label>

              <label className="flex flex-col text-sm font-medium">
                Expense:
                <input
                  type="text"
                  className="border rounded px-3 py-2 mt-1"
                  ref={expense}
                />
              </label>

              <label className="flex flex-col text-sm font-medium">
                Category:
                <select
                  ref={category}
                  className="border rounded px-3 py-2 mt-1 cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>
                    -- Select Category --
                  </option>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="grocery">Grocery</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="flex flex-col text-sm font-medium">
                Note:
                <input
                  type="text"
                  className="border rounded px-3 py-2 mt-1"
                  ref={note}
                />
              </label>

              <Button variant="outlined" type="submit">
                Submit
              </Button>
            </form>
          </div>
        )}
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
          <div className="bg-white border rounded-lg p-6 w-1/3 shadow-md relative">
            <button
              type="button"
              onClick={() => setformMode(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <CircleX size={24} />
            </button>

            <form onSubmit={handleUpdateData} className="flex flex-col gap-4">
              <label className="flex flex-col text-sm font-medium">
                Date:
                <input
                  type="date"
                  className="border rounded px-3 py-2 mt-1"
                  ref={updatedDate}
                />
              </label>

              <label className="flex flex-col text-sm font-medium">
                Income:
                <input
                  type="text"
                  className="border rounded px-3 py-2 mt-1"
                  ref={updatedIncome}
                />
              </label>

              <label className="flex flex-col text-sm font-medium">
                Expense:
                <input
                  type="text"
                  className="border rounded px-3 py-2 mt-1"
                  ref={updatedExpense}
                />
              </label>

              <label className="flex flex-col text-sm font-medium">
                Category:
                <select
                  ref={updatedcategory}
                  className="border rounded px-3 py-2 mt-1 cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>
                    -- Select Category --
                  </option>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="grocery">Grocery</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="flex flex-col text-sm font-medium">
                Note:
                <input
                  type="text"
                  className="border rounded px-3 py-2 mt-1"
                  ref={updatedNote}
                />
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
