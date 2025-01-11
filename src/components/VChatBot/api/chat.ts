
import { IChatBody } from '../types';
import { env } from '@/config/env';


export const fetchPostMessageChat = (bodyObject: IChatBody) => {
  const path = `${env.CHATBOT_URL}/v2/message`;

  const body = JSON.stringify(bodyObject);

  const data = {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    credentials: 'include' as RequestCredentials,
  };

  return fetch(path, data).then((response) => {
    if (!response.ok) return Promise.reject(response);
    return response;
  });
};

