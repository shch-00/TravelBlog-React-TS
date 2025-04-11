import { FC } from "react";
import { useColorMode } from "../../contexts/ColorModeContext";
import { Link } from "react-router-dom";
import RetinaImg from "../RetinaImg/RetinaImg";
import Post from "../../types/Post";
import "./PostCard.css";

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const { colorMode: storedColorMode } = useColorMode();
  const colorMode = localStorage.getItem("colorMode") || storedColorMode;

  return (
    <div
      className={`post-card ${colorMode === "dark" ? "post-card--dark" : ""}`}
    >
      <div className="post-card__img-content">
        <RetinaImg
          src={
            post.photo && typeof post.photo === "string"
              ? (post.photo as string)
              : `https://placehold.co/370x300/FFA902/black?text=${post.title}&font=poppins/jpeg`
          }
          alt={post.title}
          width={370}
          height={300}
          className="post-card__img"
        />
      </div>
      <div className="post-card__content">
        <div className="post-card__inner-top">
          <h3 className="post-card__title">{post.title}</h3>
          <p className="post-card__excerpt">{post.excerpt}</p>
        </div>
        <div className="post-card__inner-bottom">
          <span className="post-card__place">{`${post?.country ? post?.country + ", " : ""}${post?.city ? post?.city : ""}`}</span>
          <Link to={`/${post?.id}`} className="post-card__link">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
