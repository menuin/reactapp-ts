import React from "react";

const Card = ({
  number,
  cvc,
  date,
}: {
  number: number;
  cvc: string;
  date: string;
}) => {
  return (
    <div>
      number:{number}
      cvc:{cvc}
      date:{date}
    </div>
  );
};

export default Card;
