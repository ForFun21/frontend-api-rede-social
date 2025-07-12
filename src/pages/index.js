// src/pages/index.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setErro('');
    try {
      const res = await api.post('/login', { email, senha });
      console.log('Resposta /login:', res.data);
      localStorage.setItem('token', res.data);  // armazena a string inteira
      router.push('/feed');
    } catch (err) {
      setErro('Email ou senha inválidos');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <p>
      Não tem conta? <Link href="/register">Cadastre-se</Link>
      </p>
    </div>
  );
}
