import { OBTENER_EMPLEADOS, OBTENER_EMPLEADO, VACIAR_ESTADO, ELIMINAR_EMPLEADO } from './actions';

const initialState = {
  empleados: [],
  empleadosCopia: [],
  empleado: [],
  usuarios: []
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
    default: return state;
  }
}

export default reducer;