import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import AuthLayout from "~/components/Layout/AuthLayout";

import Home from "../pages/Home/Home";
import News from "~/pages/News/News";
import Upload from "~/pages/Upload/Upload";

import AnalyticsDashboard from "../pages/DashBoard/AnalyticsDashboard";
import OverviewDashboard from "../pages/DashBoard/OverviewDashboard";
import ReportDashboard from "../pages/DashBoard/ReportDashboard";

import EmployeeList from "~/pages/Employees/ListEmployees";
import AddEmployees from "~/pages/Employees/AddEmployees";
import UpdateEmployees from "~/pages/Employees/UpdateEmployees";
import RoleEmployees from "~/pages/Employees/RoleEmployees";

import ListDepartment from "~/pages/Departments/ListDepartment";
import AddDeparment from "~/pages/Departments/AddDeparment";
import ManageTeamsDepartment from "~/pages/Departments/ManageTeamsDepartment";

import PayrollSalary from "~/pages/Salary/PayrollSalary";
import ListContractSalary from "~/pages/Salary/ListContractSalary";

import LeaveAttendaceRequestPage from "~/pages/Attendance/LeaveAttendaceRequest";
import OvertimeAttendace from "~/pages/Attendance/OvertimeAttendance";
import ReportAttendance from "~/pages/Attendance/ReportAttendance";

import LoginUserPage from "~/pages/Account/LoginUserPage";
import SignUpUserPage from "~/pages/Account/SignupUserPage";
import ManageAccountPage from "~/pages/Account/ManageAccountPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="news" element={<News />} />
        <Route path="upload" element={<Upload />} />
        <Route path="dashboard">
          <Route index element={<OverviewDashboard />} />
          <Route path="overview" element={<OverviewDashboard />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="report" element={<ReportDashboard />} />
        </Route>
        <Route path="employees">
          <Route index element={<EmployeeList />} />
          <Route path="list" element={<EmployeeList />} />
          <Route path="add" element={<AddEmployees />} />
          <Route path="edit" element={<UpdateEmployees />} />
          <Route path="role" element={<RoleEmployees />} />
        </Route>
        <Route path="department">
          <Route index element={<ListDepartment />} />
          <Route path="list" element={<ListDepartment />} />
          <Route path="add" element={<AddDeparment />} />
          <Route path="manage" element={<ManageTeamsDepartment />} />
        </Route>
        <Route path="attendance">
          <Route index element={<ReportAttendance />} />
          <Route path="report" element={<ReportAttendance />} />
          <Route path="leaverequest" element={<LeaveAttendaceRequestPage />} />
          <Route path="overtime" element={<OvertimeAttendace />} />
        </Route>
        <Route path="salary">
          <Route index element={<PayrollSalary />} />
          <Route path="payroll" element={<PayrollSalary />} />
          <Route path="listcontact" element={<ListContractSalary />} />
        </Route>
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginUserPage />} />
        <Route path="signup" element={<SignUpUserPage />} />
        <Route path="manageaccount" element={<ManageAccountPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
