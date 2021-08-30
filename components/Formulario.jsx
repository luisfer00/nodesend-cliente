import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { agregarDatosFormulario } from "../redux/actions/app";

const Formulario = () => {
  const { descargas, password } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  return (
    <div className="w-full mt-20">
      <label htmlFor="descargas" className="text-lg text-gray-800">
        Eliminar tras:
      </label>
      <select
        name="descargas"
        id="descargas"
        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounder leading-none focus:outline-none focus:border-gray-500"
        onChange={(e) =>
          dispatch(
            agregarDatosFormulario({
              name: e.target.name,
              value: e.target.value,
            })
          )
        }
        value={descargas}
      >
        <option value="1">1 Descarga</option>
        <option value="5">5 Descargas</option>
        <option value="10">10 Descargas</option>
        <option value="20">20 Descargas</option>
        <option value="30">30 Descargas</option>
      </select>
      <label htmlFor="password">Contraseña (opcional): </label>
      <input
        type="password"
        value={password}
        name="password"
        id="password"
        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounder leading-none focus:outline-none focus:border-gray-500"
        onChange={(e) =>
          dispatch(
            agregarDatosFormulario({
              name: e.target.name,
              value: e.target.value,
            })
          )
        }
      />
    </div>
  );
};

export default Formulario;
