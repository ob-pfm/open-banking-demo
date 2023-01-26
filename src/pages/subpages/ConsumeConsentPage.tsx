import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { BanksClient } from '../../libs/sdk';
import { API_KEY } from '../../constants';
import { showErrorToast } from '../../helpers';

const CONSUME_IN_PROCESS = 'IN_PROCESS';
const CONSUME_FAILED = 'FAILED';
const CONSUME_SUCCESSFUL = 'SUCCESSFUL';

const ConsumeConsentPage = () => {
  const [searchParams] = useSearchParams();
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
    const authCode = searchParams.get('code');
    const token = searchParams.get('id_token');
    const state = searchParams.get('state');
    if (authCode && token && state) {
      const banksClient = new BanksClient(
        API_KEY,
        'https://cors-anywhere.herokuapp.com/http://tecbantest@ec2-3-21-18-54.us-east-2.compute.amazonaws.com:8081/api/v1/'
      );
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
  }, [searchParams]);

  return (
    <div className="container">
      <h1>Consumir consentimento</h1>
      <span className={messageClassname}>{message}</span>
    </div>
  );
};

export default ConsumeConsentPage;
