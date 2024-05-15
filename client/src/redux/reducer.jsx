import { OBTENER_EMPLEADOS, OBTENER_EMPLEADO, VACIAR_ESTADO, ELIMINAR_EMPLEADO, OBTENER_USUARIOS, ELIMINAR_USUARIO, OBTENER_PUESTOS } from './actions';

const initialState = {
  empleados: [],
  empleadosCopia: [],
  empleado: [],
  usuarios: [],
  puestos: []
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
    case VACIAR_ESTADO: {
      return {
        ...state,
        empleado: []
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
        usuarios: payload
      }
    };
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
    default: return state;
  }
}

export default reducer;