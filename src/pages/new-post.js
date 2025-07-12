// src/pages/new-post.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';

export default function NewPost() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    try {
      await api.post('/publicacoes', { titulo, conteudo });
      router.push('/feed');
    } catch {
      setErro('Erro ao publicar.');
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '100px auto' }}>
      <h1>Nova Publicação</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Título" value={titulo} onChange={e => setTitulo(e.target.value)} required />
        <textarea placeholder="Conteúdo" value={conteudo} onChange={e => setConteudo(e.target.value)} required />
        <button type="submit">Publicar</button>
      </form>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
}
