import React, { useEffect, useState } from 'react';
import CryptoDashboard from './components/CryptoDashboard.jsx';
import AuthForm from './components/AuthForm.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <>
          <div className="flex justify-between items-center bg-gray-800 text-white px-6 py-4">
            <h1 className="text-lg">Welcome, {user.username}</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          <CryptoDashboard />
        </>
      ) : (
        <AuthForm onLogin={setUser} />
      )}
    </div>
  );
};

export default App;