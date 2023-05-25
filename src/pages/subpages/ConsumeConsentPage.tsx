import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { BanksClient } from 'open-banking-pfm-sdk';
import { URL_SERVER } from '../../constants';
import { showErrorToast } from '../../helpers';

// Constants representing the consume status
const CONSUME_IN_PROCESS = 'IN_PROCESS';
const CONSUME_FAILED = 'FAILED';
const CONSUME_SUCCESSFUL = 'SUCCESSFUL';

const ConsumeConsentPage = () => {
  const location = useLocation();

  // State variables
  const [consumeStatus, setConsumeStatus] = useState(CONSUME_IN_PROCESS); // The consume status
  const message = useMemo(() => {
    // Determine the message based on the consume status
    switch (consumeStatus) {
      case CONSUME_SUCCESSFUL:
        return 'O processo foi bem sucedido.'; // Successful message
      case CONSUME_FAILED:
        return 'Um erro ocorreu.'; // Failed message
      default:
        return 'Em processamento...'; // Default message
    }
  }, [consumeStatus]);

  const messageClassname = useMemo(() => {
    // Determine the classname for the message based on the consume status
    switch (consumeStatus) {
      case CONSUME_SUCCESSFUL:
        return 'success-text'; // Classname for successful status
      case CONSUME_FAILED:
        return 'error-text'; // Classname for failed status
      default:
        return ''; // Empty classname for default status
    }
  }, [consumeStatus]);

  useEffect(() => {
    if (location.hash) {
      const params = location.hash.split('&');
      const authCode = params.find((el) => el.indexOf('code') !== -1)?.split('=')[1]; // Extract the auth code from the URL
      const token = params.find((el) => el.indexOf('id_token') !== -1)?.split('=')[1]; // Extract the token from the URL
      const state = params.find((el) => el.indexOf('state') !== -1)?.split('=')[1]; // Extract the state from the URL

      if (authCode && token && state) {
        const banksClient = new BanksClient();
        banksClient.serverUrl = URL_SERVER; // Set the server URL for the banks client

        // Authorize the client using the auth code, token, and state
        banksClient
          .authorize(authCode, token, state)
          .then(() => {
            setConsumeStatus(CONSUME_SUCCESSFUL); // Set the consume status to successful
            window.close(); // Close the window
          })
          .catch((error) => {
            showErrorToast(error); // Show an error toast message
            setConsumeStatus(CONSUME_FAILED); // Set the consume status to failed
          });
      } else {
        // Set the consume status to failed if any of the required parameters are missing
        setConsumeStatus(CONSUME_FAILED);
      }
    }
  }, [location]);

  return (
    <div className="container">
      <h1>Consumir consetimento</h1>
      <span className={messageClassname}>{message}</span>
    </div>
  );
};

export default ConsumeConsentPage;
