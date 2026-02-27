import { useToast } from 'UiKit/components/Base/VToast/use-toast';
import { useGlobalAlert } from 'UiKit/store/useGlobalAlert';

const statusCodes = [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];

const { toast } = useToast();

const TOAST_OPTIONS: {
  title: string;
  description: string;
  variant: 'error' | 'success' | 'info';
} = {
  title: 'Something went wrong',
  description: 'Please try again',
  variant: 'error',
};

// eslint-disable @typescript-eslint/no-unsafe-assignment

export const generalErrorHandling = async (error: Response) => {
  const statusCode = error.status;
  const globalAlert = useGlobalAlert();

  // For server-side errors, show a global alert under the header
  // instead of a toast, so the user gets a persistent banner.
  if (statusCodes.includes(statusCode)) {
    let details = '';
    try {
      const errorJson = await error.clone().json() as any;
      const serverMessage =
        (errorJson && (errorJson.message || errorJson.__error__ || errorJson.error?.message))
        || '';
      if (serverMessage && typeof serverMessage === 'string') {
        const trimmed = serverMessage.length > 180 ? `${serverMessage.slice(0, 177)}…` : serverMessage;
        details = ` Details: ${trimmed}`;
      }
    } catch {
      // ignore JSON parsing issues for 5xx banner
    }

    globalAlert.show({
      variant: 'error',
      title: 'We’re experiencing technical issues',
      message: `A server error occurred (status ${statusCode}). Our services may be temporarily unavailable. Please try again in a few minutes.${details}`,
    });
    return;
  }

  try {
    const errorJson = await error.json();
    if (errorJson.error.id === 'session_refresh_required') return;

    if (errorJson.message) TOAST_OPTIONS.description = errorJson.message;
    else if (errorJson.__error__[0]) TOAST_OPTIONS.description = errorJson.__error__[0];
    else if (errorJson.__error__) TOAST_OPTIONS.description = errorJson.__error__;
    else if (errorJson) TOAST_OPTIONS.description = errorJson;
  } catch (errorTry) {
    // ignore JSON parsing issues for non-5xx responses
  }
  toast(TOAST_OPTIONS);
};
