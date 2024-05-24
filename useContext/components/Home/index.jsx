import { useGlobalContext } from "../../context/context";

export function Home() {
  const { title } = useGlobalContext();
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
