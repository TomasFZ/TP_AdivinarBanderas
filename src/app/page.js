'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = () => {
    const username = prompt('Por favor, ingresa tu nombre de usuario:');
    if (username) {
      localStorage.setItem('user', JSON.stringify({ username }));
      setUser({ username });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div>
      <h1>Bienvenido a adivinar países el juego</h1>
      {user ? (
        <div>
          <p>Hola, {user.username}</p>
          <Link href="/jugar">
            <button>Jugar</button>
          </Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
      )}
    </div>
  );
}
