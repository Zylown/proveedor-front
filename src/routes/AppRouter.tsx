import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Orders from "../pages/Dashboard/Orders";
import Suppliers from "../pages/Dashboard/Suppliers";
import Logistics from "../pages/Dashboard/Logistics";
import Billing from "../pages/Dashboard/Billing";
import Evaluation from "../pages/Dashboard/Evaluation";
import Settings from "../pages/Dashboard/Settings";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<div />} />
          <Route path="orders" element={<Orders />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="billing" element={<Billing />} />
          <Route path="logistics" element={<Logistics />} />
          <Route path="evaluation" element={<Evaluation />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;