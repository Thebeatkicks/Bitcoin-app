import React, { useEffect, useRef, useState } from 'react';
import AuthForm from './components/AuthForm.jsx';
import CoinSelector from './components/CoinSelector.jsx';
import CryptoDashboard from './components/CryptoDashboard.jsx';

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Load current user and their coin selection on first load
  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      const parsedUser = JSON.parse(stored);
      setUser(parsedUser);

      const coins = localStorage.getItem(`userCoins_${parsedUser.username}`);
      if (coins) {
        setSelectedCoins(JSON.parse(coins));
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setSelectedCoins([]);
  };

  return (
    <div>
      {user ? (
        <>
          <div className="flex justify-between items-center bg-gray-800 text-white px-6 py-4 relative">
            <h1 className="text-lg">Welcome, {user.username}</h1>

            <div className="flex items-center gap-4" ref={dropdownRef}>
              <button
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                Select Coins
              </button>

              {showDropdown && (
                <div className="absolute right-6 top-16 bg-white text-black shadow-md rounded p-4 z-10 w-64">
                  <CoinSelector
                    username={user.username}
                    onUpdate={(updated) => setSelectedCoins(updated)}
                  />
                </div>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          <CryptoDashboard selectedCoins={selectedCoins} />
        </>
      ) : (
        <AuthForm onLogin={setUser} />
      )}
    </div>
  );
};

export default App;
