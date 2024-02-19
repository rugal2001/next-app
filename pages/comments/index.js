import Comments from '../../components/Comments';
import PostList from '../../components/PostList';

const Home =() =>{
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-8 text-4xl font-bold ">Latest Comments</h1>
      <Comments />
    </div>
  );
};

export default Home;