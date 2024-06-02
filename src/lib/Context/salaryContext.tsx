
import { createContext } from "react";

export type Earning = {
  title: string;
  amount: number;
  isEpf: boolean;
};

export type Deduction = {
  title: string;
  amount: number;
};

export type SalaryFormData = {
  salary: number;
  earnings: Earning[];
  deductions: Deduction[];
};

export const initialFormData: SalaryFormData = {
  salary: 0,
  earnings: [],
  deductions: [],
};

export const SalaryContext = createContext<{
  formData: SalaryFormData;
  setFormData: React.Dispatch<React.SetStateAction<SalaryFormData>>;
}>({
  formData: initialFormData,
  setFormData: () => {},
});
