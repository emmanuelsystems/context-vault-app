import axios from 'axios';

export async function listPlays(backendUrl: string) {
  const response = await axios.get(`${backendUrl}/api/plays`);

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(response.data, null, 2),
      },
    ],
  };
}
