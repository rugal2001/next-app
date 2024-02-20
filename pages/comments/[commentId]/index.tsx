import { useRouter } from "next/router";
import CommentCard from "../../../components/comment-card";
import fetcher from "../../../lib/fetcher";
import useSWR from "swr";
const Home = () => {
  const router = useRouter();
  const { commentId } = router.query;
  const {
    data: comments,
    error,
    isLoading,
  } = useSWR("https://jsonplaceholder.typicode.com/comments", fetcher);
  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error loading comments</div>;
  if (!comments) return <div>There is no such comment</div>;

  const selectedComment = comments.find(
    (comment) => comment.id === parseInt(commentId as string)
  );
  return (
    <div className="container p-4 mx-auto">
      <div className="grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {selectedComment && (
          <CommentCard key={selectedComment.id} comment={selectedComment} />
        )}
      </div>
    </div>
  );
};

export default Home;
//const useRouter = require('next/router');
/*export default function hello() {
  const router = useRouter();
  const { commentId } = router.query;
  
  console.log({ commentId, g: "dd" });

  return <h1>your id is {commentId}</h1>;
}*/
