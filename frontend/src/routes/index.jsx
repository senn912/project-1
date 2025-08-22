import Layout from "../components/Layout";
import Home from "../pages/Home";

import Analytics from "../pages/Dashboard/Analytics";
import Overview from "../pages/DashBoard/Overtime";
import Report from "../pages/Dashboard/Report";
import EmployeeList from "~/pages/Employees/Employees List";
import AddEmployees from "~/pages/Employees/Add Employees";
import UpdateEmployees from "~/pages/Employees/Update Employees";
import Role from "~/pages/Employees/Role";
import Department from "~/components/SideBar/Departments";
import List from "~/pages/Departments/List";
import Add from "~/pages/Departments/Add";
import ManageTeams from "~/pages/Departments/Manage Teams";
import OverTime from "../pages/DashBoard/Overtime";
import Payroll from "~/pages/Salary/Payroll";
import ListContact from "~/pages/Salary/List Contract";
import AddContact from "~/pages/Salary/Add";
import Renew from "~/pages/Salary/Renew";
import LeaveReq from "~/pages/Attendance/Leave Request";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      
      {
        path: "dashboard",
        children: [
    
          { path: "analytics", element: <Analytics /> },
          { path: "overview", element: <Overview /> },
          { path: "report", element: <Report /> },
        ],
        },
        {
        path: "employees",
        children: [
    
          { path: "list", element: <EmployeeList /> },
          { path: "add", element: <AddEmployees /> },
          { path: "edit", element: <UpdateEmployees /> },
          { path: "role", element: <Role /> }
        ],
        },
        {
        path: "department",
        children: [
    
          { path: "list", element: <List /> },
          { path: "add", element: <Add /> },
          { path: "manage", element: <ManageTeams /> },
        ],
        },
        {
        path: "attendance",
        children: [
    
          { path: "report", element: <Report /> },
          { path: "leaveReq", element: <LeaveReq /> },
          { path: "overtime", element: <OverTime/> },
        ],
        },
        {
        path: "salary",
        children: [
    
          { path: "payroll", element: <Payroll /> },
          { path: "listcontact", element: <ListContact /> },
          { path: "addcontact", element: <AddContact /> },
          { path: "renew", element: <Renew /> },
        ],
      }

      
    ],
  },
];

export default routes;
