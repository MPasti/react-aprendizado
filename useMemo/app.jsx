import P from "prop-types";

import { useState, useMemo } from "react";

const Button = ({ incrementButton }) => {
  return <button onClick={() => incrementButton(10)}>+</button>;
};

Button.propTypes = {
  incrementButton: P.func,
};

export function app() {
  const [counter, setCounter] = useState();

  const incrementCounter = useCallback((num) => {
    setCounter((c) => c + num);
  }, []);

  const btn = useMemo(() => {
    <Button incrementButton={incrementCounter} />;
  }, [incrementCounter]);

  return (
    <div>
      <p>useCallBack</p>
      <h1>Counter: {counter}</h1>
      {btn}
    </div>
  );
}

// export function app() {
//   const [counter, setCounter] = useState();

//   const incrementCounter = useCallback((num) => {
//     setCounter((c) => c + num);
//   }, []);

//   return (
//     <div>
//       <p>useCallBack</p>
//       <h1>Counter: {counter}</h1>
//       {useMemo(() => {
//         <Button incrementButton={incrementCounter} />;
//       }, [incrementCounter])}
//     </div>
//   );
// }
