const wait = async (ms: number) => await new Promise(r => setTimeout(r, ms));

export const getAllPosts = async () => {
  await wait(300);

  return [
    {
      id: 1,
      createdAt: '',
      title: 'some title',
      slug: 'some-title',
      img: 'https://images.unsplash.com/photo-1500622944204-b135684e99fd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJhbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      description: 'desc',
      content: 'content',
      status: 'Active',
      type: 'Post',
      views: 0
    }
  ];
};