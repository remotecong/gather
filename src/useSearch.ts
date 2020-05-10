import { useState } from "react";
import { ResidentData } from "components/ResidentInfoComponent";

interface State {
  loading: boolean;
  error: Error | null;
  results: ResidentData | null;
}

const initialState: State = {
  loading: false,
  error: null,
  results: null
};

export function useSearch() {
  const [state, setState] = useState(initialState);

  async function search(address: string) {
    setState({ loading: true, error: null, results: null });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}?address=${encodeURIComponent(
          address
        )}`
      );

      const data = await response.json();

      if (data.error) {
        switch (data.error) {
          case "badaddress":
            throw new Error("Address could not be interpreted");

          default:
            console.error("Unexpected error", data);
            throw new Error(data.error);
        }
      }
      setState({ error: null, results: data, loading: false });
    } catch (err) {
      setState({ error: err, results: null, loading: false });
    }
  }

  const clearError = () => setState({ ...state, error: null });

  return {
    loading: state.loading,
    error: state.error,
    results: state.results,
    search,
    clearError
  };
}
