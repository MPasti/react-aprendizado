import { useState, useRef } from "react";

const Post = ({ post, handleClick }) => {
  console.log("filho renderizou");
  return (
    <div className="post">
      <h1
        onClick={() => {
          handleClick(post.title);
        }}
      >
        {post.title}
      </h1>
      <p>{post.body}</p>
    </div>
  );
};

//useRef funciona como se fosse o document.querySelector

export function app() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");
  const input = useRef(null);
  //para capturar um elemento da DOM
  const contador = useRef(0);

  console.log("Pai renderizou");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res));
  }, []);

  useEffect(() => {
    //sempre current
    // no current temos o valor do ref, se nao aplicou em nenhum lugar é null
    //se colocou, vai trazer o elemento html
    console.log(input.current);
    console.log(input.current.value);
    input.current.focus();
  }, [value]);

  useEffect(() => {
    contador.current++;
  });
  //esse useEffect é um component did update

  const handlePostClick = (e) => {
    setValue(e);
  };

  return (
    <div>
      <div className="app">
        <h1>Renderizou {contador.current}x</h1>
        <p>
          <input
            ref={input}
            type="search"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </p>
        {useMemo(() => {
          return (
            posts.length > 0 &&
            posts.map((post) => {
              return (
                <Post key={post.id} post={post} onClick={handlePostClick} />
              );
            })
          );
        }, [posts])}
        {posts.length <= 0 && <p>Carregando posts...</p>}
      </div>
    </div>
  );
}
