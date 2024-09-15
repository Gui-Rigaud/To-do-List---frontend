import { useContext, useState } from "react"

import Head from "next/head"
import { Header } from "../components/UI/Header"

import styles from './style.module.scss'
import { FiRefreshCcw, FiPlusCircle, FiTrash, FiEdit } from "react-icons/fi"

import Modal from 'react-modal'
import TaskModal from "../components/UI/ModalTask"
import { setupAPIClient } from "@/services/api"
import { AuthContext } from "@/contexts/AuthContext"
import Link from "next/link"

interface HomeProps {
    orders: TaskProps[];
}

export type TaskProps = {
    id: string,
    nome: string,
    description: string,
    done: boolean,
    finish_date: string,
    priority: string,
}

export default function ListTask({ orders: tasks }: HomeProps) {
    const [taskList, setTaskList] = useState(tasks || []);
    const { user } = useContext(AuthContext)

    const [modalItem, setModalItem] = useState<TaskProps | null>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal() {
        setModalVisible(false);
        handleRefreshTasks();
    }

    const openModal = (task: TaskProps) => {
        setModalItem(task);
        setModalVisible(true);
    };

    async function handleRefreshTasks() {
        const apiClient = setupAPIClient();

        const response = await apiClient.get('/membro/tarefa', {
            params: {
                member_id: user?.id
            }
        })

        setTaskList(response.data);
    }

    Modal.setAppElement('#__next');

    return (
        <>
            <Head>
                <title>Listagem de Tarefas</title>
            </Head>

            <Header></Header>

            <div className={styles.page}>

                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Suas tarefas</h1>

                        <button onClick={handleRefreshTasks}>
                            <FiRefreshCcw size={25} color="#3fffa3" />
                        </button>

                        <Link href="/new_task" className={styles.addTask}>
                            <FiPlusCircle size={32} color="#3fffa3" />
                        </Link>
                    </div>

                    <article className={styles.listTasks}>

                        {taskList.length === 0 && (
                            <span className={styles.emptyList}>
                                Não há nenhuma tarefa...
                            </span>
                        )}

                        {taskList.map((item, index) => {
                            return (
                                <section key={index} className={styles.taskItem}>
                                    <button onClick={() => openModal(item)} className="task-button">
                                        <div className={styles.tag}></div>
                                        <span>Tarefa {index + 1}</span>
                                    </button>

                                    <div>
                                        <Link href="/edit_task">
                                            <FiEdit size={25} color="#3fffa3" style={{ marginRight: "0rem" }} />
                                        </Link>

                                        <button className="del-button">
                                            <FiTrash size={25} color="#FF3F48" style={{ marginRight: "1rem" }} />
                                        </button>
                                    </div>
                                </section>
                            )
                        })}

                    </article>
                </main>

                {modalVisible && (
                    <TaskModal
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        task={modalItem}
                    />
                )}
            </div>
        </>
    )
}