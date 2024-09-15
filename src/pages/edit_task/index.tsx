import React, { useState, useEffect, useContext } from 'react';
import { TaskProps } from '../list_task';

import style from './style.module.scss';
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';
import { Switch } from '@mui/material';

import { Header } from '../components/UI/Header';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { formToJSON } from 'axios';

interface EditProps {
    taskData: TaskProps;
}

function EditTask() {

    const router = useRouter();

    const taskData = router.query;

    const initialState: any = {
        id: "",
        nome: "",
        description: "",
        done: false,
        finish_date: "",
        priority: "",
    };

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        setFormData({
            id: taskData.id || '',
            nome: taskData.nome || '',
            done: taskData.done || false,
            description: taskData.description || '',
            finish_date: taskData.finish_date || '',
            priority: taskData.priority || 'Baixa',
        });
    }, [taskData]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleChangeDone() {
        formData.done = true;
    }

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

        console.log(formData)

        try {
            const response = await apiClient.put('/tarefa/edit', {
                nome: `${formData.nome}`,
                description: `${formData.description}`,
                priority: `${formData.priority}`
            }, {
                params:{
                    task_id: `${taskData.id}`
                }
            })

            if(formData.done == true){
                await apiClient.put('/tarefa/end', null, {
                    params:{
                        task_id: `${taskData.id}`
                    }
                })
            }

            console.log(response.data)

            toast.success("Tarefa editada com sucesso!", { theme: "dark" })

            router.push('/list_task')
        } catch (erro) {
            console.log(erro);
            toast.error("Erro ao editar", { theme: "dark" })
        }
    };

    return (
        <>
            <Header />
            <div className={style.form_container}>
                <h2>Editar Tarefa</h2>
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
                        <label htmlFor="finish_date">Finalizar</label>
                        <Switch
                            onChange={handleChangeDone}
                            sx={{
                                color: "#FF3F8F"
                            }}
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


                    <button type="submit" className={style.submit_button}>
                        Salvar Alterações
                    </button>
                </form>
            </div>
        </>
    );
}

export default EditTask;
