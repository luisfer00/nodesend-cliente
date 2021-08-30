import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import { isObjectEmptyOrNull } from "../helpers";
import { cerrarSesion } from "../redux/actions/auth";
import { limpiarState } from "../redux/actions/app";
import Logo from "../public/logo.svg";

const Header = () => {
  const { autenticado, usuario } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <header className="py-8  flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <a onClick={(e) => dispatch(limpiarState())}>
          <div style={{width: "265px"}}>
            <Image src={Logo} alt="Logo" />
          </div>
        </a>
      </Link>
      <div>
        {!isObjectEmptyOrNull(usuario) ? (
          <div className="flex items-center">
            <p className="mr-2">Hola {usuario.nombre}</p>
            <button
              className="bg-black px-5 py-3 rounded text-white font-bold uppercase"
              onClick={(e) => dispatch(cerrarSesion())}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 px-5 py-3 mr-2 rounded text-white font-bold uppercase">
                Iniciar Sesión
              </a>
            </Link>
            <Link href="/crear-cuenta">
              <a className="bg-black px-5 py-3 rounded text-white font-bold uppercase">
                Crear Cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
