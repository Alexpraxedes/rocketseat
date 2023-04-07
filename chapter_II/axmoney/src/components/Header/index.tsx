import { Container, Content } from './styles';
import logoImg from '../../assets/logo.svg';

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header( { onOpenNewTransactionModal }: HeaderProps ) {
    return (
        <Container>
            <Content>
                <div>
                    <img src={logoImg} alt="AX money" />
                    <h1>AX money</h1>
                </div>
                <button 
                    type="button"
                    onClick={onOpenNewTransactionModal}
                >
                    Nova transação
                </button>
            </Content>
        </Container>
    );
}