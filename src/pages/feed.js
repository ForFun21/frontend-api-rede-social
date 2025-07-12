// src/pages/feed.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import api from '../services/api';

export default function Feed() {
  const [posts, setPosts] = useState([]); // array vazio
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    async function fetchPosts() {
      try {
        const res = await api.get('/publicacoes');
        setPosts(res.data || []);
      } catch (err) {
        if (err.response?.status === 401) {
          router.push('/');
        } else {
          console.error(err);
        }
      }
    }

    fetchPosts();
  }, [router]);
  return (
    <div className="container">
      <h1>Feed</h1>
      <Link className="new-post" href="/new-post">Nova Publicação</Link>

      {posts.length > 0 ? (
        posts.map(p => (
          <div key={p.id} className="post">
            <h2>{p.titulo}</h2>
            <p>{p.conteudo}</p>
            <small>Por {p.autorNick}</small>
            <div className="actions">
              <button onClick={() => api.post(`/publicacoes/${p.id}/curtir`)}>Curtir</button>
              <button onClick={() => api.post(`/publicacoes/${p.id}/descurtir`)}>Descurtir</button>
            </div>
          </div>
        ))
      ) : (
        <p>Sem publicações.</p>
      )}
    </div>
  );
}
