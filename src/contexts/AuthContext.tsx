import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';

import Router from "next/router";

import { toast } from 'react-toastify'

type AuthContextData = {
    user: MemberProps | undefined;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type MemberProps = {
    id: String;
    nome: String;
    email: String;
}

type SignInProps = {
    email: String;
    password: String;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignUpProps = {
    nome: String;
    email: String;
    password: String;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch {
        console.log('erro ao deslogar');
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<MemberProps>()
    const isAuthenticated = !!user;

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/me').then(response => {
                const { id, nome, email } = response.data;

                setUser({
                    id,
                    email,
                    nome
                })
            })
                .catch(() => {
                    signOut();
                })
        }


    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            })

            const { id, nome, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            });

            setUser({
                id,
                nome,
                email
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success('Logado com sucesso!', { theme: "dark" });

            Router.push('/home');
        } catch (err) {
            toast.error("Erro ao acessar!", { theme: "dark" });
            console.log("ERRO AO ACESSAR ", err);
        }
    }

    async function signUp({ nome, email, password }: SignUpProps) {
        try {
            const response = await api.post('/membro', {
                nome,
                email,
                password
            })

            toast.success("Conta criada com sucesso!", { theme: "dark" })

            Router.push('/');


        } catch (err) {
            toast.error("Erro ao cadastrar!", { theme: "dark" });
            console.log("erro ao cadastrar ", err)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}