import axios from 'axios';

export async function listShapes(backendUrl: string) {
  const response = await axios.get(`${backendUrl}/api/shapes`);

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(response.data, null, 2),
      },
    ],
  };
}
