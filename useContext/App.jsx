import { Home } from "./components/Home";
import { AppContext } from "./context/context";

export default function app() {
  return (
    <AppContext>
      <Home />
    </AppContext>
  );
}
