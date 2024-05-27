import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/users/Login';
import PrivatesRoutes from './PrivatesRoutes';
import Layout from './Layout';
import Home from './components/Home';
import HomeEmployees from './components/employees/Home';
import CreateEmployee from './components/employees/Create';
import EditEmployee from './components/employees/Edit';
import HomePositions from './components/positions/Home';
import CreatePosition from './components/positions/Create';
import EditPosition from './components/positions/Edit';
import HomeUsers from './components/users/Home';
import CreateUser from './components/users/Create';
import EditUser from './components/users/Edit';

function App() {
  return (
    <>
      <Routes>
        <Route path="/loguearse" element={<Login />} />
        <Route element={<PrivatesRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/empleados" element={<HomeEmployees />} />
            <Route path="/empleado/:id" element={<EditEmployee />} />
            <Route path="/empleados/registrar" element={<CreateEmployee />} />
            <Route path="/puestos" element={<HomePositions />} />
            <Route path="/puestos/crear" element={<CreatePosition />} />
            <Route path="/puesto/editar/:id" element={<EditPosition />} />
            <Route path="/usuarios" element={<HomeUsers />} />
            <Route path="/usuarios/registrar" element={<CreateUser />} />
            <Route path="/usuario/editar/:id" element={<EditUser />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App;
