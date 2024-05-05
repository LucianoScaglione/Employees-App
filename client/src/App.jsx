import './App.css';
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

function App() {

  return (
    <>
      <NavBar />
      <Route exact path="/empleados" component={Home} />
      <Route exact path="/empleado/:id" component={Edit} />
      <Route exact path="/empleados/registrar" component={Create} />
      <Route exact path="/puestos" component={HomePositions} />
      <Route exact path="/puestos/crear" component={CreatePosition} />
      <Route exact path="/usuarios" component={HomeUser} />
      <Route exact path="/usuarios/registrar" component={CreateUsers} />
    </>
  )
}

export default App;
