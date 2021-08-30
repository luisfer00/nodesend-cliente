import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Alerta from "../components/Alerta";
import Dropzone from "../components/Dropzone";
import { useSelector } from "react-redux";

export default function Home({ serverURL }) {
  const { autenticado } = useSelector((state) => state.auth);
  const { mensaje_archivo, url } = useSelector((state) => state.app);
  return (
    <Layout serverURL={serverURL}>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
            <p className="text-center text-2xl">
              <span className="font-bold text-red-700 text-4xl uppercase">
                Tu url es:
              </span>{" "}
              {`${window.location.origin}/enlaces/${url}`}
            </p>
            <button
              className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
              onClick={(e) =>
                navigator.clipboard.writeText(
                  `${window.location.origin}/enlaces/${url}`
                )
              }
            >
              Copiar Enlace
            </button>
          </>
        ) : (
          <>
            {mensaje_archivo && <Alerta mensaje={mensaje_archivo} error />}
            <div className="lg:flex mb:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone serverURL={serverURL} />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                  Compartir archivos de forma sencilla y privada
                </h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">ReactNodeSend</span>{" "}
                  te permite comaprtir archivos con cifrado de extremo a extremo
                  y un archivo que es eliminado despues de ser descargado. Asi
                  que puedes mantener lo que compartes en privado y asegurarte
                  de que tus cosas no permanezcan en linea para siempre.
                </p>
                {!autenticado && (
                  <>
                    <Link href="/crear-cuenta">
                      <a className="text-red-500 font-bold text-lg hover:text-red-700">
                        Crea una cuenta
                      </a>
                    </Link>
                    <span> o </span>
                    <Link href="/login">
                      <a className="text-red-500 font-bold text-lg hover:text-red-700">
                        Inicia Sesión
                      </a>
                    </Link>
                    <span> para subir hasta 5MB</span>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const serverURL = process.env.SERVER_URL;

  return {
    props: {
      serverURL,
    },
  };
}
