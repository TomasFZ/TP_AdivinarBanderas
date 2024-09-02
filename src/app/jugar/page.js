'use client';

import { useEffect, useState } from 'react';

export default function Jugar() {
  const [paises, setPaises] = useState([]);
  const [paisRandom, setPaisRandom] = useState([]);
  const [ronda, setRonda] = useState(1);
  const [puntos, setPuntos] = useState(0);
  const [respuesta, setRespuesta] = useState("");
  const [tiempoRestante, setTiempoRestante] = useState(15);

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
    if (tiempoRestante > 0) {
      const timerId = setTimeout(() => setTiempoRestante(tiempoRestante - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      // Si el tiempo se acaba, pasa a la siguiente ronda y resta puntos
      setPuntos(puntos - 5);
      setRonda(ronda + 1);
      setRespuesta("");
      mostrarPais();
      setTiempoRestante(15);
    }
  }, [tiempoRestante]);

  function mostrarPais() {
    const randomIndex = Math.floor(Math.random() * paises.length);
    setPaisRandom(paises[randomIndex]);
    setTiempoRestante(15); // Resetear el tiempo para cada nueva bandera
  }

  function handleInputRespuesta(e) {
    setRespuesta(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (paisRandom.name === respuesta) {
      setPuntos(puntos + 10);
    } else {
      setPuntos(puntos - 1);
    }
    setRonda(ronda + 1);
    setRespuesta("");
    mostrarPais();
  }

  return (
    <div>
      <h2>¿Cuál es este país?</h2>
      {paisRandom.flag && <img src={paisRandom.flag} alt="fotoPais" />}
      <form onSubmit={handleSubmit}>
        <input type="text" id={`nombre-${paisRandom.name}`} value={respuesta} name="nombre" onChange={handleInputRespuesta} />
        <button type="submit">Enviar</button>
      </form>
      <p>Tiempo restante: {tiempoRestante} segundos</p>
      <p>Ronda: {ronda}</p>
      <p>Puntos: {puntos}</p>
    </div>
  );
}
