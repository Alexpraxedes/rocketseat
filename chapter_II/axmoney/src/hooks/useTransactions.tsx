import { createContext, useEffect, useState, useContext } from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsProviderProps {
    children: React.ReactNode;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) { 
    const [ transactions, setTransactions ] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions));
    }, []);

    async function createTransaction(transaction: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transaction,
            createdAt: new Date(),
        });
        const { transaction: transactionCreated } = response.data;

        setTransactions([
            ...transactions,
            transactionCreated
        ]);
    }

    return (
        <TransactionsContext.Provider 
            value={{ transactions, createTransaction }}
        >
            { children }
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}