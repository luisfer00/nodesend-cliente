import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import Alerta from "../../components/Alerta";
import axiosClient from "../../config/axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  agregarDatosFormulario,
  checkPasswordEnlace,
} from "../../redux/actions/app";

const Enlace = ({ serverURL, archivo, password }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    passwordValido,
    password: passwordFormulario,
    mensaje_archivo,
  } = useSelector((state) => state.app);
  const { enlace } = router.query;

  return (
    <Layout serverURL={serverURL}>
      {password && !passwordValido ? (
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            {mensaje_archivo && <Alerta mensaje={mensaje_archivo} error />}
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(checkPasswordEnlace(serverURL, enlace, passwordFormulario));
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Contraseña
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Contraseña de Usuario"
                  value={passwordFormulario}
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
              <input
                className="bg-red-500 hover:bg-gray-900 cursor-pointer w-full p-2 text-white uppercase font-bold rounded"
                type="submit"
                value="Verificar contraseña"
              />
            </form>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo:
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`https://luisfer00-nodesend.herokuapp.com/api/files/${archivo}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const serverURL = process.env.SERVER_URL;

  try {
    const {
      params: { enlace },
    } = context;
    const { archivo, password } = (
      await axiosClient(serverURL).get(`/api/enlaces/${enlace}`)
    ).data;
    if (!archivo)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };

    return {
      props: { serverURL, archivo, password },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default Enlace;
