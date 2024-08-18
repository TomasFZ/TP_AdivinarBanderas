'use client';

import { useEffect, useState } from 'react';

export default function Jugar() {
  const [paises, setPaises] = useState([]);
  const [paisRandom, setPaisRandom] = useState([])
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
  var ronda = 0 

  function mostrarPais(){
    const randomIndex = Math.floor(Math.random() * paises.length);
    setPaisRandom(paises[randomIndex])
  }

  return (
    <div>
      <h2>¿Cuál es este país?</h2>
        
          <img src={paisRandom.flag} alt="fotoPais" />
          <input type="text" id={`nombre-${paisRandom.name}`} name="nombre" />
        
      
    </div>
  );
}