import React from 'react';
import 'tailwindcss/tailwind.css';

const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Sobre os criadores e apoiadores do TutorTime</h1>
      
      <div className="profile flex flex-wrap mb-8">
        <img src="/IMG_5405.jpeg" alt="Foto de Luis Abrantes" className="profile-pic w-40 h-40 rounded-full mr-4" />
        <div className="description">
          <h2 className="text-2xl font-semibold">Luis Abrantes</h2>
          <p>Luis é um programador dedicado e o idealizador deste projeto, trazendo sua paixão por tecnologia e sua habilidade técnica para liderar o desenvolvimento de soluções inovadoras. Com vasta experiência em diversas linguagens e ferramentas, ele está sempre em busca de novas maneiras de otimizar processos e garantir a qualidade do código. Como líder da equipe de desenvolvimento, Luis equilibra seu foco em resultados com a valorização do trabalho colaborativo, garantindo que cada projeto atinja seu potencial máximo.</p>
        </div>
      </div>
      
      <div className="profile flex flex-wrap mb-8">
        <img src="https://ugc.production.linktr.ee/da1e9db5-3b93-4925-ae2c-7b4f1f78990b_de25c5a4-5028-4723-8edf-7024210fb556.jpeg?io=true&size=avatar-v3_0" alt="Foto de Cauã Almeida" className="profile-pic w-40 h-40 rounded-full mr-4" />
        <div className="description">
          <h2 className="text-2xl font-semibold">Diretora Geral Giorgia Suzumura</h2>
          <p>Georgia é uma líder excepcional, com uma abordagem inovadora para a gestão de projetos. Sua habilidade em coordenar equipes e alinhar objetivos estratégicos garante que a empresa esteja sempre à frente. Com vasta experiência no setor, Georgia traz uma visão focada em resultados, sem perder o foco no desenvolvimento humano de sua equipe.</p>
        </div>
      </div>

      <div className="profile flex flex-wrap mb-8">
        <img src="https://avatars.githubusercontent.com/u/102776070?v=4" alt="Foto de Luis Abrantes" className="profile-pic w-40 h-40 rounded-full mr-4" />
        <div className="description">
          <h2 className="text-2xl font-semibold">Cauã Almeida</h2>
          <p>Cauã é um desenvolvedor talentoso, sempre buscando novas tecnologias para implementar em projetos de alto impacto. Sua dedicação e habilidades técnicas têm contribuído significativamente para o sucesso dos projetos de desenvolvimento.</p>
        </div>
      </div>

      <div className="profile flex flex-wrap mb-8">
        <img src="https://0.academia-photos.com/199014089/60801351/49068439/s200_rubens.lopes.jpeg" alt="Foto de Cauã Almeida" className="profile-pic w-40 h-40 rounded-full mr-4" />
        <div className="description">
          <h2 className="text-2xl font-semibold">Diretor Pedagógico Rubens Fernando Lópes</h2>
          <p>Rubens possui uma sólida experiência na área educacional, sendo um especialista em desenvolvimento de currículos e metodologias de ensino. Sua habilidade em criar programas de treinamento que realmente capacitam os profissionais é fundamental para o sucesso da equipe. Como Diretor Pedagógico, ele está focado em garantir que os processos de aprendizagem estejam sempre em constante evolução.</p>
        </div>
      </div>

      <div className="profile flex flex-wrap mb-8">
        <img src="https://avatars.githubusercontent.com/u/149614643?v=4" alt="Foto de Luis Abrantes" className="profile-pic w-40 h-40 rounded-full mr-4" />
        <div className="description">
          <h2 className="text-2xl font-semibold">Isaque Estolano</h2>
          <p>Isaque é um programador comprometido com a qualidade e o desempenho das soluções que cria. Com uma abordagem colaborativa, ele sempre busca aprender e compartilhar conhecimento com os colegas, contribuindo para o crescimento da equipe como um todo.</p>
        </div>
      </div>

      <div className="profile flex flex-wrap mb-8">
        <img src="images/colega_foto.jpg" alt="Foto de Cauã Almeida" className="profile-pic w-40 h-40 rounded-full mr-4" />
        <div className="description">
          <h2 className="text-2xl font-semibold">Diretor Administrativo Arivandro</h2>
          <p>Com uma mente analítica e foco em otimização de processos, Arivandro é responsável por gerenciar os recursos internos da empresa de forma eficiente. Sua abordagem prática e orientada a resultados tem sido fundamental para a administração dos projetos e o crescimento sustentável da empresa.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
