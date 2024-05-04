import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';
import Home from './components/employees/Home';
import HomePositions from './components/positions/Home';
import Edit from './components/employees/Edit';
import NavBar from './components/NavBar';
import Create from './components/employees/Create';
import CreatePosition from './components/positions/Create';

function App() {

  return (
    <>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/puestos" component={HomePositions} />
      <Route exact path="/empleado/:id" component={Edit} />
      <Route exact path="/empleados/registrar" component={Create} />
      <Route exact path="/puestos/crear" component={CreatePosition} />
    </>
  )
}

export default App;
