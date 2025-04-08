import { FC } from "react";
import { usePosts } from "../../hooks/posts";
import { ResponsivePageWrapper } from "../../utils/motionConfigurations";
import PostCard from "../../components/PostCard/PostCard";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage: FC = () => {
  const { data: posts, isLoading } = usePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsivePageWrapper>
      <div className="home-page">
        <ul className="home-page__posts-list">
          {posts?.map((post) => (
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
