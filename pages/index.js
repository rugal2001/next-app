import Comments from '../components/Comments';
import PostList from '../components/PostList';

const Home =() =>{
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 ">Latest Comments</h1>
      <Comments />
    </div>
  );
};

export default Home;
