import React, { useState } from 'react';

const AuthForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please fill in both fields');
      return;
    }
  
    const storedUser = JSON.parse(localStorage.getItem('user'));
  
    if (isRegister) {
      // Register flow
      const newUser = { username, password };
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('currentUser', JSON.stringify({ username })); // NEW
      onLogin({ username });
    } else {
      // Login flow
      if (
        storedUser &&
        storedUser.username === username &&
        storedUser.password === password
      ) {
        localStorage.setItem('currentUser', JSON.stringify({ username })); // NEW
        onLogin({ username });
        setError('');
      } else {
        setError('Invalid username or password');
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegister ? 'Register' : 'Login'}
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isRegister ? 'Register' : 'Login'}
        </button>

        <p className="text-sm mt-4 text-center">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;


// kommer inte ihåg så jag kan logga in igen. Användaren sparas inte?

// Välja vilken crypto som ska visas och spara det på användaren?