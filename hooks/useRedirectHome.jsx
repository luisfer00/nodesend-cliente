import { useRouter } from "next/router";
import React from "react";

const useRedirectHome = () => {
  const router = useRouter();
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => router.push("/"), 3000);
    });
};

export default useRedirectHome;
