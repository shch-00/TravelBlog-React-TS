import { FC, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { usePost } from "../../hooks/posts";
import { useComments } from "../../hooks/comments";
import { ResponsivePageWrapper } from "../../utils/motionConfigurations";
import CommentsList from "../../components/CommentsList/CommentsList";
import BackIcon from "../../assets/icons/Back.svg?react";
import "./PostPage.css";

const PostPage: FC = () => {
  const { id } = useParams();
  const { data: post, isLoading: isPostLoading } = usePost(Number(id));
  const { data: comments, isLoading: isCommentsLoading } = useComments(
    Number(id)
  );
  const containerRef = useRef<HTMLImageElement>(null);

  if (isPostLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsivePageWrapper>
      <div className="post-page" ref={containerRef}>
        <img
          src={`https://placehold.co/1200x450?text=${post?.title}`}
          alt={post?.title}
          className="post-page__image"
        />
        <div className="post-page__content">
          <div className="post-page__inner">
            <h2 className="post-page__title">{post?.title}</h2>
            <p className="post-page__description">{post?.description}</p>
          </div>
          {isCommentsLoading ? (
            <div>Loading...</div>
          ) : (
            comments &&
            comments.length > 0 && <CommentsList comments={comments} />
          )}
          <div className="post-page__buttons">
            <Link className="post-page__button btn btn--link" to="/">
              <BackIcon className="post-page__button-icon btn__icon" />
              <span>Назад</span>
            </Link>
            <Link className="post-page__button btn" to={`/add-comment/${id}`}>
              Ваше впечатление об этом месте
            </Link>
          </div>
        </div>
      </div>
    </ResponsivePageWrapper>
  );
};

export default PostPage;
