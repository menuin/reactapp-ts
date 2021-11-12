import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tweet from "./Tweet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDove } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection, onSnapshot, query } from "@firebase/firestore";
import { db } from "../firebase";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const FormContainer = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 30px;
`;
const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
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
type tweetObj = {
  text: String;
  createdAt: String;
  isLiked: Boolean;
  id: string;
};
const Home = () => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState<tweetObj[]>([]); // eslint-disable-line no-unused-vars

  useEffect(() => {
    const q = query(collection(db, "tweets"));
    onSnapshot(q, (querySnapshot) => {
      const newTweets = querySnapshot.docs.map((doc) => ({
        text: doc.data().text,
        createdAt: doc.data().createdAt,
        isLiked: doc.data().isLiked,
        id: doc.id,
      }));
      setTweets(newTweets);
      console.log(newTweets);
    });
  }, []);
  const onSubmit = async (event: any) => {
    event?.preventDefault();
    await addDoc(collection(db, "tweets"), {
      text: tweet,
      createdAt: Date.now(),
      isLiked: false,
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
    <Container>
      <FormContainer>
        <form onSubmit={onSubmit}>
          <Input
            placeholder="Type Something..."
            value={tweet}
            onChange={onChange}
          />
          <SubmitBtn type="submit">
            <FontAwesomeIcon
              icon={faDove}
              color="rgb(40, 121, 197)"
              size="lg"
            />
          </SubmitBtn>
        </form>
      </FormContainer>

      <TweetsContainer>
        {tweets
          .slice(0)
          .reverse()
          .map((tweet, index) => (
            <Tweet key={index} tweetObj={tweet} />
          ))}
      </TweetsContainer>
    </Container>
  );
};

export default Home;
