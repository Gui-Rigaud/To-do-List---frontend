import Head from "next/head"
import { Header } from "../components/UI/Header"

import styles from './style.module.scss'

import Link from "next/link"

export default function Home(){
    return(
        <> 
            <Header/>

            <Head>
                <title>Home</title>
            </Head>

            <div className={styles.container}>
                <main>
                    <div className={styles.containerHeader}>
                            <h1>Bem-vindo, Guilherme!</h1>
                            <p>Escolha uma das opções abaixo:</p>
                    </div>
                    <div className={styles.menu}>
                        <button className={styles.list_button}>
                            <Link href="/list_task">
                                Listagem de tarefas
                            </Link>
                        </button>
                        <button className={styles.cad_button}>
                            <Link href="/new_task">
                                Cadastrar tarefas
                            </Link></button>
                    </div>
                </main>


            </div>
        </>
    )
}