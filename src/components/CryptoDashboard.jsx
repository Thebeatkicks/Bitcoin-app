import React, { useEffect, useState } from 'react';

const CryptoDashboard = ({ selectedCoins }) => {
  const [prices, setPrices] = useState({});
  const [error, setError] = useState(null);

  const fetchPrices = async () => {
    if (!selectedCoins.length) return;

    try {
      const ids = selectedCoins.join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      const data = await response.json();
      setPrices(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch prices');
    }
  };

  useEffect(() => {
  if (!selectedCoins.length) return;

  fetchPrices();

  const interval = setInterval(() => {
    fetchPrices();
  }, 10000);

  return () => clearInterval(interval);
}, [selectedCoins]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Live Crypto Prices</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {selectedCoins.map((coin) => (
          <div
            key={coin}
            className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow"
          >
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              {coin}
            </h2>
            <p className="text-lg font-bold mt-2 text-black">
              {prices[coin]?.usd ? `$${prices[coin].usd.toFixed(2)}` : 'Loading...'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoDashboard;
