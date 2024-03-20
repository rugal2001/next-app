import useSWR from "swr";
import CommentCard from "../../components/comment-card";
import fetcher from "../../lib/fetcher";
import { useRouter } from "next/router";
//import Layout from "../../layouts/main-layout";
//import { Demo } from "../../layouts/application-cantainer";

const Home = () => {
  const router = useRouter();
  const {
    data: comments,
    error,
    isLoading,
  } = useSWR("https://jsonplaceholder.typicode.com/comments", fetcher);

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error loading comments</div>;
  if (!comments) return <div>No Comments...</div>;

  return (
    
    
    
    
      <div className="container p-4 mx-auto">
      
      <h1 className="mb-8 text-4xl font-bold">Latest Comments</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
       
      </div>
      </div>
    
    
  );
};

export default Home;
