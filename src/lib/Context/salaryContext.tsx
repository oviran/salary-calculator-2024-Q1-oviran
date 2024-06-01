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

export type SalaryFormDataContext = {
  salary: SalaryFormData;
};

export const SalaryContext = createContext<SalaryFormData | null>(null);
