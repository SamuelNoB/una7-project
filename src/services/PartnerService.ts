/* eslint-disable import/no-anonymous-default-export */
export default {
  async createPartner(payload:createPartnerInput) {
    const data = new FormData();
    data.append('Image', payload.Image?.rawFile);
    data.append('name',payload.name);
    data.append('link', payload.link);
    const response = await fetch('/api/partner/create', {
      method: 'POST',
      body: data
    })
    const result = await response.json()
    return result;
  },

  async getAll() {
    const response = await fetch('api/partner/get', {
      method: 'GET',
    });
    const result = await response.json();
    return result
  },

  async updatePartner(payload: updatePartnerInput) {
    const data = new FormData();
    type StatusKey = keyof typeof payload;
    Object.keys(payload).forEach((attribute: any) => {
      let key: StatusKey = attribute
      let value = payload[key];
      if (key === 'image') {
        data.append(attribute, value.rawFile)
      } else {
        data.append(attribute, value)
      }
    })

    const response = await fetch('api/partner/put', {
      method: 'PUT',
      body: data
    });

    return await response.json();
  },

  async deletePartner(id: string) {
    const response = await fetch('api/partner/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({id})
    });

    return await response.json();
  }

}