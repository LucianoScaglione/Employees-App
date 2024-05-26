import { OBTENER_EMPLEADOS, OBTENER_EMPLEADO, VACIAR_ESTADO, ELIMINAR_EMPLEADO, OBTENER_USUARIOS, OBTENER_USUARIO, ELIMINAR_USUARIO, OBTENER_PUESTOS, ELIMINAR_PUESTO, OBTENER_PUESTO, OBTENER_EMPLEADOS_QUERY, OBTENER_USUARIOS_QUERY } from './actions';

const initialState = {
  empleados: [],
  empleadosCopia: [],
  empleado: [],
  usuarios: [],
  usuariosCopia: [],
  usuario: [],
  puestos: [],
  puesto: []
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case OBTENER_EMPLEADOS: {
      return {
        ...state,
        empleados: payload,
        empleadosCopia: payload
      }
    };
    case OBTENER_EMPLEADO: {
      return {
        ...state,
        empleado: payload
      }
    };
    case OBTENER_EMPLEADOS_QUERY: {
      const primerNombre = payload.map(e => e.primerNombre)
      const primerApellido = payload.map(e => e.primerApellido)
      const filtrarEmpleados = state.empleadosCopia.filter(empleado => primerNombre.includes(empleado.primerNombre) || primerApellido.includes(empleado.primerApellido));
      return {
        ...state,
        empleados: filtrarEmpleados
      }
    };
    case VACIAR_ESTADO: {
      return {
        ...state,
        empleado: [],
        puesto: []
      }
    };
    case ELIMINAR_EMPLEADO: {
      const filtrarEmpleados = state.empleados.filter(empleado => empleado.id !== payload);
      return {
        ...state,
        empleados: filtrarEmpleados
      }
    };
    case OBTENER_USUARIOS: {
      return {
        ...state,
        usuarios: payload,
        usuariosCopia: payload
      }
    };
    case OBTENER_USUARIO: {
      return {
        ...state,
        usuario: payload
      }
    };
    case OBTENER_USUARIOS_QUERY: {
      const resultado = payload.map(r => r.nombreUsuario)
      const filtrarUsuarios = state.usuariosCopia.filter(usuario => resultado.includes(usuario.nombreUsuario));
      return {
        ...state,
        usuarios: filtrarUsuarios
      }
    }
    case ELIMINAR_USUARIO: {
      const usuarioEliminado = state.usuarios.filter(user => user.id !== payload);
      return {
        ...state,
        usuarios: usuarioEliminado
      }
    };
    case OBTENER_PUESTOS: {
      return {
        ...state,
        puestos: payload
      }
    };
    case OBTENER_PUESTO: {
      return {
        ...state,
        puesto: payload
      }
    }
    case ELIMINAR_PUESTO: {
      const eliminarPuesto = state.puestos.filter(puesto => puesto.id !== payload);
      return {
        ...state,
        puestos: eliminarPuesto
      }
    };
    default: return state;
  }
}

export default reducer;