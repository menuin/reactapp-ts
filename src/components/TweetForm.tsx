import { addDoc, collection } from "@firebase/firestore";
import { faDove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import type { User } from "firebase/auth";

const FormContainer = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 30px;
`;
const Input = styled.input`
  width: 30%;
  border-radius: 3px;
  padding: 15px;
  border: none;
  margin-right: 20px;
  &:focus {
    outline: none;
  }
`;
const SubmitBtn = styled.button`
  border: none;
  width: 30px;
  height: 30px;
`;

type UserStateType = {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
};

const TweetForm = ({ userState }: { userState: UserStateType }) => {
  const [tweet, setTweet] = useState("");

  const onSubmit = async (event: any) => {
    event?.preventDefault();
    await addDoc(collection(db, "tweets"), {
      text: tweet,
      createdAt: Date.now(),
      isLiked: false,
      creatorId: userState.user?.uid,
      creatorName: userState.user?.displayName,
    });
    setTweet("");
  };
  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <FormContainer>
      <form onSubmit={onSubmit}>
        <Input
          placeholder="Type Something..."
          value={tweet}
          onChange={onChange}
        />
        <SubmitBtn type="submit">
          <FontAwesomeIcon icon={faDove} color="rgb(40, 121, 197)" size="lg" />
        </SubmitBtn>
      </form>
    </FormContainer>
  );
};

export default TweetForm;
