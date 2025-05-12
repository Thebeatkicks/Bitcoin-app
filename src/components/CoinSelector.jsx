import React, { useState, useEffect } from 'react';

const availableCoins = ['bitcoin', 'ethereum', 'dogecoin', 'solana', 'litecoin'];

const CoinSelector = ({ username, onUpdate }) => {
  const [selectedCoins, setSelectedCoins] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(`userCoins_${username}`);
    if (saved) {
      setSelectedCoins(JSON.parse(saved));
      onUpdate(JSON.parse(saved)); 
    }
  }, [username]);

  const toggleCoin = (coin) => {
    const updated = selectedCoins.includes(coin)
      ? selectedCoins.filter((c) => c !== coin)
      : [...selectedCoins, coin];

    setSelectedCoins(updated);
    localStorage.setItem(`userCoins_${username}`, JSON.stringify(updated));
    onUpdate(updated);
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Select Coins</h3>
      <div className="flex gap-4 flex-wrap">
        {availableCoins.map((coin) => (
          <label key={coin} className="cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCoins.includes(coin)}
              onChange={() => toggleCoin(coin)}
              className="mr-2"
            />
            <span className="capitalize">{coin}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CoinSelector;