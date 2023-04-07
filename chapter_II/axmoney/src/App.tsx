import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { ModalTransactionCreate } from "./components/Modal";
import { TransactionsProvider } from "./hooks/useTransactions";
import { GlobalStyle } from "./styles/global";

export function App() {
  const [ isNewTransactionModalOpen, setIsNewTransactionModalOpen ] = useState(false);

  function handleOpenNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(true);
  };

  function handleCloseNewTransactionModalOpen() {
    setIsNewTransactionModalOpen(false);
  };

  return (
    <TransactionsProvider>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModalOpen} />
      <Dashboard />
      <ModalTransactionCreate 
        onCloseNewTransactionModal={handleCloseNewTransactionModalOpen}
        onIsNewTransactionModalOpen={isNewTransactionModalOpen}
      />
    </TransactionsProvider>
  );
}
