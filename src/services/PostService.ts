// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async createPost(payload: createPostInput) {
    const data = new FormData();
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

  async getAllPost()  {
    const data = await fetch('/api/post/get', {method: 'GET'})
    const result = await data.json()
    return result.posts as SmallPublication[]
  },

  getOnePost(id: string) {
    fetch(`/api/post/get/${id}`, {method: 'GET'})
    .then(response => response.json())
    .then(error => console.log(error))
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