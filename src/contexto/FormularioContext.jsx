import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';




export const FormularioContext = createContext();

export const FormularioProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [videoSelecionado, setVideoSelecionado] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const abrirVideoNoBanner = (video) => {
    setVideoSelecionado(video);
  };


  useEffect (() => {
    fetch('https://my-json-server.typicode.com/MaiteFinzi/aluraflix-api/videos')
    .then (resposta => resposta.json())

    .then (dados => {
      setVideos(dados)
    })
  }, [])


  const adicionarVideo = (novoVideo) => {
    const videosExistentes = JSON.parse(localStorage.getItem('videos')) || [];

    const videosAtualizados = [...videosExistentes, novoVideo];

    localStorage.setItem('videos', JSON.stringify(videosAtualizados));

    // Atualizar o estado
    setVideos(videosAtualizados);
};

  const aoVideoCadastrado = (novoVideo) => {
    const id = uuidv4()
    const videoComId = {...novoVideo, id}
    setVideos([...videos, novoVideo]);
    localStorage.setItem('videos', JSON.stringify([...videos, videoComId])); 
};

  const abrirModal = (video) => {
    setVideoSelecionado(video);
    setShowModal(true); 
  };

  const fecharModal = () => {
    setShowModal(false); 
  };

  return (
    <FormularioContext.Provider  value={{ 
        videos, 
        setVideos, 
        videoSelecionado, 
        setVideoSelecionado,
        showModal, 
        abrirModal,
        fecharModal,
        abrirVideoNoBanner, 
        aoVideoCadastrado,
        adicionarVideo 
        }} >
      {children}
    </FormularioContext.Provider>
  );
};







