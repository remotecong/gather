import React from "react";
import styled, { keyframes } from "styled-components";

function LoadingIndicatorComponent() {
  return (
    <Spinner>
      <Bar />
      <Bar2 />
      <Bar3 />
      <Bar4 />
      <Bar5 />
    </Spinner>
  );
}

const Spinner = styled.div`
  margin: 100px auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
`;

const Stretch = keyframes`
    0%, 40%, 100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
    }
    20% {
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
    }
`;

const Bar = styled.div`
  background-color: blue;
  height: 100%;
  width: 6px;
  display: inline-block;

  -webkit-animation: ${Stretch} 1.2s infinite ease-in-out;
  animation: ${Stretch} 1.2s infinite ease-in-out;
`;

const Bar2 = styled(Bar)`
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
`;

const Bar3 = styled(Bar)`
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
`;

const Bar4 = styled(Bar)`
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
`;

const Bar5 = styled(Bar)`
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
`;

export default LoadingIndicatorComponent;
