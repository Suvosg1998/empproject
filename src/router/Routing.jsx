import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Layouts/Header";
import CreateDepartment from "../component/Department/createdepartment";
import Getdepartment from "../component/Department/Getdepartment";
import EditDepartment from "../component/Department/EditDepartment";
import CreateEmployee from "../component/Employee/CreateEmployee";
import Getemployee from "../component/Employee/Getemployee";
import ViewEmployee from "../component/Employee/ViewEmployee";
import EditEmployee from "../component/Employee/Editemployee";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/createdep" element={<CreateDepartment />} />
        <Route path="/departments" element={<Getdepartment />} />
        <Route path="/editdep/:id" element={<EditDepartment />} />
        <Route path="/createemp" element={<CreateEmployee/>} />
        <Route path="/employees" element={<Getemployee/>} />
        <Route path="/viewemp/:id" element={<ViewEmployee/>} />
        <Route path="/editemp/:id" element={<EditEmployee/>} />

      </Routes>
    </Router>
  );
}
export default AppRouter;