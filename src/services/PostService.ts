// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createPost(payload: createPostInput) {
    const data = new FormData();
    data.append('coverImage', payload.coverImage);
    data.append('active',payload.active.toString());
    data.append('title', payload.title);
    data.append('subtitle', payload.subtitle);
    data.append('content', payload.content);
    fetch('/api/post/create', {
      method: 'POST',
      body: data
    }).then(response => response.json())
    .catch(error => console.log(error))
  }
}