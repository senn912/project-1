import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

import Home from "../pages/Home/Home";
import News from "~/pages/News/News";
import Upload from "~/pages/Upload/Upload";

import Analytics from "../pages/Dashboard/Analytics";
import Overview from "../pages/DashBoard/Overtime";
import Report from "../pages/Dashboard/Report";
import OverTime from "../pages/DashBoard/Overtime";

import EmployeeList from "~/pages/Employees/Employees List";
import AddEmployees from "~/pages/Employees/Add Employees";
import UpdateEmployees from "~/pages/Employees/Update Employees";
import Role from "~/pages/Employees/Role";

import List from "~/pages/Departments/List";
import Add from "~/pages/Departments/Add";
import ManageTeams from "~/pages/Departments/Manage Teams";

import Payroll from "~/pages/Salary/Payroll";
import ListContact from "~/pages/Salary/List Contract";
import AddContact from "~/pages/Salary/Add";
import Renew from "~/pages/Salary/Renew";

import LeaveReq from "~/pages/Attendance/Leave Request";
import LoginPage from "~/pages/Account/LoginPage";
import CreatePage from "~/pages/Account/CreatePage";

import Layout_Login from "~/components/Layout/Layout_Login";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="news" element={<News />} />
        <Route path="upload" element={<Upload />} />
        <Route path="dashboard">
          <Route path="analytics" element={<Analytics />} />
          <Route path="overview" element={<Overview />} />
          <Route path="report" element={<Report />} />
        </Route>
        <Route path="employees">
          <Route path="list" element={<EmployeeList />} />
          <Route path="add" element={<AddEmployees />} />
          <Route path="edit" element={<UpdateEmployees />} />
          <Route path="role" element={<Role />} />
        </Route>
        <Route path="department">
          <Route path="list" element={<List />} />
          <Route path="add" element={<Add />} />
          <Route path="manage" element={<ManageTeams />} />
        </Route>
        <Route path="attendance">
          <Route path="report" element={<Report />} />
          <Route path="leaveReq" element={<LeaveReq />} />
          <Route path="overtime" element={<OverTime />} />
        </Route>
        <Route path="salary">
          <Route path="payroll" element={<Payroll />} />
          <Route path="listcontact" element={<ListContact />} />
          <Route path="addcontact" element={<AddContact />} />
          <Route path="renew" element={<Renew />} />
        </Route>
      </Route>
      <Route element={<Layout_Login />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="create" element={<CreatePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
