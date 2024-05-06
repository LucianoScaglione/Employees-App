import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import HomeEmployees from './components/employees/Home';
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
  const Layout = ({ children }) => (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
  return (
    <>
      <Switch>
        <Route exact path="/loguearse" component={Login} />
        <Route>
          <Layout>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/empleados" component={HomeEmployees} />
              <PrivateRoute exact path="/empleado/:id" component={Edit} />
              <PrivateRoute exact path="/empleados/registrar" component={Create} />
              <PrivateRoute exact path="/puestos" component={HomePositions} />
              <PrivateRoute exact path="/puestos/crear" component={CreatePosition} />
              <PrivateRoute exact path="/usuarios" component={HomeUser} />
              <PrivateRoute exact path="/usuarios/registrar" component={CreateUsers} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </>
  )
}

export default App;
