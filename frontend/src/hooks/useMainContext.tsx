import {useContext} from "react";
import {MainContext} from "../contexts/MainContext.tsx";

export const useMainContext = () => useContext(MainContext)
