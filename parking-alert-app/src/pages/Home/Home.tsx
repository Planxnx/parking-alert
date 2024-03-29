import React from "react";
import styled from "styled-components";

const DivHome = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomePage: React.FC = () => {
  return (
    <DivHome>
      <h3>
        Parking Alert by <a href="planxnx.dev">Planxnx.dev</a>
      </h3>
    </DivHome>
  );
};

export default HomePage;
