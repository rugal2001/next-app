import axios from 'axios';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = async (url) => {
  const response = await axios.get(url);
  //console.log(response);
  return response.data;
};

const PostList = () => {
  const { data: posts, error } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher);

  if (error) return <div>Error loading posts...</div>;
  if (!posts) return <div>Loading...</div>;
   
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {posts.map(post => (
        <div key={post.id} className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p className="text-gray-600">{post.body}</p>
        </div>
        
      ))}
    </div>
    
  );
};

export default PostList;

