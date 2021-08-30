import {
  CREAR_ENLACE_ERROR,
  CREAR_ENLACE_EXITO,
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ARCHIVO_ERROR,
  SUBIR_ARCHIVO_EXITO,
  SUBIENDO_ARCHIVO,
  LIMPIAR_STATE,
  AGREGAR_DATOS_FORMULARIO,
  PASSWORD_VALIDO
} from "../types/app";

const initialState = {
  mensaje_archivo: "",
  nombre: "",
  nombre_original: "",
  cargando: false,
  descargas: 1,
  password: "",
  url: "",
  passwordValido: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        mensaje_archivo: action.payload,
      };
    case OCULTAR_ALERTA:
      return {
        ...state,
        mensaje_archivo: "",
      };
    case SUBIR_ARCHIVO_EXITO:
      return {
        ...state,
        nombre: action.payload.nombre,
        nombre_original: action.payload.nombre_original,
        cargando: false,
      };
    case SUBIR_ARCHIVO_ERROR:
      return {
        ...state,
        mensaje_archivo: action.payload,
        cargando: false,
      };
    case SUBIENDO_ARCHIVO:
      return {
        ...state,
        cargando: true,
      };
    case CREAR_ENLACE_EXITO:
      return {
        ...state,
        url: action.payload,
      };
    case LIMPIAR_STATE:
      return {
        mensaje_archivo: "",
        nombre: "",
        nombre_original: "",
        cargando: false,
        descargas: 1,
        password: "",
        url: "",
      };
    case AGREGAR_DATOS_FORMULARIO:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case PASSWORD_VALIDO:
      return{
        ...state,
        passwordValido: true
      }
    default:
      return state;
  }
};

export default reducer;
