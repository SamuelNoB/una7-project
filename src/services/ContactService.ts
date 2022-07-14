import { Contact } from ".prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async sendMessage(contactInput: ContactInput): Promise<any> {
    const response = await fetch('api/sendMessage', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(contactInput),
    });

    return await response.json();
  },

  async listMessages(): Promise<{data: Partial<Contact[]>}> {
    const response = await fetch('api/listMessages', {
      method: 'GET',
    });
    const {data} = await response.json() ?? []
    return data;
  }
}