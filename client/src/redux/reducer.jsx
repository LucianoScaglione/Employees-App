import { OBTENER_EMPLEADOS, OBTENER_EMPLEADO, OBTENER_EMPLEADOS_QUERY, EDITAR_EMPLEADO, VACIAR_ESTADO, ELIMINAR_EMPLEADO, OBTENER_USUARIOS, OBTENER_USUARIO, OBTENER_USUARIOS_QUERY, EDITAR_USUARIO, ELIMINAR_USUARIO, OBTENER_PUESTOS, ELIMINAR_PUESTO, OBTENER_PUESTO, EDITAR_PUESTO, OBTENER_PUESTOS_QUERY } from './actions';

const initialState = {
  empleados: [],
  empleadosCopia: [],
  empleado: [],
  usuarios: [],
  usuariosCopia: [],
  usuario: [],
  puestos: [],
  puestosCopia: [],
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
    case EDITAR_EMPLEADO: {
      const actualizarEmpleado = state.empleados.map(empleado => empleado.id === payload.id ? payload : empleado);
      return {
        ...state,
        empleados: actualizarEmpleado,
        empleadosCopia: actualizarEmpleado
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
    };
    case EDITAR_USUARIO: {
      const editarUsuario = state.usuarios.map(usuario => usuario.id === payload.id ? payload : usuario);
      return {
        ...state,
        usuarios: editarUsuario
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
        puestos: payload,
        puestosCopia: payload
      }
    };
    case OBTENER_PUESTOS_QUERY: {
      const resultado = payload.map(r => r.puesto)
      const filtrarPuestos = state.puestosCopia.filter(puesto => resultado.includes(puesto.puesto));
      return {
        ...state,
        puestos: filtrarPuestos
      }
    };
    case OBTENER_PUESTO: {
      return {
        ...state,
        puesto: payload
      }
    };
    case EDITAR_PUESTO: {
      const actualizarPuesto = state.puestos.map(puesto => puesto.id === payload.id ? payload : puesto);
      return {
        ...state,
        puestos: actualizarPuesto
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