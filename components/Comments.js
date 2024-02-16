import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url) => {
    const response = await axios.get(url);
    //console.log(response);
    return response.data;
  };

  const Comments = () => {
    const { data: comments, error } = useSWR('https://jsonplaceholder.typicode.com/comments', fetcher);

    if (error) return <div>Error loading comments...</div>;
    if (!comments) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

     {comments.map(comment => (
        <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold">{comment.name}</h2>
          <h4 className="text-lg font-bold">{comment.email}</h4>
          <p className="text-gray-600">{comment.body}</p>
        </div>
        
      ))}
        </div>

    );

  };
  export default Comments;