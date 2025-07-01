import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Page2() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/getCategory")
      .then((res) => res.json())
      .then((data) => {
        console.log("getting category data", data);
        setCategoryData(data);
      });
  }, []);
  return (
    <>
    <div className="flex justify-center items-center min-h-screen pt-20 pb-8">
        <div className="p-16 bg-white w-2/4 rounded-lg shadow-lg">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: categoryData.totalfood, label: "Food" },
                  { id: 1, value: categoryData.totalgrocery, label: "Grocery" },
                  {
                    id: 2,
                    value: categoryData.totaltransport,
                    label: "Transport",
                  },
                  { id: 3, value: categoryData.totalother, label: "Other" },
                ],
                arcLabel: (item) => {
                  const total =
                    (categoryData.totalfood || 0) +
                    (categoryData.totalgrocery || 0) +
                    (categoryData.totaltransport || 0) +
                    (categoryData.totalother || 0);
                  const percent = total
                    ? ((item.value / total) * 100).toFixed(1)
                    : 0;
                  return `${percent}%`;
                },
              },
            ]}
            width={400}
            height={400}
          />
          <ul className="mt-4 space-y-1">
            <li>Food = {categoryData.totalfood}</li>
            <li>Grocery = {categoryData.totalgrocery}</li>
            <li>Transport = {categoryData.totaltransport}</li>
            <li>Other = {categoryData.totalother}</li>
          </ul>
        </div>
      </div>
    </>
  );
}
