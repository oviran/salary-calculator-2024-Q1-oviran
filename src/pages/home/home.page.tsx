import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  SalaryContext,
  SalaryFormData,
  initialFormData,
} from "@/lib/Context/salaryContext";
import SalaryDisplay from "./components/SalaryDisplay";

function HomePage() {
  const [formData, setFormData] = useState<SalaryFormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "salary") {
      setFormData({
        ...formData,
        salary: isNaN(parseInt(value)) ? 0 : parseInt(value),
      });
    } else if (name.startsWith("earnings")) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, index, property] = name.split(".");
      const i = parseInt(index);

      setFormData({
        ...formData,
        earnings: formData.earnings.map((el, k) => {
          if (i === k) {
            if (property === "title") {
              return { ...el, title: value };
            }
            if (property === "amount") {
              return {
                ...el,
                amount: isNaN(parseInt(value)) ? 0 : parseInt(value),
              };
            }
            if (property === "isEpf") {
              return { ...el, isEpf: type === "checkbox" ? checked : el.isEpf };
            }
          }
          return el;
        }),
      });
    } else if (name.startsWith("deductions")) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, index, property] = name.split(".");
      const i = parseInt(index);

      setFormData({
        ...formData,
        deductions: formData.deductions.map((el, k) => {
          if (i === k) {
            if (property === "title") {
              return { ...el, title: value };
            }
            if (property === "amount") {
              return {
                ...el,
                amount: isNaN(parseInt(value)) ? 0 : parseInt(value),
              };
            }
          }
          return el;
        }),
      });
    }
  };

  const addEarning = () => {
    if (
      formData.earnings.every(
        (earning) => earning.title !== "" && earning.amount !== 0
      )
    ) {
      setFormData({
        ...formData,
        earnings: [
          ...formData.earnings,
          { title: "", amount: 0, isEpf: false },
        ],
      });
    } else {
      alert(
        "Please fill in all fields for the current earning before adding a new one."
      );
    }
  };

  const addDeduction = () => {
    if (
      formData.deductions.every(
        (deduction) => deduction.title !== "" && deduction.amount !== 0
      )
    ) {
      setFormData({
        ...formData,
        deductions: [...formData.deductions, { title: "", amount: 0 }],
      });
    } else {
      alert(
        "Please fill in all fields for the current deduction before adding a new one."
      );
    }
  };

  const removeEarning = (index: number) => {
    setFormData({
      ...formData,
      earnings: formData.earnings.filter((_, i) => i !== index),
    });
  };

  const removeDeduction = (index: number) => {
    setFormData({
      ...formData,
      deductions: formData.deductions.filter((_, i) => i !== index),
    });
  };
  const handleReset = () => {
    setFormData(initialFormData);
  };
  return (
    <SalaryContext.Provider value={{ formData, setFormData }}>
      <div
        className="container mx-auto p-4 "
        style={{
          position: "fixed",
          left: "128px",
          top: "80px",
          height: "616px",
          width: "680px",
        }}
      >
        <div className="py-1">
          <h1 className="text-3xl text-black mt-2 mb-2">
            Calculate your salary
          </h1>
        </div>
        <form className="py-8">
          <div>
            <Label className="text-lg text-black" htmlFor="salary">
              Basic Salary
            </Label>
            <Input
              className="mt-4"
              placeholder="Amount"
              id="salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>

          <div className="mt-4">
            <Label className="text-lg text-black" htmlFor="earnings">
              Earnings
            </Label>
            <div className="text-xm text-stone-500">
              <Label>Allowance, Fixed Allowance, Bonus and etc.</Label>
            </div>
            <div>
              {formData.earnings.map((earning, i) => (
                <div key={i} className="flex justify-left gap-x-4 items-center">
                  <Input
                    className="mt-4 mr-2"
                    placeholder="Pay Details (Title)"
                    name={`earnings.${i}.title`}
                    value={earning.title}
                    onChange={handleChange}
                  />
                  <Input
                    className="mt-4 mr-2"
                    placeholder="Amount"
                    type="number"
                    name={`earnings.${i}.amount`}
                    value={earning.amount}
                    onChange={handleChange}
                  />
                  <label className="mt-4" htmlFor="epf/etf">
                    EPF/ETF
                  </label>
                  <input
                    type="checkbox"
                    className="mt-4 mr-2 custom-checkbox"
                    name={`earnings.${i}.isEpf`}
                    checked={earning.isEpf}
                    onChange={handleChange}
                  />
                  <Button
                    className="mt-4 bg-red-600 text-balance"
                    type="button"
                    onClick={() => removeEarning(i)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                className="mt-4 bg-teal-400 text-balance"
                onClick={addEarning}
                type="button"
              >
                Add Earning
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-lg text-black" htmlFor="deduction">
              Deductions
            </Label>
            <div className="text-xm text-stone-500">
              <Label>Salary Advances, Loan Deductions and all.</Label>
            </div>
            <div>
              {formData.deductions.map((deduction, i) => (
                <div key={i} className="flex justify-left gap-x-4 items-center">
                  <Input
                    className="mt-4 mr-2"
                    placeholder=" (Title)"
                    name={`deductions.${i}.title`}
                    value={deduction.title}
                    onChange={handleChange}
                  />
                  <Input
                    className="mt-4 mr-2"
                    placeholder="Amount"
                    type="number"
                    name={`deductions.${i}.amount`}
                    value={deduction.amount}
                    onChange={handleChange}
                  />
                  <Button
                    className="mt-4 bg-red-600 text-balance"
                    type="button"
                    onClick={() => removeDeduction(i)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                className="mt-4 bg-teal-400  text-balance"
                onClick={addDeduction}
                type="button"
              >
                Add Deduction
              </Button>
            </div>
            <Button
              className="mt-4 bg-cyan-500 text-balance"
              style={{
                position: "fixed",
                left: "618px",
                top: "158px",
                width: "66px",
              }}
              onClick={handleReset}
              type="button"
            >
              Reset
            </Button>
          </div>
        </form>
        <SalaryDisplay />
      </div>
    </SalaryContext.Provider>
  );
}

export default HomePage;
