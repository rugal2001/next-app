/*import axios from 'axios';
import useSWR from 'swr';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map(post => (
        <div key={post.id} className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p className="text-gray-600">{post.body}</p>
        </div>
        
      ))}
    </div>
    
  );
};

export default PostList;
*/
import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const PostList = () => {
  const { data: post, error } = useSWR('https://jsonplaceholder.typicode.com/posts/1', fetcher);

  if (error) return <div>Error loading post...</div>;
  if (!post) return <div>Loading...</div>;

  return (
    <div className="bg-blue-100 p-4 rounded-lg ">
      <h2 className="text-lg font-bold">{post.title}</h2>
      <p className="text-black-100">{post.body}</p>
    </div>
  );
};

export default PostList;
