import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './componentes/login';
import SalesReportAbarrotes from './componentes/pantallasGerente/salesReportAbarrotes';
import RegistroEmp from './componentes/pantallasGerente/registroEmp';
import InfoVentas from './componentes/pantallasGerente/infoVentas';
import CrearNota from './componentes/pantallasGerente/crearNotaGastos';
import AgregarEmpleado from './componentes/pantallasGerente/AgregarEmpleado';
import EliminarEmpleado from './componentes/pantallasGerente/EliminarEmpleado';
import SalesReportBanqueteria from './componentes/pantallasGerente/salesReportBanqueteria';
import Ventas from './componentes/Ventas'

function App() {
  return (
    <div>
    <Router>
      
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/salesReportAbarrotes" element={<SalesReportAbarrotes />} />
        <Route path="/registroEmpleado" element={<RegistroEmp />} />
        <Route path="infoVentas" element={<InfoVentas />} />
        <Route path="/crearNota" element={<CrearNota />} />
        <Route path="/agregarEmpleado" element={<AgregarEmpleado />} />
        <Route path="/eliminarEmpleado" element={<EliminarEmpleado />} />
        <Route path="/salesReportBanqueteria" element={<SalesReportBanqueteria />} />
        <Route path="/ventas" element={<Ventas />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
