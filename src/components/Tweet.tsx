import React, { useEffect, useState } from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { deleteDoc, doc, setDoc } from "@firebase/firestore";
import { db } from "../firebase";

const TweetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  width: 100%;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const LikeContainer = styled.div``;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeleteBtn = styled.span`
  float: none;
  font-size: 10px;
  margin-top: 5px;
  color: #b9b9b9;
`;

const UsernameContainer = styled.div`
  font-size: 10px;
`;

type PartialContext = {
  tweetObj: {
    text: string;
    isLiked: boolean;
    createdAt: string;
    id: string;
    creatorId: string;
    creatorName: string;
  };
};

const Tweet = ({ tweetObj }: PartialContext) => {
  const toggleLike = async () => {
    await setDoc(
      doc(db, "tweets", tweetObj.id),
      {
        isLiked: !tweetObj.isLiked,
      },
      { merge: true }
    );
  };

  useEffect(() => {}, []);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this tweet?");
    if (ok) {
      await deleteDoc(doc(db, "tweets", tweetObj.id));
    }
  };
  return (
    <TweetContainer>
      <TextContainer>
        {tweetObj.text}
        <UsernameContainer>by {tweetObj.creatorName}</UsernameContainer>
        <DeleteBtn onClick={onDeleteClick}>Delete this tweet</DeleteBtn>
      </TextContainer>
      <LikeContainer onClick={toggleLike}>
        <FontAwesomeIcon
          style={{ color: tweetObj.isLiked ? "tomato" : "inherit" }}
          icon={tweetObj.isLiked ? SolidHeart : faHeart}
        />
      </LikeContainer>
    </TweetContainer>
  );
};

export default Tweet;
