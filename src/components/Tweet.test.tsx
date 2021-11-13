import React from "react";
import { render } from "@testing-library/react";
import Tweet from "./Tweet";

// for firebase mocking
jest.mock("@firebase/firestore", () => {
  return {
      getFirestore: jest.fn(),
  };
});

const testObj = {
  text: "test text!",
  isLiked: true,
  createdAt: "2021-11-12",
  id: "123",
  creatorId: "1234",
  creatorName: "test username!",
};

describe("Tweet Component Test", () => {
  const component = render(<Tweet tweetObj={testObj}></Tweet>);
  expect(component.container).toMatchSnapshot();

  it("check text", () => {
    expect(component.getByText("test text!"));
    expect(component.getByText("by test username!"));
  });
});
