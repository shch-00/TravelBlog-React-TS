import { FC } from "react";
import { usePosts } from "../../hooks/posts";
import { ResponsivePageWrapper } from "../../utils/motionConfigurations";
import { Link } from "react-router-dom";
import Post from "../../types/Post";
import PostCard from "../../components/PostCard/PostCard";
import "./HomePage.css";

const HomePage: FC = () => {
  const { data: posts, isLoading } = usePosts();

  console.log(posts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsivePageWrapper>
      <div className="home-page">
        <ul className="home-page__posts-list">
          {posts?.map((post: Post) => (
            <li className="home-page__post-item" key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
        <Link to="/create-post" className="home-page__button btn" style={{}}>
          Добавить мое путешествие
        </Link>
      </div>
    </ResponsivePageWrapper>
  );
};

export default HomePage;
