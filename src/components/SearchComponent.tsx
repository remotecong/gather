import React from "react";
import styled from "styled-components";

interface Props {
  loading: boolean;
  onSearch: (q: string) => void;
}

function SearchComponent({ loading, onSearch }: Props) {
  const [addr, setAddr] = React.useState("");

  React.useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      try {
        if (e.clipboardData) {
          const data = e.clipboardData.getData("text");
          setAddr(data);
          onSearch(data);
        }
      } catch (ignore) {
        console.warn("Browser failed to capture paste data", ignore);
      }
    };

    document.addEventListener("paste", onPaste);

    return () => document.removeEventListener("paste", onPaste);
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addr && !loading) {
      onSearch(addr);
    }
  };

  const captureAddress = ({
    currentTarget
  }: React.ChangeEvent<HTMLInputElement>) => setAddr(currentTarget.value);

  return (
    <form onSubmit={submit}>
      <Input
        value={addr}
        onChange={captureAddress}
        onPaste={e => e.preventDefault()}
        placeholder="Street, City, State and/or Zip"
      />
      <Button disabled={!addr || loading}>Search</Button>
    </form>
  );
}

const Button = styled.button`
  --webkit-appearance: none;
  background: springgreen;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.75rem;
  &:disabled {
    background: #ccc;
  }
  @media (min-width: 1050px) {
    padding: 1rem;
  }
`;

const Input = styled.input`
  --webkit-appearance: none;
  border-color: #dbdbdb;
  borde-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  display: block;
  font-size: 1rem;
  justify-content: flex-start;
  line-height: 1.5;
  margin: 0.5rem 0;
  max-width: 100%;
  padding: calc(0.375em - 1px) calc(0.625em - 1px);
  position: relative;
  vertical-align: top;
  width: 100%;
  @media (min-width: 1050px) {
    font-size: 1.25rem;
  }
`;

export default SearchComponent;
