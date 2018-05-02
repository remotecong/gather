export default address => fetch(`${process.env.REACT_APP_API_URL}?address=${encodeURIComponent(address)}`)
    .then(r => r.json());
