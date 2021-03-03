import React from "react";
import styled from "styled-components";

const Div404 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Page404Container: React.FC = () => {
  return (
    <Div404>
      <h1>Not found :(</h1>
    </Div404>
  )
};

export default Page404Container;
