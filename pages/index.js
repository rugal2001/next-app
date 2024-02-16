import PostList from '../components/PostList';

const Home =() =>{
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 ">Latest Posts</h1>
      <PostList />
    </div>
  );
};

export default Home;
