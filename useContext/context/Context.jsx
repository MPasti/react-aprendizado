import { createContext, useContext } from "react";
import { globalState } from "./data";

const GlobalContext = createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export const AppContext = ({ children }) => {
  const [title, setTitle] = useState(globalState.title);
  const value = { title, setTitle };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
