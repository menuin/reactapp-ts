import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tweet from "./Tweet";
import { addDoc, collection, onSnapshot, query } from "@firebase/firestore";
import { db } from "../firebase";
import type { User } from "firebase/auth";
import TweetForm from "./TweetForm";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const TweetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;
type UserStateType = {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
};
type TweetObj = {
  text: string;
  isLiked: boolean;
  createdAt: string;
  id: string;
  creatorId: string;
  creatorName: string;
};
const Home = ({ userState }: { userState: UserStateType }) => {
  const [tweets, setTweets] = useState<TweetObj[]>([]); // eslint-disable-line no-unused-vars

  useEffect(() => {
    const q = query(collection(db, "tweets"));
    onSnapshot(q, (querySnapshot) => {
      const newTweets = querySnapshot.docs.map((doc) => ({
        text: doc.data().text,
        createdAt: doc.data().createdAt,
        isLiked: doc.data().isLiked,
        id: doc.id,
        creatorId: doc.data().creatorId,
        creatorName: doc.data().creatorName,
      }));
      setTweets(newTweets);
    });
  }, []);

  return (
    <Container>
      <TweetForm userState={userState} />
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
