// components/TaskModal.tsx
import React from 'react';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import styles from './style.module.scss'; // Adapte o caminho e o nome conforme necessário

interface TaskProps {
    id: String;
    nome: String;
    description: String;
    done: boolean;
}

interface TaskModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    task: TaskProps | null | undefined;
}

export function TaskModal({ isOpen, onRequestClose, task }: TaskModalProps) {

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
                <span className={styles.table}><h2>{task?.nome}</h2></span>
                <section className={styles.containerItem}>
                    <span className={styles.description}>{task?.description}</span>
                    <p>Status: {task?.done ? 'Concluída' : 'Pendente'}</p>
                </section>
            </div>
        </Modal>
    );
};

export default TaskModal;