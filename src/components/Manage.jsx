import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const Manage = () => {
  const [monitorias, setMonitorias] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [formData, setFormData] = useState({
    materiaREQ: '',
    monitorREQ: '',
    professorREQ: '',
    localREQ: '',
    diaREQ: '',
    horarioREQ: '',
    descricaoREQ: ''
  });

  useEffect(() => {
    fetch('/manage/True')
      .then(response => response.json())
      .then(data => {
        setMonitorias(data.Monitorias);
        setMaterias(data.Materia);
      })
      .catch(error => console.error('Erro ao buscar monitorias:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        setMonitorias([...monitorias, data]);
        setFormData({
          materiaREQ: '',
          monitorREQ: '',
          professorREQ: '',
          localREQ: '',
          diaREQ: '',
          horarioREQ: '',
          descricaoREQ: ''
        });
      })
      .catch(error => console.error('Erro ao adicionar monitoria:', error));
  };

  return (
    <div className="manage-section">
      <button id="toggleFormButton" onClick={() => document.getElementById('newSubjectForm').classList.toggle('hidden')}>Adicionar Monitoria</button>
      <div id="newSubjectForm" className="hidden">
        <button className="close-button" onClick={() => document.getElementById('newSubjectForm').classList.toggle('hidden')}>×</button>
        <h2>Adicionar Monitoria</h2>
        <form onSubmit={handleSubmit}>
          <select name="materiaREQ" className="input" value={formData.materiaREQ} onChange={handleChange} required>
            <option value="" disabled>Selecione a disciplina</option>
            {materias.map(materia => (
              <option key={materia.id} value={materia.id}>{materia.nome}</option>
            ))}
          </select>
          <div className="pequeno">
            <a href="/adicionar">Não encontrou sua disciplina?</a>
          </div>
          <input type="text" name="monitorREQ" className="input" placeholder="Monitor" value={formData.monitorREQ} onChange={handleChange} required />
          <input type="text" name="professorREQ" className="input" placeholder="Professor" value={formData.professorREQ} onChange={handleChange} required />
          <input type="text" name="localREQ" className="input" placeholder="Local ou Link" value={formData.localREQ} onChange={handleChange} required />
          <select name="diaREQ" className="input" value={formData.diaREQ} onChange={handleChange} required>
            <option value="" disabled>Selecione o dia</option>
            <option value="Segunda">Segunda-Feira</option>
            <option value="Terça-Feira">Terça-Feira</option>
            <option value="Quarta-Feira">Quarta-Feira</option>
            <option value="Quinta-Feira">Quinta-Feira</option>
            <option value="Sexta-Feira">Sexta-Feira</option>
          </select>
          <input type="time" name="horarioREQ" className="input" value={formData.horarioREQ} onChange={handleChange} required />
          <textarea name="descricaoREQ" className="input desc" placeholder="Descrição" value={formData.descricaoREQ} onChange={handleChange} required></textarea>
          <button type="submit" className="adicionar">Adicionar</button>
        </form>
      </div>
      <div id="ListaDeMonitorias" className="listadisciplinas">
        <h1>Monitorias</h1>
        {monitorias.map(monitoria => (
          <div key={monitoria.id} className="monitoria_mae">
            <div className="monitoria">
              <img src={monitoria.imagemUrl} className="imagemCirculo" alt="Imagem da monitoria" />
              <h3>{monitoria.Materia ? monitoria.Materia.nome : 'Matéria não encontrada'}</h3>
              <p><strong>Professor:</strong> {monitoria.Professor ? monitoria.Professor.nome : 'Professor não encontrado'}</p>
              <p><strong>Monitor:</strong> {monitoria.Monitor ? monitoria.Monitor.nome : 'Monitor não encontrado'}</p>
              <p><strong>Dia/Horário:</strong> {monitoria.dia} às {monitoria.horario}</p>
              <p><strong>Local/Link:</strong> {monitoria.local}</p>
              <p><strong>Inscrições:</strong> {monitoria.inscricoes}</p>
            </div>
            <div className="apagarM">
              <a href={`/deletar/${monitoria.id}`} className="apagar">Apagar</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manage;
