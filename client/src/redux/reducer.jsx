import { OBTENER_EMPLEADOS, OBTENER_EMPLEADO, VACIAR_ESTADO } from './actions';

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
    default: return state;
  }
}

export default reducer;