import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

const Home = () => {
  const [monitorias, setMonitorias] = useState([]);
  const [primeiro, setPrimeiro] = useState(null);

  useEffect(() => {
    fetch('/home')
      .then(response => response.json())
      .then(data => {
        setMonitorias(data.Existente);
        setPrimeiro(data.primeiro);
      })
      .catch(error => console.error('Erro ao buscar monitorias:', error));
  }, []);

  return (
    <div className="slider">
      <div className="list">
        {primeiro && (
          <div className="item active">
            <img src={primeiro.imagemUrl} alt={primeiro.nome} />
            <div className="content">
              <p>Encontre a sua monitoria</p>
              <a href={`home/${primeiro.nome}`}>
                <h2>{primeiro.nome}</h2>
              </a>
            </div>
          </div>
        )}
        {monitorias.map((monitoria, index) => (
          <div key={index} className="item">
            <img src={monitoria.imagemUrl} alt={monitoria.nome} />
            <div className="content">
              <p>Encontre a sua monitoria</p>
              <a href={`home/${monitoria.nome}`}>
                <h2>{monitoria.nome}</h2>
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button id="prev">&lt;</button>
        <button id="next">&gt;</button>
      </div>
      <div className="thumbnail">
        {primeiro && (
          <div className="item active">
            <img src={primeiro.imagemUrl} alt={primeiro.nome} />
            <div className="content">{primeiro.nome}</div>
          </div>
        )}
        {monitorias.map((monitoria, index) => (
          <div key={index} className="item">
            <img src={monitoria.imagemUrl} alt={monitoria.nome} />
            <div className="content">{monitoria.nome}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
