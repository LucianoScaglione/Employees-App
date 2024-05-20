import axios from 'axios';
import Swal from 'sweetalert2';

const backend = 'http://localhost:3001';
export const OBTENER_EMPLEADOS = "OBTENER_EMPLEADOS";
export const OBTENER_EMPLEADO = "OBTENER_EMPLEADO";
export const OBTENER_EMPLEADOS_QUERY = "OBTENER_EMPLEADOS_QUERY";
export const VACIAR_ESTADO = "VACIAR_ESTADO";
export const ELIMINAR_EMPLEADO = "ELIMINAR_EMPLEADO";
export const OBTENER_USUARIOS = "OBTENER_USUARIOS";
export const OBTENER_USUARIO = "OBTENER_USUARIO";
export const ELIMINAR_USUARIO = "ELIMINAR_USUARIO";
export const OBTENER_PUESTOS = "OBTENER_PUESTOS";
export const OBTENER_PUESTO = "OBTENER_PUESTO";
export const ELIMINAR_PUESTO = "ELIMINAR_PUESTO";

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

export const obtenerEmpleadosQuery = (body) => {
  return (dispatch) => {
    return axios.get(`${backend}/employees?empleado=${body}`)
      .then(res => dispatch({ type: OBTENER_EMPLEADOS_QUERY, payload: res.data }))
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: err.response.data,
        });
      })
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
      .then(res => {
        Swal.fire({
          title: "¡Buen trabajo!",
          text: "Empleado actualizado correctamente",
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
};

export const eliminarEmpleado = (id) => {
  return (dispatch) => {
    return axios.delete(`${backend}/employees/${id}`)
      .then(res => dispatch({ type: ELIMINAR_EMPLEADO, payload: id }))
      .catch(err => console.log(err));
  }
};

export const vaciarEstado = () => {
  return {
    type: VACIAR_ESTADO
  }
};

export const obtenerUsuarios = () => {
  return (dispatch) => {
    return axios.get(`${backend}/users`)
      .then(res => dispatch({ type: OBTENER_USUARIOS, payload: res.data }))
      .catch(err => console.log(err))
  }
};

export const obtenerUsuario = (id) => {
  return (dispatch) => {
    return axios.get(`${backend}/users/${id}`)
      .then(res => dispatch({ type: OBTENER_USUARIO, payload: res.data }))
      .catch(err => Swal.fire({
        icon: "error",
        title: err.response.data,
      }))
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
};

export const loguearUsuario = (body) => {
  return () => {
    return axios.post(`${backend}/users/login`, body)
      .then(res => {
        localStorage.setItem('usuarioToken', JSON.stringify(res.data));
        return res
      })
      .catch(err => Swal.fire({
        icon: "error",
        title: err.response.data,
      }))
  }
};

export const informacionUsuario = () => {
  const usuario = localStorage.getItem("usuarioToken");
  if (usuario) {
    return JSON.parse(usuario);
  } else {
    return {};
  }
}

export const editarUsuario = (id, body) => {
  return () => {
    return axios.put(`${backend}/users/${id}`, body)
      .then(res => Swal.fire({
        title: "¡Buen trabajo!",
        text: "Usuario actualizado correctamente",
        icon: "success"
      }))
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: err.response.data,
        });
      })
  }
};

export const eliminarUsuario = (id) => {
  return (dispatch) => {
    return axios.delete(`${backend}/users/${id}`)
      .then(res => dispatch({ type: ELIMINAR_USUARIO, payload: id }))
      .catch(err => console.log(err))
  }
};

export const obtenerPuestos = () => {
  return (dispatch) => {
    return axios.get(`${backend}/positions`)
      .then(res => dispatch({ type: OBTENER_PUESTOS, payload: res.data }))
      .catch(err => console.log(err))
  }
};

export const crearPuestos = (body) => {
  return () => {
    return axios.post(`${backend}/positions`, body)
      .then(res => Swal.fire({
        title: "¡Buen trabajo!",
        text: "Puesto registrado correctamente",
        icon: "success"
      }))
      .catch(err => Swal.fire({
        icon: "error",
        title: err.response.data,
      }))
  }
};

export const obtenerPuesto = (id) => {
  return (dispatch) => {
    return axios.get(`${backend}/positions/${id}`)
      .then(res => dispatch({ type: OBTENER_PUESTO, payload: res.data }))
      .catch(err => Swal.fire({
        icon: "error",
        title: err.response.data,
      }))
  }
}

export const actualizarPuesto = (id, body) => {
  return () => {
    return axios.put(`${backend}/positions/${id}`, body)
      .then(res => Swal.fire({
        title: "¡Buen trabajo!",
        text: "Puesto actualizado correctamente",
        icon: "success"
      }))
      .catch(err => Swal.fire({
        icon: "error",
        title: err.response.data,
      }))
  }
}

export const eliminarPuesto = (id) => {
  return (dispatch) => {
    return axios.delete(`${backend}/positions/${id}`)
      .then(res => dispatch({ type: ELIMINAR_PUESTO, payload: id }))
      .then(Swal.fire({
        title: "Puesto eliminado correctamente",
        icon: "success"
      }))
      .catch(err => Swal.fire({
        icon: "error",
        title: err.response.data,
      }))
  }
}