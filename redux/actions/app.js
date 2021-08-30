import axiosClient from "../../config/axios";
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
  PASSWORD_VALIDO,
} from "../types/app";

export const mostrarAlerta = (msj) => ({
  type: MOSTRAR_ALERTA,
  payload: msj,
});

export const ocultarAlerta = () => ({
  type: OCULTAR_ALERTA,
});

export const subirArchivo =
  (serverURL, formData, originalName, token) => async (dispatch) => {
    try {
      dispatch(subiendoArchivo());
      const data = (
        await axiosClient(serverURL).post("/api/files", formData, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        })
      ).data;
      dispatch(subirArchivoExito(data.filename, originalName));
    } catch (e) {
      dispatch(subirArchivoError(e.response.data.msj));
    }
  };

export const crearEnlace = (serverURL, linkData, token) => async (dispatch) => {
  try {
    const data = (
      await axiosClient(serverURL).post("/api/enlaces", linkData, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      })
    ).data;
    dispatch(crearEnlaceExito(data.msj));
  } catch (e) {}
};

export const checkPasswordEnlace = (serverURL, enlace, password) => async (dispatch) => {
  try {
    const data = (
      await axiosClient(serverURL).post(`/api/enlaces/${enlace}`, { password })
    ).data;
    if (!data.password) return dispatch(mostrarAlerta(data.msj));
    dispatch(passwordValido());
  } catch (e) {
    dispatch(mostrarAlerta(e.response.data.msj));
  } finally {
    setTimeout(() => dispatch(ocultarAlerta()), 3000);
  }
};

export const limpiarState = () => ({
  type: LIMPIAR_STATE,
});

export const agregarDatosFormulario = (target) => ({
  type: AGREGAR_DATOS_FORMULARIO,
  payload: target,
});

const crearEnlaceExito = (url) => ({
  type: CREAR_ENLACE_EXITO,
  payload: url,
});

const subirArchivoExito = (nombre, nombre_original) => ({
  type: SUBIR_ARCHIVO_EXITO,
  payload: {
    nombre,
    nombre_original,
  },
});

const subirArchivoError = (msj) => ({
  type: SUBIR_ARCHIVO_ERROR,
  payload: msj,
});

const subiendoArchivo = () => ({
  type: SUBIENDO_ARCHIVO,
});

const passwordValido = () => ({
  type: PASSWORD_VALIDO,
});
