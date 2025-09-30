import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Proveedores from "../pages/Proveedores";
import DashboardLayoutRouter from "../layouts/DashboardLayoutRouter";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Login no tiene sidebar */}
        <Route path="/login" element={<Login />} />
        {/* Layout del dashboard */}
        // Ruta padre
        <Route path="/" element={<DashboardLayoutRouter />}>
          {/* Rutas hijas */}
          <Route index element={<Dashboard />} /> {/* "/" */}
          <Route path="proveedores" element={<Proveedores />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
