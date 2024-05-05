import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "./AuthServices";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const usuario = isAuthenticated();
  return (
    <Route {...rest}>{usuario.token ? <Component /> : <Redirect to='/loguearse' />}</Route>
  )
}

export default PrivateRoute;