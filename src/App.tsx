import React from "react";
import { useSearch } from "useSearch";
import styled from "styled-components";
import SearchComponent from "components/SearchComponent";
import OwnerInfoComponent from "components/OwnerInfoComponent";
import ErrorMessageComponent from "components/ErrorMessageComponent";

function App() {
  const { loading, search, results, error, clearError } = useSearch();

  return (
    <Container>
      {error && <ErrorMessageComponent error={error} onDismiss={clearError} />}
      <Title>
        <Logo src="logo.gif" alt="Gather Logo" /> Gather
      </Title>
      <About>
        Reverse address lookup for finding owners and their phone numbers
      </About>
      <SearchComponent loading={loading} onSearch={search} />
      <OwnerInfoComponent loading={loading} owner={results} />
    </Container>
  );
}

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 16px;
  padding: 1rem;
  @media (min-width: 1050px) {
    margin: auto;
    width: 900px;
  }
`;

const Title = styled.h1`
  border-bottom: solid 1rem springgreen;
  display: inline-block;
  font-size: 4rem;
  margin: auto auto 0.75rem;
  @media (min-width: 1050px) {
    margin: 0 0 2rem;
  }
`;

const About = styled.p`
  font-size: 1.25rem;
`;

const Logo = styled.img`
  height: 3rem;
  @media (min-width: 1050px) {
    height: 7rem;
  }
`;

export default App;
