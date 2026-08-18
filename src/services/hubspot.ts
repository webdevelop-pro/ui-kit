const HUBSPOTFORM = import.meta.env.VITE_HUBSPOTFORM as string;
const HUBSPOTPORTAL_ID = import.meta.env.VITE_HUBSPOTPORTAL_ID as string;

export const fetchHubspotForm = (hubspotFormId: string, data: object) => {
  const path = `${HUBSPOTFORM}/${HUBSPOTPORTAL_ID}/${hubspotFormId}`;
  const body = JSON.stringify(data);

  const req = {
    body,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', accept: 'application/json' },
  };

  return fetch(path, req).then((response) => {
    if (!response.ok) return Promise.reject(response);
    return response.json() as Promise<unknown>;
  });
};
