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
import SalesReportFerreteria from './componentes/pantallasGerente/salesReportFerreteria';
import NotaNuevaGastos from './componentes/pantallasGerente/notaNuevaGastos';
import VentasMensualesAbarrotes from './componentes/pantallasGerente/VentasMensualesAbarrotes';
import VentasMensualesBanqueteria from './componentes/pantallasGerente/VentasMensualesBanqueteria';
import VentasMensualesFerreteria from './componentes/pantallasGerente/VentasMensualesFerreteria';

function App() {
  return (
    <div>
    <Router>
      
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/salesReportAbarrotes" element={<SalesReportAbarrotes />} />
        <Route path="/registroEmpleado" element={<RegistroEmp />} />
        <Route path="infoVentas" element={<InfoVentas />} />
        <Route path="/crearNotaGastos" element={<CrearNota />} />
        <Route path="/agregarEmpleado" element={<AgregarEmpleado />} />
        <Route path="/eliminarEmpleado" element={<EliminarEmpleado />} />
        <Route path="/salesReportBanqueteria" element={<SalesReportBanqueteria />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/salesReportFerreteria" element={<SalesReportFerreteria />} />
        <Route path='/notaNuevaGastos' element={<NotaNuevaGastos />} />
        <Route path='/ventasMensualesAbarrotes' element={<VentasMensualesAbarrotes />}></Route>
        <Route path='/ventasMensualesBanqueteria' element={<VentasMensualesBanqueteria />}></Route>
        <Route path='/ventasMensualesFerreteria' element={<VentasMensualesFerreteria />}></Route>
      </Routes>
    </Router>
    </div>
  );
};

export default App;
