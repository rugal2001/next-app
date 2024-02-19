import axios from "axios";
import useSWR from "swr";
import { useState } from "react";

/*interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}*/

const fetcher = async (url) => {
  const response = await axios.get(url);
  //console.log(response);
  return response.data;
};

const Comment = () => {
  const {
    data: comments,
    error,
    isLoading,
  } = useSWR("https://jsonplaceholder.typicode.com/comments", fetcher);

  if (error) return <div>Error loading comments</div>;
  if (isLoading) return <div>Loading ...</div>;
  if (!comments) return <div>No Comments...</div>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {comment => (
        <div key={comment.id} className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold">{comment.name}</h2>
          <h4 className="text-lg font-bold">{comment.email}</h4>
          <p className="text-gray-600">{comment.body}</p>
        </div>
      )}
    </div>
  );
};
export default Comment;
