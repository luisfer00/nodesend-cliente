import axiosClient from "../../config/axios";
import {
  CARGAR_USUARIO,
  OPERACION_EXITOSA,
  OPERACION_FALLIDA,
  LIMPIAR_MENSAJE,
  LIMPIAR_DATOS,
} from "../types/auth";

export const autenticarUsuario = (serverURL) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const data = (
      await axiosClient(serverURL).get("/api/auth", {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      })
    ).data;
    dispatch(cargarUsuario({ token, usuario: data }));
  } catch (e) {}
};

export const registrarUsuario = (serverURL, datos) => async (dispatch) => {
  try {
    const data = (await axiosClient(serverURL).post("/api/usuarios", datos)).data;
    localStorage.setItem("token", data.token);
    dispatch(operacionExitosa(data.msj));
    dispatch(autenticarUsuario(serverURL));
  } catch (e) {
    dispatch(operacionFallida(e.response.data.msj));
  } finally {
    setTimeout(() => {
      dispatch(limpiarMensaje());
    }, 3000);
  }
};

export const iniciarSesion = (serverURL, datos) => async (dispatch) => {
  try {
    const data = (await axiosClient(serverURL).post("/api/auth", datos)).data;
    localStorage.setItem("token", data.token);
    dispatch(operacionExitosa("Login Exitoso"));
    dispatch(autenticarUsuario(serverURL));
  } catch (e) {
    dispatch(operacionFallida(e.response.data.msj));
  } finally {
    setTimeout(() => {
      dispatch(limpiarMensaje());
    }, 3000);
  }
};

export const cerrarSesion = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(limpiarDatos());
};

const operacionExitosa = (msj) => ({
  type: OPERACION_EXITOSA,
  payload: msj,
});

const operacionFallida = (msj) => ({
  type: OPERACION_FALLIDA,
  payload: msj,
});

const limpiarMensaje = () => ({
  type: LIMPIAR_MENSAJE,
});

const cargarUsuario = (data) => ({
  type: CARGAR_USUARIO,
  payload: data,
});

const limpiarDatos = () => ({
  type: LIMPIAR_DATOS,
});
