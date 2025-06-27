import React, { useRef, useState } from "react";
import { Plus, CircleX} from "lucide-react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

function DataCard({ data }) {
  return (
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
  );
}

export default function Page1() {
  const [isOpen, setOpen] = useState();

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
      })
      .catch((err) => {
        console.error("Error sending data:", err);
      });
  };
  return (
    <div>
      <ul className="text-black grid grid-cols-4 p-2 text-center">
        <li className="p-4 mt-[-5px] ">Date</li>
        <li className="p-4 text-blue">Income</li>
        <li className="p-4 text-red">Expense</li>
        <li className="p-4">Total</li>
        <li></li>
        <li>Rp </li>
        <li>Rp </li>
        <li>Rp </li>
      </ul>
      <hr></hr>
      <div>
        <ul className="text-black grid grid-cols-4 p-4 text-center"></ul>
      </div>
      <div className={`flex justify-center mt-[50px] ${isOpen ? "" : "hidden"}` }>
        <div className="border-1 rounded-lg p-4 w-1/4 flex justify-center ">
          <form onSubmit={handleSubmit} className="flex flex-col p-4">
            <button className="cursor-pointer"
            onClick={() => setOpen(false)}>
            <CircleX size={24} />
            </button>
            <label className="p-2">
              Date:
              <input
                type="date"
                className="border cursor-pointer"
                ref={date}
              ></input>
            </label>
            <label className="p-2">
              Income:
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
                ref={income}
              />
            </label>
            <label className="p-2">
              Expense
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
                ref={expense}
              />
            </label>
            Category:
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" ref={category}>
                Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value=""
                label="Age"
                onChange=""
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <label className="p-2">
              Note
              <input type="text" className="border" ref={note}></input>
            </label>
            <Button variant="outlined">Submit</Button>
          </form>
        </div>
      </div>
      <button className={`w-17 h-17 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 cursor-pointer fixed top-164 left-354 ${isOpen ? "hidden" : ""}`}
      onClick={() => setOpen(true)}      
      >
        <Plus size={34} /> 
      </button>
    </div>
  );
}
