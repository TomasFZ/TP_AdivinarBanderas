'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a adivinar países el juego</h1>
      <Link href="/jugar">
        <button>Jugar</button>
      </Link>
    </div>
  );
}