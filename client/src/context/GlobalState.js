import React, {createContext,useReducer} from 'react';
import AppReducer from './AppReducer'
import axios from 'axios'
// Initial State
const initialState = {
    transactions:[],
    error: null,
    loading: true
}

//Create context

export const GlobalContext = createContext(initialState);


//Provider Component

export const GlobalProvider = ({children}) => {
    const[state,dispatch] = useReducer(AppReducer, initialState);

    //Action
    async function getTransactions(){
        try {
            const res = await axios.get('http://localhost:5000/api/v1/transactions');
            dispatch({
                type: 'GET_TRANSACTION',
                payload: res.data.data
            })
        } catch (err) {
            console.log(err);
            dispatch({
                type: 'TRANSACTION_ERROR',
                error: err.response.data.error
            })
        }
    }
    async function deleteTransaction(id){
        try {
            const res = await axios.delete(`http://localhost:5000/api/v1/transactions/${id}`);
            
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch (err) {
            console.log(err);
            dispatch({
                type: 'TRANSACTION_ERROR',
                error: err.response.data.error
            })
        }
    }
    async function addTransaction(transaction){
        try {
            const res = await axios.post('http://localhost:5000/api/v1/transactions',transaction);
            
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })
        } catch (err) {
            console.log(err);
            dispatch({
                type: 'TRANSACTION_ERROR',
                error: err.response.data.error
            })
        }
    }
    return ( <GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction,
        getTransactions
        }}>
        {children}
    </GlobalContext.Provider>)
}