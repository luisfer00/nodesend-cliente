import React from "react";

const Alerta = ({ mensaje, error }) => {
  return (
    <div className={`${error ? "bg-red-500" : "bg-green-400"} py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto`}>
      {mensaje}
    </div>
  );
};

export default Alerta;
