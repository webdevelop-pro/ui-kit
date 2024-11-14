
import { notify } from '@kyvg/vue3-notification';

const statusCodes = [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];
const NOTIFY_OPTIONS = {
  text: 'Something went wrong',
  data: {
    description: 'Please try again',
    status: 3,
  },
  type: 'error',
  group: 'transaction',
  duration: 10000,
};

// eslint-disable @typescript-eslint/no-unsafe-assignment

export const generalErrorHandling = async (error: Response) => {
  const statusCode = error.status;
  // const { person } = useCore();

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const errorJson = await error.json();
    if (errorJson) {
      // eslint-disable-next-line
      NOTIFY_OPTIONS.text = errorJson;
    }
  } catch (errorTry) {
    if (statusCodes.includes(statusCode)) {
      // person.value.isServerError = true;
    }
  }
  notify(NOTIFY_OPTIONS);
};
