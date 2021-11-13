import type { User } from "firebase/auth";
import React from "react";
import { googleLogin } from "../googleAuthentication";
import { Button } from "react-bootstrap";

const LoginButton = ({
  onLogin,
}: {
  onLogin: ({
    token,
    user,
  }: {
    token: string | null;
    user: User | null;
  }) => void;
}) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const result = await googleLogin();
    if (result === null) {
      console.error("login failed");
      return;
    }
    const { token, user } = result;

    onLogin({
      token: token ?? null,
      user: user ?? null,
    });
    console.log(token, user);
  };

  return <Button onClick={handleClick}>Sign in with Google</Button>;
};

export default LoginButton;
