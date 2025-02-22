import { useContext, FormEvent, useState } from 'react'

import Head from "next/head"
import styles from '../styles/home.module.scss';

import { Input } from "../pages/components/UI/Input";
import { Button } from "../pages/components/UI/Button";
import Link from "next/link";

import { GetServerSideProps } from 'next';

import { AuthContext } from "../contexts/AuthContext";
import { toast } from 'react-toastify';
import { canSSRGuest } from '../utils/canSSRGuest';


export default function Home() {

  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
      
    event.preventDefault();

    if(email === '' || password === ''){
      toast.error("Preencha todos os campos!", { theme: "dark" });
      return;
    }

    setLoading(true);
  
    let data = {
      email,
      password
    }
  
    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>To-do List - Faça seu login</title>
      </Head>

      <div className={styles.containerCenter}>

        <div className={styles.login}>
        <h1 style={{color: "#fff"}}>Login</h1>
          <form onSubmit={handleLogin}>
            <Input
              type='text'
              placeholder="Digite seu email"
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
            />

            <Input
              type='password'
              placeholder="Sua senha"
              value={password}
              onChange={ (e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>
          </form>

          <Link href="/signup" legacyBehavior>
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }
})