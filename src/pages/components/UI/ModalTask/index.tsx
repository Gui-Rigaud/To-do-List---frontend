// components/TaskModal.tsx
import React, { ChangeEvent } from 'react';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import styles from './style.module.scss'; // Adapte o caminho e o nome conforme necessário
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { setupAPIClient } from '@/services/api';

interface TaskProps {
    id: String;
    nome: String;
    description: String;
    done: boolean;
    priority: String;
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

    async function handleFinish() {
        const apiClient = setupAPIClient();

        const response = await apiClient.put('/tarefa/end', null, {
            params: {
                task_id: `${task?.id}`
            }
        })

        console.log(response.data)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <div className={styles.modal_header}>
                <button
                    type="button"
                    onClick={onRequestClose}
                    className="react-modal-close"
                    style={{ background: 'transparent', border: 0 }}
                >
                    <FiX size={45} color="#f34748" />
                </button>

                <Checkbox
                    onChange={handleFinish}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={
                        {
                            color: "#FF3F48",
                            '&.Mui-checked': {
                                color: "#ff5760",
                            }
                        }
                    }
                />
            </div>

            <div className={styles.container}>
                <span className={styles.table}><h2>{task?.nome}</h2></span>
                <section className={styles.containerItem}>
                    <span className={styles.description}>{task?.description}</span>
                    <span className={styles.priority}>Prioridade: <strong>{task?.priority}</strong></span>
                </section>
            </div>
        </Modal>
    );
};

export default TaskModal;