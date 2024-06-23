import { useEffect } from "react";

const useClearTokensOnUnload = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("pasienId");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};

export default useClearTokensOnUnload;
