import {
  LIMPIAR_MENSAJE,
  OPERACION_EXITOSA,
  OPERACION_FALLIDA,
  CARGAR_USUARIO,
  LIMPIAR_DATOS,
} from "../types/auth";

const initialState = {
  token: "",
  autenticado: false,
  usuario: {},
  mensaje: "",
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CARGAR_USUARIO:
      return {
        ...state,
        token: action.payload.token,
        autenticado: action.payload.token ? true : false,
        usuario: action.payload.usuario,
      };
    case OPERACION_EXITOSA:
      return {
        ...state,
        mensaje: action.payload,
        error: false,
      };
    case OPERACION_FALLIDA:
      return {
        ...state,
        mensaje: action.payload,
        error: true,
        autenticado: false,
      };
    case LIMPIAR_MENSAJE:
      return {
        ...state,
        mensaje: "",
      };
    case LIMPIAR_DATOS:
      return {
        token: "",
        autenticado: false,
        usuario: {},
        mensaje: "",
        error: false,
      };
    default:
      return state;
  }
};

export default reducer;
