
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
  }
}