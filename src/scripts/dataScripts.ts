import axios from "axios";


export const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/transactions');
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to fetch transactions.');
    }
  };
  