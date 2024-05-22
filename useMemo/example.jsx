import { useState } from "react";

const Post = ({ post }) => {
  console.log("filho renderizou");
  return (
    <div className="post">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export function example() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");
  //toda vez que o value mudar, a pagina inteira vai renderizar novamente
  //então é preciso usar o useMemo -> só tem necessidade de otimizar se tiver problemas, não sempre
  //para isso precisamos do useMemo para memorizar os posts
  console.log("Pai renderizou");

  //fetch é assincrono, ele renderiza primeiro os posts, dps termina o fetch, para gerar o map do posts
  //logo tem 2 render, inicial e quando acaba o fetch
  useEffect(() => {
    setTimeout(function () {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((res) => setPosts(res));
    }, 5000);
  }, []);

  return (
    <div>
      <div className="app">
        <p>
          <input
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
              return <Post key={post.id} post={post} />;
            })
          );
        }, [posts])}
        {posts.length <= 0 && <p>Carregando posts...</p>}
      </div>
    </div>
  );
}
