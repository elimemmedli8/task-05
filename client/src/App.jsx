import { useState } from "react";
import Login from "./components/Login";
import Todo from "./components/Todo";

function App() {
  const [login, setLogin] = useState(false);
  const [userId, setUserId] = useState(undefined);
  return (
    <div>
      {login ? (
        <Todo userId={userId} setLogin={setLogin} />
      ) : (
        <Login setUserId={setUserId} setLogin={setLogin} />
      )}
    </div>
  );
}

export default App;
