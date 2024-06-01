import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SalaryContext, SalaryFormData } from "@/lib/Context/salaryContext";
import Manupa from "./components/Manupa";

function HomePage() {
  const [formData, setFormData] = useState<SalaryFormData>({
    salary: 0,
    earnings: [],
    deductions: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "salary") {
      setFormData({ ...formData, salary: parseInt(value) });
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
              return { ...el, amount: parseInt(value) };
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
              return { ...el, amount: parseInt(value) };
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
      console.error(
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
      console.error(
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

  return (
    <div>
      <div className="py-1">
        <h1>Calculate your salary</h1>
      </div>
      <form className="py-8">
        <div>
          <Label htmlFor="salary">Basic Salary</Label>
          <Input
            className="mt-4"
            id="salary"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <Label htmlFor="earnings">Earnings</Label>
          <div>
            {formData.earnings.map((earning, i) => (
              <div key={i} className="flex justify-left gap-x-4 items-center">
                <Input
                  className="mt-4 mr-2"
                  name={`earnings.${i}.title`}
                  value={earning.title}
                  onChange={handleChange}
                />
                <Input
                  className="mt-4 mr-2"
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
                  className="mt-4 mr-2"
                  name={`earnings.${i}.isEpf`}
                  checked={earning.isEpf}
                  onChange={handleChange}
                />
                <Button
                  className="mt-2"
                  type="button"
                  onClick={() => removeEarning(i)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button className="mt-4" onClick={addEarning} type="button">
              Add Earning
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="deduction">Deductions</Label>
          <div>
            {formData.deductions.map((deduction, i) => (
              <div key={i} className="flex justify-left gap-x-4 items-center">
                <Input
                  className="mt-4 mr-2"
                  name={`deductions.${i}.title`}
                  value={deduction.title}
                  onChange={handleChange}
                />
                <Input
                  className="mt-4 mr-2"
                  type="number"
                  name={`deductions.${i}.amount`}
                  value={deduction.amount}
                  onChange={handleChange}
                />
                <Button
                  className="mt-4"
                  type="button"
                  onClick={() => removeDeduction(i)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button className="mt-4" onClick={addDeduction} type="button">
              Add Deduction
            </Button>
          </div>
        </div>
      </form>
      <SalaryContext.Provider value={formData}>
        <Manupa />
      </SalaryContext.Provider>
    </div>
  );
}

export default HomePage;
