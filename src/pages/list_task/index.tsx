import { useState } from "react"

import Head from "next/head"
import { Header } from "../components/UI/Header"

import styles from './style.module.scss'
import { FiRefreshCcw } from "react-icons/fi"

import Modal from 'react-modal'
import { ModalTask } from "../components/UI/ModalTask"

interface HomeProps {
    orders: TaskProps[];
}

export type TaskProps = {
    id: String,
    nome: String,
    description: String,
    done: boolean,
    finish_date: String,
    priority: String,
}

export default function ListTask({ orders }: HomeProps) {
    const [orderList, setOrderList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<TaskProps[] | any>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal(){
        setModalVisible(false);
    }

    // async function handleOpenModalView(id: String) {
        
    //     const apiClient = setupAPIClient();

    //     const response = await apiClient.get('/order/detail', {
    //         params:{
    //             order_id: id,
    //         }
    //     });

    //     setModalItem(response.data);
    //     setModalVisible(true);
    // }

    // async function handleFinishItem(id: String){
    //     const apiClient = setupAPIClient();
    //     await apiClient.put('/order/conclude', {
    //         order_id: id,
    //     });

    //     const response = await apiClient.get('order/list');

    //     setOrderList(response.data);
    //     setModalVisible(false);
    // }

    // async function handleRefreshOrders() {
    //     const apiClient = setupAPIClient();

    //     const response = await apiClient.get('/order/list')
    //     setOrderList(response.data);
    // }

    Modal.setAppElement('#__next');

    return (
        <>
            <Head>
                <title>Painel - Sujeito Pizzaria</title>
            </Head>

            <Header></Header>

            <div className={styles.page}>

                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Suas tarefas</h1>

                        <button>
                            <FiRefreshCcw size={25} color="#3fffa3" />
                        </button>
                    </div>

                    <article className={styles.listOrders}>

                        {/* {orderList.length === 0 && (
                            <span className={styles.emptyList}>
                                Não há pedidos abertos...
                            </span>
                        )} */}

                        {/* {orderList.map((item, index) => {
                            return (
                                <section key={String(item.id)} className={styles.orderItem}>
                                    <button onClick={() => { handleOpenModalView(item.id) }}>
                                        <div className={styles.tag}></div>
                                        <span>Mesa {item.table}</span>
                                    </button>
                                </section>
                            )
                        })} */}
                            <section key={"1"} className={styles.orderItem}>
                                        <button className="task-button">
                                            <div className={styles.tag}></div>
                                            <span>Tarefa 1</span>
                                        </button>
                            </section>
                    </article>
                </main>

                {modalVisible && (
                    <ModalTask
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModal}
                    task={modalItem}
                    />
                )}
            </div>
        </>
    )
}

// export const getServerSideProps = canSSRAuth(async (ctx) => {

//     const apiClient = setupAPIClient(ctx);

//     const response = await apiClient.get('/order/list');

//     return {
//         props: {
//             orders: response.data
//         }
//     }
// })