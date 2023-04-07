import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/btnClose.svg';
import incomeImg from '../../assets/income.svg';
import { useTransactions } from '../../hooks/useTransactions';

Modal.setAppElement('#root');

interface ModalTransactionCreateProps {
    onIsNewTransactionModalOpen: boolean;
    onCloseNewTransactionModal: () => void;
}

export function ModalTransactionCreate( { onIsNewTransactionModalOpen, onCloseNewTransactionModal } : ModalTransactionCreateProps ) {
    const { createTransaction } = useTransactions();
    const [ type, setType ] = useState('deposit');
    const [ title, setTitle ] = useState('');
    const [ amount, setAmount ] = useState(0);
    const [ category, setCategory ] = useState('');
    
    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        });

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');

        onCloseNewTransactionModal();
    }

    return (
        <Modal
        isOpen={onIsNewTransactionModalOpen} 
        onRequestClose={onCloseNewTransactionModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
            <button
                type="button"
                onClick={onCloseNewTransactionModal}
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input 
                    placeholder="Título" 
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input 
                    type="number"
                    placeholder="Valor" 
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        isActive={type === 'deposit'}
                        activeColor="green"
                        onClick={() => { setType('deposit'); }}
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        isActive={type === 'withdraw'}
                        activeColor="red"
                        onClick={() => { setType('withdraw'); }}
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    placeholder="Categoria" 
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />
                
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}