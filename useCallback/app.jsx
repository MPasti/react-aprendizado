import P from "prop-types";

import React, { useState } from "react";

//vai memorizar o componente caso ele não mude
const Button = React.memo(function Button({ incrementButton }) {
  return <button onClick={() => incrementButton(10)}>+</button>;
});

//useCallback serve para otimizar o código,
//toda vez que mudamos o estado ele renderiza novamente e consequentemente todo conteúdo também
//o render é chamado de novo, mas dentro de uma função temos que analizar isso
// no caso das funções, não temos um método render, para renderizar apenas o retorno,
// temos que renderizar a função inteira, sendo criada toda vez que o componente renderiza, criando
// essa função novamente
// em funções mais pesadas, que você necessita do retorno, é bom usar, em funções pesadas e complicadas
// nesse caso é sempre a mesma função, em teoria o filho não precisa renderizar novamente
// usando o react.memo, como se fosse um cache, para otimizar o código e não necessitar renderizar novamente
// ele vai monitorar e só vai renderizar novamente se tiver mudanças

//useCallback(fn, [])
//estrutura igual o useEffect

Button.propTypes = {
  incrementButton: P.func,
};

export default function app() {
  const [counter, setCounter] = useState();

  const incrementCounter = useCallback((num) => {
    setCounter((c) => c + num);
  }, []);
  //useEffect no estilo component did mount - só vai ser executado uma vez, e não possui dependencias
  //só vai renderizar uma vez

  //usando o useCallback sem dependencias, ele garante que essa função não é atualizada novamente
  //caso essa função seja dependencia de um useEffect, sempre que renderizar novamente o componente
  //a função tambem será atualizada, e fará o useEffect usar de novo, logo vai ficar em memória

  //como essa função está dentro do componente pai, ela renderiza novamente, fazendo o componente
  //filho recarregar, mesmo com o useMemo, pq ele reconhece que mudou
  //só vai recriar a função quando a dependencia mudar

  return (
    <div>
      <p>useCallBack</p>
      <h1>Counter: {counter}</h1>
      <Button incrementButton={incrementCounter} />
    </div>
  );
}
