// src/pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import api from '../services/api';

export default function Register() {
  const [nome, setNome] = useState('');
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro('');
    try {
      await api.post('/usuarios', { nome, nick, email, senha });
      router.push('/');
    } catch {
      setErro('Falha ao cadastrar. Verifique os dados.');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
        <input placeholder="Nick" value={nick} onChange={e => setNick(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <p>
        Já tem conta?{' '}
        <Link href="/">
          Faça login
        </Link>
      </p>
    </div>
  );
}
