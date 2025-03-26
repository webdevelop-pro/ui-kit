import { IErrorGeneric } from 'InvestCommon/types/api/auth';
import { urlAuthenticator, urlProfile } from 'InvestCommon/global/links';
import { navigateWithQueryParams } from 'UiKit/helpers/general';
import { useAuthStore } from 'InvestCommon/store/useAuth';
import { useAuthLogicStore } from 'InvestCommon/store/useAuthLogic';

export const oryErrorHandling = (error: IErrorGeneric, url: string) => {
  const authStore = useAuthStore();
  const authLogicStore = useAuthLogicStore();

  switch (error?.error?.id) {
    case 'session_already_available': // User is already signed in, let's redirect them home!
      navigateWithQueryParams(urlProfile);
      break;
    case 'session_aal2_required': // 2FA is enabled and enforced, but user did not perform 2fa yet!
    case 'session_refresh_required': // We need to re-authenticate to perform this action
      authLogicStore.refreshRedirect();
      break;
    case 'browser_location_change_required': // Ory Kratos asked us to point the user to this URL.
      if (error.redirect_browser_to.includes('aal2')) navigateWithQueryParams(urlAuthenticator);
      else window.location.href = error.redirect_browser_to;
      break;
    case 'self_service_flow_expired': // The flow expired, let's request a new one.
      authStore.fetchAuthHandler(url);
      break;
    case 'self_service_flow_return_to_forbidden': // the return is invalid, we need a new flow
    case 'security_csrf_violation': // A CSRF violation occurred. Best to just refresh the flow!
    case 'security_identity_mismatch': // The requested item was intended for someone else. Let's request a new flow...
    default:
  }
};
