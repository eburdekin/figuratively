import { useContext } from "react";
import SessionOptionsContext from "./SessionOptionsContext";

const useSessionOptions = () => {
  const context = useContext(SessionOptionsContext);
  if (!context) {
    throw new Error(
      "useSessionOptions must be used within a SessionOptionsProvider"
    );
  }
  return context;
};

export default useSessionOptions;
