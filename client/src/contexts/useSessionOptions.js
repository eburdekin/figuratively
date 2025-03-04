import { useContext } from "react";
import SessionOptionsContext from "./SessionOptionsContext";

const useSessionOptions = () => useContext(SessionOptionsContext);

export default useSessionOptions;
