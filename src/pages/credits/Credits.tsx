import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { Bank, Credit, CreditBalance } from 'open-banking-pfm-sdk/models';
import { BanksClient, CreditsClient } from 'open-banking-pfm-sdk';
import '../../libs/wc/ob-credit-component';
import { URL_SERVER } from '../../constants';
import { IOutletContext } from '../../interfaces';
import { showErrorToast } from '../../helpers';

const CreditsComponent = () => {
  const navigate = useNavigate(); // Get navigate function from react-router-dom
  const componentRef = useRef<any>(null); // Create a ref for the component
  // Get context data using custom hook
  const { isProcessing, userId, alertText, apiKey } = useOutletContext<IOutletContext>();

  // Create instances of AccountsClient and BanksClient using memoized version
  const creditsServices = useMemo(() => new CreditsClient(apiKey, URL_SERVER), [apiKey]);
  const banksServices = useMemo(() => new BanksClient(apiKey, URL_SERVER), [apiKey]);

  // Load credits when component mounts or userId changes
  const loadCredits = useCallback(() => {
    if (userId) {
      // Show loading indicator in the component
      componentRef.current.showMainLoading = true;
      // Fetch credits and banks data in parallel
      const promises = [creditsServices.list(userId), banksServices.getAvailables()];
      Promise.all(promises)
        .then((response) => {
          // Extract data from response
          const creditsResponse = response[0] as { data: Credit[]; totalBalance: CreditBalance };
          const banks: Bank[] = response[1] as unknown as Bank[]; // Extract banks data from response
          componentRef.current.banksData = banks; // Set banks data in the component
          if (creditsResponse.data.length > 0) {
            componentRef.current.creditData = creditsResponse.data; // Set credit data in the component
            componentRef.current.availableAmount = creditsResponse.totalBalance.availableAmount;
            componentRef.current.limitAmount = creditsResponse.totalBalance.limitAmount;
            componentRef.current.usedAmount = creditsResponse.totalBalance.usedAmount;
          } else componentRef.current.isEmpty = true;

          componentRef.current.showMainLoading = false;
        })
        .catch((error) => {
          componentRef.current.banksData = []; // Reset banks data in the component
          componentRef.current.banksAccountData = []; // Reset accounts data in the component
          componentRef.current.showMainLoading = false;
          showErrorToast(error); // Show error toast
        });
    }
  }, [componentRef, creditsServices, banksServices, userId]);

  const handleEmptyClick = useCallback(() => {
    navigate('/pfm/cuentas');
  }, [navigate]);

  useEffect(() => {
    loadCredits(); // Load accounts when component mounts or userId changes
  }, [loadCredits]);

  useEffect(() => {
    // Add event listeners for custom events to componentRef and remove them on cleanup
    const componentRefCurrent = componentRef.current;
    componentRefCurrent.addEventListener('empty-button-click', handleEmptyClick);

    return () => {
      // Cleanup by removing event listeners from componentRef
      componentRefCurrent.removeEventListener('empty-button-click', handleEmptyClick);
    };
  }, [handleEmptyClick]);

  /**
   * Renders an ob-accounts-component with props passed to it.
   *
   * @returns {ReactElement} - An ob-credit-component with configured props.
   */
  return (
    <ob-credit-component
      ref={componentRef} // A ref object that will be used to attach event listeners
      showAlert={isProcessing} // Boolean prop that determines whether to show an alert
      alertText={alertText} // String prop that sets the text for the alert
      alertType="warning" // String prop that sets the type of the alert
      fontFamily="Lato" // String prop that sets the font family for the component
      lang="pt" // String prop that sets the language for the component
      currencyLang="pt-BR" // String prop that sets the currency language for the component
      currencyType="BRL" // String prop that sets the currency type for the component
    />
  );
};

export default CreditsComponent;
