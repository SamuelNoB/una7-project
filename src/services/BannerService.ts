import { Banner } from "@prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async getAllBanners(): Promise<Banner[]> {
    const response = await fetch('/api/client/get', {
      method: 'GET',
    });
    const result = await response.json();
    return result.banners;
  },
  /*async getOneBanner({queryKey}: any): Promise<Banner | string> {
    const [_, {id}] = queryKey
    const response = await fetch(`/api/client/get/${id}`, {
      method: 'GET'
    })
    const result = await response.json();
    return response.status === 200 ? result.client : result.error;
  },*/
  async createBanner(payload: createBannerInput): Promise<Banner | string> {
    const formData = new FormData()
    if (payload.active === undefined) payload.active = true;
    formData.append('Image', payload.Image?.rawFile);
    formData.append('active',payload.active.toString());
    formData.append('name', payload.name);
    formData.append('link', payload.link);
    formData.append('displayUntil', payload.displayUntil?.toISOString());
    const response = await fetch('/api/banner/create', {
      method: 'POST',
      body: formData
    });

    const result = await response.json()
    return response.status === 200 ? result.data : result.error
  },
  /*async updateClient(payload: updateClientBody) {
    const data = new FormData();
    type StatusKey = keyof typeof payload.body;
    data.append('id', payload.id.toString())
    Object.keys(payload.body).forEach((attribute: any) => {
      let key: StatusKey = attribute;
      let value = payload.body[key];
      if (key === 'Image') {
        data.append(attribute, value.rawFile)
      } else {
        data.append(attribute, value)
      }
    })
    const response = await fetch(`/api/client/put`, {
      method: 'PUT',
      body: data
    })
    const result = await response.json()
    return result
  },*/

  /*async deleteClient(id: string): Promise<string> {
    const response = await fetch('/api/client/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({id})
    })
    const result = await response.json()
    return response.status === 200 ? result.data : result.error 
  }*/

}