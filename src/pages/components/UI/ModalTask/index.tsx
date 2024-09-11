import styles from './style.module.scss'
import Modal from 'react-modal'

import { FiX } from 'react-icons/fi'
import { TaskProps } from '../../../list_task';
import { useState } from 'react';

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    task: TaskProps[];
}

export function ModalTask({ isOpen, onRequestClose, task}: ModalOrderProps) {

    const [isGreen, setIsGreen] = useState(true);

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1d2e'
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                style={{ background: 'transparent', border: 0 }}
            >
                <FiX size={45} color="#f34748" />
            </button>

            <div className={styles.container}>

                <h2>Detalhes do pedido</h2>
                <span className={styles.table}>
                    Tarefa <strong>1</strong>
                </span>

                {task.map(item => (
                    <section key={"1"} className={styles.containerItem}>
                        <span>Lavar a louça</span>
                        <span className={styles.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</span>
                        {/* Se isGreen for true, o botão será verde, senão, vermelho */}
                        <button
                            style={{
                                backgroundColor: isGreen ? 'green' : 'red',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={() => setIsGreen(!isGreen)} // Alterna a variável entre true e false ao clicar
                        >
                            {isGreen ? 'Botão Verde' : 'Botão Vermelho'}
                        </button>
                    </section>
                ))}

                <button className={styles.buttonOrder} >
                    Concluir tarefa
                </button>

            </div>
        </Modal>
    )
}