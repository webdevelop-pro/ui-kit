import { useToast } from 'UiKit/components/Base/VToast/use-toast';

const statusCodes = [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];

const { toast } = useToast();

const TOAST_OPTIONS = {
  title: 'Something went wrong',
  description: 'Please try again',
  variant: 'error',
};

// eslint-disable @typescript-eslint/no-unsafe-assignment

export const generalErrorHandling = async (error: Response) => {
  const statusCode = error.status;
  // const { person } = useCore();

  try {
    const errorJson = await error.json();
    if (errorJson) {
      TOAST_OPTIONS.description = errorJson;
    }
  } catch (errorTry) {
    if (statusCodes.includes(statusCode)) {
      // person.value.isServerError = true;
    }
  }
  toast(TOAST_OPTIONS);
};
