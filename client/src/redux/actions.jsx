import axios from 'axios';
import Swal from 'sweetalert2';

const backend = 'http://localhost:3001';
export const OBTENER_EMPLEADOS = "OBTENER_EMPLEADOS";
export const OBTENER_EMPLEADO = "OBTENER_EMPLEADO";
export const VACIAR_ESTADO = "VACIAR_ESTADO";
export const ELIMINAR_EMPLEADO = "ELIMINAR_EMPLEADO";
export const OBTENER_USUARIOS = "OBTENER_USUARIOS";
export const ELIMINAR_USUARIO = "ELIMINAR_USUARIO";

export const obtenerEmpleados = () => {
  return (dispatch) => {
    return axios.get(`${backend}/employees`)
      .then(res => dispatch({ type: OBTENER_EMPLEADOS, payload: res.data }))
      .catch(err => console.log(err));
  }
};

export const obtenerEmpleado = (id) => {
  return (dispatch) => {
    return axios.get(`${backend}/employees/${id}`)
      .then(res => dispatch({ type: OBTENER_EMPLEADO, payload: res.data }))
      .catch(err => console.log(err))
  }
};

export const crearEmpleado = (body) => {
  return () => {
    return axios.post(`${backend}/employees`, body)
      .then(res => {
        Swal.fire({
          title: "¡Buen trabajo!",
          text: "Empleado registrado correctamente",
          icon: "success"
        });
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "No se pudo completar el registro del empleado",
          text: "Revise que no existan errores existentes",
        });
      })
  }
};

export const editarEmpleado = (id, body) => {
  return () => {
    return axios.put(`${backend}/employees/${id.id}`, body)
      .then(res => { return alert('Usuario actualizado') })
      .catch(err => console.log(err))
  }
};

export const vaciarEstado = () => {
  return {
    type: VACIAR_ESTADO
  }
};

export const eliminarEmpleado = (id) => {
  return (dispatch) => {
    return axios.delete(`${backend}/employees/${id}`)
      .then(res => dispatch({ type: ELIMINAR_EMPLEADO, payload: id }))
      .catch(err => console.log(err));
  }
};

export const obtenerUsuarios = () => {
  return (dispatch) => {
    return axios.get(`${backend}/users`)
      .then(res => dispatch({ type: OBTENER_USUARIOS, payload: res.data }))
      .catch(err => console.log(err))
  }
};

export const crearUsuario = (body) => {
  return () => {
    return axios.post(`${backend}/users/register`, body)
      .then(res => {
        Swal.fire({
          title: "¡Buen trabajo!",
          text: "Usuario registrado correctamente",
          icon: "success"
        });
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: err.response.data,
        });
      })

  }
}

export const eliminarUsuario = (id) => {
  return (dispatch) => {
    return axios.delete(`${backend}/users/${id}`)
      .then(res => dispatch({ type: ELIMINAR_USUARIO, payload: id }))
      .catch(err => console.log(err))
  }
};