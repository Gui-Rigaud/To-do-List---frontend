import React, { useState } from 'react';

import { Header } from '../components/UI/Header';

import style from './style.module.scss'

function TaskForm() {
    const [formData, setFormData] = useState({
        nome: '',
        description: '',
        done: false,
        finish_date: '',
        priority: 'Baixa',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Dados do formulário:', formData);
    };

    return (
        <>
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
                        <label htmlFor="finish_date">Data de término</label>
                        <input
                            type="date"
                            id="finish_date"
                            name="finish_date"
                            value={formData.finish_date}
                            onChange={handleChange}
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

                    <button type="submit" className={style.submit_button}>
                        Cadastrar Tarefa
                    </button>
                </form>


            </div>
        </>
    );
}

export default TaskForm;