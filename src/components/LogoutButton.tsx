import { Button } from "react-bootstrap";
import React from "react";
import { googleLogout } from "../googleAuthentication";

const LogoutButton = ({ onLogout }: { onLogout: () => void }) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    googleLogout();
    onLogout();
  };
  return <Button onClick={handleClick}>logout</Button>;
};

export default LogoutButton;
