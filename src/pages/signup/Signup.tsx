import { useState, FormEvent, ChangeEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  // Import the necessary dependencies

  // Define the navigate function from react-router-dom
  const navigate = useNavigate();

  // Define the initial form data using useState hook
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

  // Define the error state and loading state
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Get the 'key' value from localStorage using useState hook
  const [key, setKey] = useState<string | null>(localStorage.getItem('key'));

  // Define the handleSetKey function using useCallback hook
  const handleSetKey = useCallback(
    (value: string | null) => {
      // Set the 'key' value in localStorage
      localStorage.setItem('key', value || '');
      // Update the 'key' state
      setKey(value);
    },
    [setKey]
  );

  // Define the handleSubmit function
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if any required field is empty
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

    // Set loading to true to indicate the form submission is in progress
    setLoading(true);

    // Perform a POST request to the server
    fetch(`${URL_SERVER}/onboarding/signup`, {
      method: 'POST',
      headers: { 'X-api-key': API_KEY_SIGNUP, 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json()) // Parse the response as JSON
      .then((response) => {
        // Update the 'key' state with the response apiKey
        handleSetKey(response.apiKey);
        // Set loading to false to indicate the form submission is complete
        setLoading(false);
        // Navigate to the '/pfm' route
        navigate('/pfm');
      })
      .catch((_error) => {
        // Handle errors by displaying a toast or notification
        showErrorToast(_error);
        // Set loading to false to indicate the form submission is complete
        setLoading(false);
      });
  };

  // Define the handleInputChange function
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setError('');
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // useEffect hook to navigate if 'key' exists
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
