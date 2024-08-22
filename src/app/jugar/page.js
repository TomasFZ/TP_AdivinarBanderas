'use client';

import { useEffect, useState } from 'react';

export default function Jugar() {
  const [paises, setPaises] = useState([]);
  const [paisRandom, setPaisRandom] = useState([])
  const [ronda, setRonda] = useState(1);
  const [puntos, setPuntos] = useState(0);
  const [respuesta, setRespuesta] = useState("")
  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then(response => response.json())
      .then(data => {
        setPaises(data.data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (paises.length > 0 ) {
      mostrarPais();
    }
  }, [paises]);

 
  // useEffect(() => {
  //   if(paisRandom.name === respuesta)
  //     setRonda(ronda+1)
  // }, []);

  function mostrarPais(){
    const randomIndex = Math.floor(Math.random() * paises.length);
    setPaisRandom(paises[randomIndex])
  }

  function handleInputRespuesta(e){
    setRespuesta(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
      if(paisRandom.name === respuesta){
        setRonda(ronda+1)
        setRespuesta("")
        mostrarPais();
        setPuntos(puntos+10)
      }else{
        setPuntos(puntos-1)
      }
  }

  return (
    <div>
      <h2>¿Cuál es este país?</h2>
          <img src={paisRandom.flag} alt="fotoPais" />
          <form onSubmit={handleSubmit}>
            <input type="text" id={`nombre-${paisRandom.name}`} value={respuesta} name="nombre" onChange={handleInputRespuesta} />
            <button type="submit">Enviar</button>
          </form>
          <p>ronda: {ronda}</p>
          <p>Puntos: {puntos}</p>
    </div>
  );
}