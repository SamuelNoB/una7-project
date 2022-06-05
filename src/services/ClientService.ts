import { Client } from "@prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async getAllClients(): Promise<Client[]> {
    const response = await fetch('/api/client/get', {
      method: 'GET',
    });
    const result = await response.json();
    return result.clients;
  },
  async getOneClient(id: string): Promise<Client | string> {
    const response = await fetch(`/api/client/get/${id}`, {
      method: 'GET'
    })
    const result = await response.json();
    return response.status === 200 ? result.client : result.error;
  },
  async createClient(payload: createClientInput): Promise<Client | string> {
    const formData = new FormData()
    formData.append('clientPhoto', payload.clientPhoto?.rawFile);
    formData.append('visible',payload.visible.toString());
    formData.append('name', payload.name);
    formData.append('link', payload.link);
    const response = await fetch('/api/client/create', {
      method: 'POST',
      body: formData
    });

    const result = await response.json()
    return response.status === 200 ? result.data : result.error
  }
}