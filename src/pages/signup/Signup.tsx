import { useState, FormEvent, ChangeEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from 'open-banking-pfm-sdk';
import { IUserForm } from 'open-banking-pfm-sdk/interfaces';
import { API_KEY_SIGNUP, URL_SERVER } from '../../constants';
import './signup.css';
import { showErrorToast } from '../../helpers';

interface FormData {
  name: string;
  firstLastName: string;
  secondLastName: string;
  email: string;
  companyName: string;
  username: string;
  password: string;
  countryShortName: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    firstLastName: '',
    secondLastName: '',
    email: '',
    companyName: '',
    username: '',
    password: '',
    countryShortName: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [key, setKey] = useState<string | null>(localStorage.getItem('key'));

  const handleSetKey = useCallback(
    (value: string | null) => {
      localStorage.setItem('key', value || '');
      setKey(value);
    },
    [setKey]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !formData.name ||
      !formData.firstLastName ||
      !formData.secondLastName ||
      !formData.email ||
      !formData.companyName ||
      !formData.username ||
      !formData.password ||
      !formData.countryShortName
    ) {
      setError('Por favor insira todos os campos.');
      return;
    }
    setLoading(true);
    const userForm: IUserForm = { ...formData, serverUrl: URL_SERVER, apiKey: API_KEY_SIGNUP };
    signUp(userForm)
      .then((response) => {
        handleSetKey(response.apiKey);
        setLoading(false);
        navigate('/pfm');
      })
      .catch((_error) => {
        showErrorToast(_error);
        setLoading(false);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setError('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  useEffect(() => {
    if (key) navigate('/pfm');
  }, [key, navigate]);

  return (
    <div className="container">
      <h1>Inscrição de Usuário</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form__group">
          <label htmlFor="name" className="form__label">
            Name:
            <input
              className="form__input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={loading}
            />
          </label>
        </div>
        <div className="form__group">
          <label htmlFor="firstLastName" className="form__label">
            First Last Name:
            <input
              className="form__input"
              type="text"
              name="firstLastName"
              value={formData.firstLastName}
              onChange={handleInputChange}
              disabled={loading}
            />
          </label>
        </div>
        <div className="form__group">
          <label htmlFor="secondLastName" className="form__label">
            Second Last Name:
            <input
              className="form__input"
              type="text"
              name="secondLastName"
              value={formData.secondLastName}
              onChange={handleInputChange}
              disabled={loading}
            />
          </label>
        </div>
        <div className="form__group">
          <label htmlFor="email" className="form__label">
            Email:
            <input
              className="form__input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
            />
          </label>
        </div>
        <div className="form__group">
          <label htmlFor="companyName" className="form__label">
            Company Name:
            <input
              className="form__input"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              disabled={loading}
            />
          </label>
        </div>
        <div className="form__group">
          <label htmlFor="username" className="form__label">
            Username:
            <input
              className="form__input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled={loading}
            />
          </label>
        </div>
        <div className="form__group">
          <label htmlFor="password" className="form__label">
            Password:
            <input
              className="form__input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={loading}
            />
          </label>
        </div>
        <div className="form__group">
          <label htmlFor="countryShortName" className="form__label">
            Country Short Name:
            <input
              className="form__input"
              type="text"
              name="countryShortName"
              value={formData.countryShortName}
              onChange={handleInputChange}
              disabled={loading}
            />
          </label>
        </div>
        {error !== '' && <div className="form__error">{error}</div>}
        <button className="form__button" type="submit" disabled={loading}>
          {loading ? 'Enviando' : 'Inscreverse'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
