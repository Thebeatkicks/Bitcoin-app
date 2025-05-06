import React, { useState, useEffect } from 'react';

const Bitcoin = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
      );
      const data = await response.json();

      if (data.bitcoin && data.bitcoin.usd) {
        setBitcoinPrice(data.bitcoin.usd);
        setError(null);
      } else {
        setError('Invalid data from CoinGecko');
      }
    } catch (err) {
      setError('Failed to fetch Bitcoin price');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>'
        <h2 className="text-gray-400 italic text-center w-full">The Current Price for Bitcoin:</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : bitcoinPrice !== null ? (
        <p className="text-3xl bold text-center w-full">${bitcoinPrice.toFixed(2)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Bitcoin;
