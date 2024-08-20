'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Jugar() {
  const [paises, setPaises] = useState([]);
  const [paisRandom, setPaisRandom] = useState([]);
  const [ronda, setRonda] = useState(1);
  const [respuesta, setRespuesta] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const savedUser = localStorage.getItem('user');
      if (!savedUser) {
        alert('Debes iniciar sesión para jugar.');
        router.push('/');
      }
    }
  }, [isMounted, router]);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then(response => response.json())
      .then(data => {
        setPaises(data.data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (paises.length > 0) {
      mostrarPais();
    }
  }, [paises]);

  useEffect(() => {
    if (paisRandom.name === respuesta) {
      setRonda(ronda + 1);
      setRespuesta("");
      mostrarPais();
    }
  }, [respuesta]);

  function mostrarPais() {
    const randomIndex = Math.floor(Math.random() * paises.length);
    setPaisRandom(paises[randomIndex]);
  }

  function handleInputRespuesta(e) {
    setRespuesta(e.target.value);
  }

  return (
    <div>
      <h2>¿Cuál es este país?</h2>
      {paisRandom.flag && (
        <>
          <img src={paisRandom.flag} alt="fotoPais" />
          <input
            type="text"
            id={`nombre-${paisRandom.name}`}
            value={respuesta}
            name="nombre"
            onChange={handleInputRespuesta}
          />
          <p>Ronda: {ronda}</p>
        </>
      )}
    </div>
  );
}
