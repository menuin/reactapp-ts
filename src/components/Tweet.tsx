import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

type PartialContext = {
  tweetObj: {
    text: String;
    isLiked: Boolean;
  };
};

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

const Tweet = ({ tweetObj }: PartialContext) => {
  const [isLiked, setIsLiked] = useState<Boolean>(false);
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(tweetObj.isLiked);
  }, []);

  return (
    <TweetContainer>
      <div>{tweetObj.text}</div>
      <LikeContainer onClick={toggleLike}>
        <FontAwesomeIcon
          style={{ color: isLiked ? "tomato" : "inherit" }}
          icon={isLiked ? SolidHeart : faHeart}
        />
      </LikeContainer>
    </TweetContainer>
  );
};

export default Tweet;
