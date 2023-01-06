import { useState } from "react";

function MyButton() {
  return <button>My Button</button>;
}

const user = {
  name: "React",
  link: "/vite.svg",
};

const isLogin = 1;

const users = [
  {
    name: "Fahim",
    type: "admin",
    key: 1,
  },
  {
    name: "Gazi",
    type: "user",
    key: 2,
  },
  {
    name: "Saffiullah",
    type: "admin",
    key: 3,
  },
];

const data = users.map((v) => {
  return (
    <li
      onClick={() => console.log(v)}
      key={new Date().getTime() + Math.random()}
      style={{ color: v.type == "admin" ? "red" : "green" }}
    >
      {v.name}
    </li>
  );
});

const CountButton = ({ onClick: handleClick, count }) => {
  // console.log(handleClick, count);
  return <button onClick={handleClick}>Click {count} times</button>;
};

export default function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(<div>woow {Math.random()}</div>);
  };

  return (
    <>
      <h1>This is my test oo App</h1>
      <MyButton />
      <>
        <div>
          {isLogin && (
            <img
              style={{ width: "100px" }}
              src={user.link}
              alt={"phto of " + user.name}
            />
          )}
          {data}
          {new Date().toISOString()}
        </div>
        <CountButton count={count} onClick={handleClick} />
        <CountButton count={count} onClick={handleClick} />
      </>
    </>
  );
}

/// react render every time from root when state change

// component
// hook
// prop -- pass data
