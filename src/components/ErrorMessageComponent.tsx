import React from "react";
import styled from "styled-components";
import { IconX } from "components/icons";

interface Props {
    error: Error;
    onDismiss: () => void;
}

function ErrorMessageComponent({ error, onDismiss }: Props) {
  return (
    <Container>
      <ErrorMessage>
        {error.message}
        <IconX fill="white" onClick={onDismiss} />
      </ErrorMessage>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
`;

const ErrorMessage = styled.p`
  align-items: center;
  background: magenta;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  @media (min-width: 1050px) {
    margin: auto;
    width: 900px;
  }
`;

export default ErrorMessageComponent;
