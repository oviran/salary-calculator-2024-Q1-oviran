import { SalaryContext } from "@/lib/Context/salaryContext";
import { useContext } from "react";

function Manupa() {
  const salary = useContext(SalaryContext);
  if (!salary) return;


  return <div></div>;
}
export default Manupa;