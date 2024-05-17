import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/users/Login';
import NavBar from './components/NavBar';
import PrivateRoute from './PrivateRoute';
import Home from './components/Home';
import HomeEmployees from './components/employees/Home';
import CreateEmployee from './components/employees/Create';
import EditEmployee from './components/employees/Edit';
import HomePositions from './components/positions/Home';
import CreatePosition from './components/positions/Create';
import EditPosition from './components/positions/Edit';
import HomeUsers from './components/users/Home';
import CreateUser from './components/users/Create';

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
              <PrivateRoute exact path="/empleado/:id" component={EditEmployee} />
              <PrivateRoute exact path="/empleados/registrar" component={CreateEmployee} />
              <PrivateRoute exact path="/puestos" component={HomePositions} />
              <PrivateRoute exact path="/puestos/crear" component={CreatePosition} />
              <PrivateRoute exact path="/puesto/editar/:id" component={EditPosition} />
              <PrivateRoute exact path="/usuarios" component={HomeUsers} />
              <PrivateRoute exact path="/usuarios/registrar" component={CreateUser} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </>
  )
}

export default App;
