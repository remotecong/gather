import { useState } from "react";
import { OwnerData } from "components/OwnerInfoComponent";

interface State {
  loading: boolean;
  error: Error | null;
  results: OwnerData | null;
}

const initialState: State = {
  loading: false,
  error: null,
  results: null
};

export function useSearch() {
  const [state, setState] = useState(initialState);

  async function search(address: string) {
    setState({ ...state, loading: true });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}?address=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      setState({ ...state, results: data, loading: false });
    } catch (err) {
      setState({ ...state, error: err, loading: false });
    }
  }

  return {
    loading: state.loading,
    error: state.error,
    results: state.results,
    search
  };
}
