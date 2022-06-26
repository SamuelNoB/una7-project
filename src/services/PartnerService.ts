/* eslint-disable import/no-anonymous-default-export */
export default {
  async createPartner(payload:createPartnerInput) {
    const data = new FormData();
    data.append('Image', payload.Image?.rawFile);
    data.append('name',payload.name);
    data.append('active',payload.active.toString());
    data.append('link', payload.link);
    const response = await fetch('/api/partner/create', {
      method: 'POST',
      body: data
    })
    const result = await response.json()
    return result;
  },

  async getAll() {
    const response = await fetch('/api/partner/get', {
      method: 'GET',
    });
    const result = await response.json();
    return result
  },
  async getOnePartner({queryKey}: any) {
    const [_, {id}] = queryKey
    const response = await fetch(`/api/partner/get/${id}`, {
      method: 'GET',
    });
    const body = await response.json();
    return body.data;
  },
  async updatePartner(payload: updatePartnerBody) {
    const data = new FormData();
    type StatusKey = keyof typeof payload.body;
    data.append('id', payload.id.toString())
    Object.keys(payload.body).forEach((attribute: any) => {
      let key: StatusKey = attribute
      let value = payload.body[key];
      if (key === 'Image') {
        data.append(attribute, value.rawFile)
      } else {
        data.append(attribute, value)
      }
    })

    const response = await fetch('/api/partner/put', {
      method: 'PUT',
      body: data
    });

    return await response.json();
  },

  async deletePartner(id: string) {
    const response = await fetch('/api/partner/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({id})
    });

    return await response.json();
  }

}