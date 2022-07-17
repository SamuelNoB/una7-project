
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async createPost(payload: createPostInput) {
    const data = new FormData();
    if (payload.active === undefined) payload.active = true;
    data.append('Image', payload.Image?.rawFile);
    data.append('active',payload.active.toString());
    data.append('title', payload.title);
    data.append('subtitle', payload.subtitle);
    data.append('content', payload.content);
    const response = await fetch('/api/post/create', {
      method: 'POST',
      body: data
    })
    const result = await response.json()
    return result;
  },
  async updatePost(payload: updatePostBody) {
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
    const response = await fetch('/api/post/put', {
      method: 'PUT',
      body: data
    })
    const result = await response.json()
    return result;
  },

  async getAllPost()  {
    const data = await fetch('/api/post/get', {method: 'GET'})
    const result = await data.json()
    return result.posts as SmallPublication[]
  },

  async getOnePost({queryKey}: any) {
    const [_, {id}] = queryKey
    if (id) {
      const response = await fetch(`/api/post/get/${id}`, {method: 'GET'})
      const body = await response.json()
      return body.data
    }
    return {}
  },

  async deletePost(id: string) {
    const response = await fetch('/api/post/delete', 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({id})
    })

    return await response.json()
  }
}