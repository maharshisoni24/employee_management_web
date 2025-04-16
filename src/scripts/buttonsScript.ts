import axios from 'axios';

export const handleNewIssuance = async (formData: any, setRefreshKey: React.Dispatch<React.SetStateAction<number>>) => {
  try {
    const response = await axios.post('http://localhost:3000/api/transactions', {
      stock_id: formData.stock_id,
      employee_id: formData.employee_id,
      type: 'ISSUE',
      quantity: formData.quantity,
    });
    alert('New issuance recorded successfully!');
    setRefreshKey((prevKey) => prevKey + 1); // Trigger table refresh
  } catch (error: any) {
    console.error('Error recording issuance:', error);
    alert('Failed to record new issuance. Please try again.');
  }
};

export const handleRecordReturn = async (formData: any, setRefreshKey: React.Dispatch<React.SetStateAction<number>>) => {
  try {
    const response = await axios.post('http://localhost:3000/api/transactions', {
      stock_id: formData.stock_id,
      employee_id: formData.employee_id,
      type: 'RETURN',
      quantity: formData.quantity,
    });
    alert('Return recorded successfully!');
    setRefreshKey((prevKey) => prevKey + 1); // Trigger table refresh
  } catch (error: any) {
    console.error('Error recording return:', error);
    alert('Failed to record return. Please try again.');
  }
};
