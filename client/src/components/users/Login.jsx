import { useState } from "react";
import { useDispatch } from "react-redux";
import { loguearUsuario } from "../../redux/actions";

const Login = () => {
  const [state, setState] = useState({
    nombreUsuario: "",
    contraseña: ""
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loguearUsuario(state))
    setState({
      nombreUsuario: "",
      contraseña: ""
    });
    setTimeout(() => {
      window.location.reload();
      
    }, 1000);
  }

  return (
    <div>
      <form onChange={handleChange}>
        <label>Usuario</label>
        <input type="text" name="nombreUsuario" value={state.nombreUsuario} />
        <label>Contraseña</label>
        <input type="password" name="contraseña" value={state.contraseña} />
        <button onClick={(e) => handleSubmit(e)}>Loguear</button>
      </form>
    </div>
  )
}

export default Login;