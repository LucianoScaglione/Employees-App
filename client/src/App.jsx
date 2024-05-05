import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';
import Home from './components/employees/Home';
import HomePositions from './components/positions/Home';
import Edit from './components/employees/Edit';
import NavBar from './components/NavBar';
import Create from './components/employees/Create';
import CreatePosition from './components/positions/Create';
import HomeUser from './components/users/Home';
import CreateUsers from './components/users/Create';
import Login from './components/users/Login';
import PrivateRoute from './PrivateRoute';

function App() {

  return (
    <>
      <NavBar />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/empleados" component={Home} />
      <PrivateRoute exact path="/empleado/:id" component={Edit} />
      <PrivateRoute exact path="/empleados/registrar" component={Create} />
      <PrivateRoute exact path="/puestos" component={HomePositions} />
      <PrivateRoute exact path="/puestos/crear" component={CreatePosition} />
      <PrivateRoute exact path="/usuarios" component={HomeUser} />
      <PrivateRoute exact path="/usuarios/registrar" component={CreateUsers} />
      <Route exact path="/loguearse" component={Login} />
    </>
  )
}

export default App;
