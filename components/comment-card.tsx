import axios from "axios";
import useSWR from "swr";

interface CommentCardI {
  comment: { id: string; name: string; email: string; body: string };
  onClick?: () => any;
}

const CommentCard = ({ comment, onClick = () => {} }: CommentCardI) => {
  return (
    <div
      className="p-4 mx-3 bg-white rounded-lg cursor-pointer hover:shadow"
      onClick={() => {
        onClick();
      }}
    >
      <h2 className="text-lg font-bold">{comment.name}</h2>
      <h4 className="text-lg font-bold">{comment.email}</h4>
      <p className="text-gray-600">{comment.body}</p>
    </div>
  );
};
export default CommentCard;
