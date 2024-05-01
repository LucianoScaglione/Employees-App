import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Edit from './components/employees/Edit';
import NavBar from './components/NavBar';
import Create from './components/employees/Create';

function App() {

  return (
    <>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/empleado/:id" component={Edit} />
      <Route exact path="/empleados/registrar" component={Create} />
    </>
  )
}

export default App;
