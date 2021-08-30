import React, { useEffect } from "react";
import Head from "next/head";

import Header from "./Header";
import { useDispatch } from "react-redux";
import { autenticarUsuario } from "../redux/actions/auth";

const Layout = ({ serverURL, children, noAuth }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!noAuth) dispatch(autenticarUsuario(serverURL));
  }, []);

  return (
    <>
      <Head>
        <title>Nodesend - Comparte Archivos con tu Entorno</title>
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="bg-gray-100 min-h-screen pb-8">
        <div className="container mx-auto">
          <Header />
          <main className="mt-20">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
