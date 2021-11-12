import React, { useState } from "react";
import Home from "./components/Home";
import type { User } from "firebase/auth";
import LogoutButton from "./components/LogoutButton";
import LoginButton from "./components/LoginButton";

const App = () => {
  const [state, setState] = useState<{
    token: string | null;
    user: User | null;
    isLoggedIn: boolean;
  }>({
    token: JSON.parse(localStorage.getItem("token") ?? "{}") ?? null,
    user: JSON.parse(localStorage.getItem("user") ?? "{}") ?? null,
    isLoggedIn: false,
  });

  const setAuth = ({
    token,
    user,
  }: {
    token: string | null;
    user: User | null;
  }) => {
    setState({ token, user, isLoggedIn: !!user });
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
  };
  return (
    <div style={{ width: "800px", margin: "auto" }} className="App">
      {state.isLoggedIn ? (
        <div>
          <Home />
          <LogoutButton onLogout={() => setAuth({ token: null, user: null })} />
        </div>
      ) : (
        <LoginButton onLogin={setAuth} />
      )}
    </div>
  );
};

export default App;
