import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Proveedores from '../pages/Proveedores'
import Entregas from '../pages/Entregas'
import DashboardLayoutRouter from '../layouts/DashboardLayoutRouter'
import Order from '../pages/order'
import Facturacion from '../pages/facturacion'
import Evaluacion from '../pages/Evaluacion'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Login no tiene sidebar */}
        <Route path="/login" element={<Login />} />
        {/* Layout del dashboard */}
        {/* Ruta padre */}
        <Route path="/" element={<DashboardLayoutRouter />}>
          {/* Rutas hijas */}
          <Route index element={<Dashboard />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="order" element={<Order />} />
          <Route path="entregas" element={<Entregas />} />
          <Route path="facturacion" element={<Facturacion />} />
          <Route path="evaluacion" element={<Evaluacion />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
