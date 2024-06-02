import { useContext } from "react";
import { SalaryContext } from "@/lib/Context/salaryContext";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const SalaryDisplay: React.FC = () => {
  const { formData: state } = useContext(SalaryContext);

  const calculateNetSalary = () => {
    const grossEarnings = state.salary + state.earnings.reduce((acc, curr) => acc + curr.amount, 0);
    const grossDeductions = state.deductions.reduce((acc, curr) => acc + curr.amount, 0);
    const employeeEPF = ((state.salary + state.earnings
      .filter((e) => e.isEpf)
      .reduce((acc, curr) => acc + curr.amount, 0)) - grossDeductions) * 0.08;
    
    let apit = (grossEarnings * 0.18) - 25500;
    if (apit < 0) {
      apit = 0;
    }

    const epf12 = ((state.salary + state.earnings
      .filter((e) => e.isEpf)
      .reduce((acc, curr) => acc + curr.amount, 0)) - grossDeductions) * 0.12;

    const epf3 = ((state.salary + state.earnings
      .filter((e) => e.isEpf)
      .reduce((acc, curr) => acc + curr.amount, 0)) - grossDeductions) * 0.03;
    return {
      grossEarnings,
      grossDeductions,
      employeeEPF,
      apit,
      epf12,
      epf3,
      netSalary: grossEarnings - grossDeductions - employeeEPF - apit
    };
  };

  const { grossEarnings, grossDeductions, employeeEPF, apit, epf12, epf3, netSalary } = calculateNetSalary();

  return (
    <div className="container mx-auto " style={{ position: "fixed", left: "752px", top: "20px", width: "480px" }}>
      <h1 className="text-3xl text-black mt-2 mb-4">Your Salary</h1>
      <Table className="custom-border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[500px] text-xl  text-black">Items</TableHead>
            <TableHead className="text-xl  text-black">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Basic Salary</TableCell>
            <TableCell>{state.salary.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gross Earnings</TableCell>
            <TableCell>{grossEarnings.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gross Deductions</TableCell>
            <TableCell>-{grossDeductions.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Employee EPF (8%)</TableCell>
            <TableCell>-{employeeEPF.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>APIT</TableCell>
            <TableCell>-{apit.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="border-4 border-gray-400">
            <TableCell className="font-medium">Net Salary (Take Home)</TableCell>
            <TableCell>{netSalary.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className="font-medium text-base  text-black">Contribution from the Employer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Employer EPF (12%)</TableCell>
            <TableCell>{epf12.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Employer ETF (3%)</TableCell>
            <TableCell>{epf3.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">CTC (Cost to Company)</TableCell>
            <TableCell>{((grossEarnings - grossDeductions) + (epf12 + epf3)).toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SalaryDisplay;
