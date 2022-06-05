// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createPost(payload: createPostInput) {
    const data = new FormData();
    data.append('coverImage', payload.coverImage?.rawFile);
    data.append('active',payload.active.toString());
    data.append('title', payload.title);
    data.append('subtitle', payload.subtitle);
    data.append('content', payload.content);
    fetch('/api/post/create', {
      method: 'POST',
      body: data
    }).then(response => response.json())
    .catch(error => console.log(error))
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
  }
}