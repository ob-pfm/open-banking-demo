import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { BanksClient } from '../../libs/sdk';
import { URL_SERVER } from '../../constants';
import { getApiKey, showErrorToast } from '../../helpers';

const CONSUME_IN_PROCESS = 'IN_PROCESS';
const CONSUME_FAILED = 'FAILED';
const CONSUME_SUCCESSFUL = 'SUCCESSFUL';

const ConsumeConsentPage = () => {
  const location = useLocation();
  const apiKey = getApiKey();

  const [consumeStatus, setConsumeStatus] = useState(CONSUME_IN_PROCESS);
  const message = useMemo(() => {
    switch (consumeStatus) {
      case CONSUME_SUCCESSFUL:
        return 'O processo foi bem sucedido.';
      case CONSUME_FAILED:
        return 'Um erro ocorreu.';
      default:
        return 'Em processamento...';
    }
  }, [consumeStatus]);

  const messageClassname = useMemo(() => {
    switch (consumeStatus) {
      case CONSUME_SUCCESSFUL:
        return 'success-text';
      case CONSUME_FAILED:
        return 'error-text';
      default:
        return '';
    }
  }, [consumeStatus]);

  useEffect(() => {
    if (location.hash) {
      const params = location.hash.split('&');
      const authCode = params.find((el) => el.indexOf('code') !== -1)?.split('=')[1];
      const token = params.find((el) => el.indexOf('id_token') !== -1)?.split('=')[1];
      const state = params.find((el) => el.indexOf('state') !== -1)?.split('=')[1];

      if (authCode && token && state && apiKey) {
        const banksClient = new BanksClient(apiKey, URL_SERVER);
        banksClient
          .consumeConsent(authCode, token, state)
          .then(() => {
            setConsumeStatus(CONSUME_SUCCESSFUL);
            window.close();
          })
          .catch((error) => {
            showErrorToast(error);
            setConsumeStatus(CONSUME_FAILED);
          });
      } else {
        setConsumeStatus(CONSUME_FAILED);
      }
    }
  }, [location, apiKey]);

  return (
    <div className="container">
      <h1>Consumir consentimento</h1>
      <span className={messageClassname}>{message}</span>
    </div>
  );
};

export default ConsumeConsentPage;
