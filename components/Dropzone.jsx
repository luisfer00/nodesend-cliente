import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  crearEnlace,
  mostrarAlerta,
  ocultarAlerta,
  subirArchivo,
} from "../redux/actions/app";
import Formulario from "./Formulario";

const Dropzone = ({ serverURL }) => {
  const dispatch = useDispatch();
  const { cargando, nombre, nombre_original, descargas, password, autor } =
    useSelector((state) => state.app);
  const { autenticado, token } = useSelector((state) => state.auth);
  const onDropAccepted = useCallback(
    (acceptedFiles) => {
      const formData = new FormData();
      formData.append("archivo", acceptedFiles[0]);
      dispatch(subirArchivo(serverURL, formData, acceptedFiles[0].path, token));
    },
    [token]
  );

  const onDropRejected = () => {
    dispatch(mostrarAlerta("Archivo muy pesado"));
    setTimeout(() => dispatch(ocultarAlerta()), 3000);
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDropAccepted,
      onDropRejected,
      maxSize: autenticado ? 5 * Math.pow(1024, 2) : Math.pow(1024, 2),
    });

  const archivos = acceptedFiles.map((archivo) => (
    <li
      key={archivo.lastModified}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-xl">{archivo.path}</p>
      <p className="text-sm text-gray-500">
        {(archivo.size / Math.pow(1024, 1)).toFixed(2)} KB
      </p>
    </li>
  ));

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul>{archivos}</ul>
          {autenticado && (
            <>
              <Formulario />
            </>
          )}
          {cargando ? (
            <p className="my-10 text-center text-gray-600">
              Subiendo Archivo...
            </p>
          ) : (
            <button
              className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
              onClick={(e) => {
                dispatch(
                  crearEnlace(
                    serverURL,
                    {
                      nombre,
                      nombre_original,
                      descargas,
                      password,
                    },
                    token
                  )
                );
              }}
            >
              Crear Enlace
            </button>
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input {...getInputProps()} className="h-100" />

          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">
              Suelta el archivo
            </p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">
                Selecciona un archivo y arrastralo aquí{" "}
                {autenticado ? "(maximo 5MB)" : "(maximo 1MB)"}
              </p>
              <button
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                type="button"
              >
                Selecciona archivos para subir
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
