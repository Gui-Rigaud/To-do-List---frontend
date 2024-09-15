import React, { useContext, useState } from 'react';

import { Header } from '../components/UI/Header';

import style from './style.module.scss'
import { toast } from 'react-toastify';
import Head from 'next/head';

import { setupAPIClient } from '@/services/api';
import { AuthContext } from '@/contexts/AuthContext';

function TaskForm() {
    const initialState: any = {
        nome: '',
        description: '',
        priority: 'Baixa',
    }

    const [formData, setFormData] = useState(initialState);

    const { user } = useContext(AuthContext);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handleSubmit(e: any) {
        e.preventDefault();

        const apiClient = setupAPIClient();

        if (formData.nome.length < 5) {
            toast.error("Nome é muito pequeno!", { theme: "dark" })
            return
        }

        if (formData.description.length > 140) {
            toast.error("Descrição é muito grande!", { theme: "dark" })
            return
        }

        try {
            await apiClient.post('/tarefa', {
                nome: `${formData.nome}`,
                description: `${formData.description}`,
                priority: `${formData.priority}`,
                member_id: `${user?.id}`
            })

            toast.success("Tarefa cadastrada com sucesso!", { theme: "dark" })

            setFormData(initialState)
        } catch (erro) {
            console.log(erro);
            toast.error("Erro ao cadastrar", { theme: "dark" })
        }
    };

    return (
        <>
            <Head><title>Cadastro de Tarefa</title></Head>

            <Header />

            <div className={style.form_container}>
                <h2>Cadastrar Nova Tarefa</h2>
                <form onSubmit={handleSubmit}>
                    <div className={style.form_group}>
                        <label htmlFor="nome">Tarefa</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Digite a tarefa"
                            required
                        />
                    </div>

                    <div className={style.form_group}>
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Digite a descrição da tarefa"
                            required
                        />
                    </div>

                    <div className={style.form_group}>
                        <label htmlFor="priority">Prioridade</label>
                        <select
                            id="priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            required
                        >
                            <option value="Baixa">Baixa</option>
                            <option value="Média">Média</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>

                    <button type="submit" className={style.submit_button} onClick={handleSubmit}>
                        Cadastrar Tarefa
                    </button>
                </form>


            </div>
        </>
    );
}

export default TaskForm;