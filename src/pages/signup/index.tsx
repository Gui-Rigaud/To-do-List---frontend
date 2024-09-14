import { useState, FormEvent, useContext } from "react";
import Head from "next/head";
import styles from '../../styles/home.module.scss';

import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from 'react-toastify';
import Link from "next/link";

export default function Signup() {
    const { signUp } = useContext(AuthContext);

    const [nome, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    async function handleSignup(event: FormEvent){
        event.preventDefault();

        if(nome === '' || email === '' || password === ''){
            toast.error("Preencha todos os campos!", { theme: "dark" });
            return;
        }

        setLoading(true);

        let data = {
            nome,
            email, 
            password
        }

        await signUp(data);

        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>Faça seu cadastro</title>
            </Head>

            <div className={styles.containerCenter}>

                <div className={styles.login}>
                    <h1 style={{color: "#f0f0f0"}}>Criando sua conta</h1>

                    <form onSubmit={handleSignup}>
                        <Input
                            type='text'
                            placeholder="Digite seu nome"
                            value={nome}
                            onChange={ (e) => setName(e.target.value) }
                        />

                        <Input
                            type='text'
                            placeholder="Digite seu email"
                            value={email}
                            onChange={ (e) => setEmail(e.target.value) }
                        />

                        <Input
                            type='password'
                            placeholder="Sua senha"
                            value={password}
                            onChange={ (e) => setPassword(e.target.value) }
                        />

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Cadastrar
                        </Button>
                    </form>

                    <Link href="/" legacyBehavior>
                        <a className={styles.text}>Já possui uma conta? Faça Login</a>
                    </Link>

                </div>
            </div>
        </>
    )
}