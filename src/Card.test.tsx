import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

describe("Card Template test", () => {
  const component = render(
    <Card number={1234123412341234} cvc={"012"} date={"08/24"}></Card>
  );

  expect(component.container).toMatchSnapshot();

  it("number", () => {
    expect(component.getByText(/number:(\d{16})/g).innerHTML).toMatch(/\d{16}/);
    expect(component.getByText(/cvc:\d{3}/g).innerHTML).toMatch(/\d{3}/g);
  });
});
