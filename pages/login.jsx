import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import * as yup from "yup";

import Layout from "../components/Layout";
import Alerta from "../components/Alerta";
import { iniciarSesion } from "../redux/actions/auth";

const Login = ({ serverURL }) => {
  const [loading, setLoading] = useState(false);
  const { mensaje, error, autenticado } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: yup
        .string()
        .min(6, "Debe ser de minimo 6 caracteres")
        .required("El password es obligatorio"),
    }),
    onSubmit: (value) => {
      dispatch(iniciarSesion(serverURL, value, setLoading));
    },
  });

  useEffect(() => {
    if (autenticado) {
      router.push("/");
    }
  }, [autenticado]);

  const printError = (touched, errors) =>
    touched && errors ? (
      <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
        <p className="font-bold">Error</p>
        <p>{errors}</p>
      </div>
    ) : null;
  return (
    <Layout serverURL={serverURL}>
      {!autenticado && (
        <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
          <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
            Iniciar Sesión
          </h2>
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              {mensaje && <Alerta mensaje={mensaje} error={error} />}
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}
              >
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-black text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email de Usuario"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {printError(formik.touched.email, formik.errors.email)}
                </div>
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
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {printError(formik.touched.password, formik.errors.password)}
                </div>
                <input
                  className={`bg-red-500 hover:bg-gray-900 cursor-pointer w-full p-2 text-white uppercase font-bold rounded ${
                    loading && "opacity-60 cursor-not-allowed"
                  }`}
                  type="submit"
                  disabled={loading}
                  value={loading ? "Cargando..." : "Iniciar Sesión"}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export async function getStaticProps() {
  const serverURL = process.env.SERVER_URL;

  return {
    props: {
      serverURL,
    },
  };
}

export default Login;
