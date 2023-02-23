import { toast } from 'react-toastify';
import { Error } from './libs/sdk/models';

export const showErrorToast = (error: Error | Error[]) => {
  if (Array.isArray(error)) {
    const detail = error.map((errorItem: Error) => errorItem.detail || errorItem.title).join(' | ');
    toast.error(detail);
  } else {
    toast.error(error.detail || error.title);
  }
};

export const getUserId = () => {
  const value = localStorage.getItem('user_id');
  if (value) {
    return parseInt(value);
  }
  return null;
};

export const getApiKey = () => {
  const value = localStorage.getItem('key');
  if (value) {
    return value;
  }
  return null;
};
