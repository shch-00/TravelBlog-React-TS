import { FC, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { usePost } from "../../hooks/posts";
import { useComments } from "../../hooks/comments";
import { ResponsivePageWrapper } from "../../utils/motionConfigurations";
import { URL_API_IMG } from "../../api/URL_API";
import CommentsList from "../../components/CommentsList";
import BackIcon from "../../assets/icons/Back.svg?react";
import "./PostPage.css";

const PostPage: FC = () => {
  const { id } = useParams();
  const { data: post, isLoading: isPostLoading } = usePost(Number(id));
  const { data: comments, isLoading: isCommentsLoading } = useComments(
    Number(id)
  );
  const containerRef = useRef<HTMLImageElement>(null);
  const isLogged = Boolean(localStorage.getItem("token"));
  const postImage = `${URL_API_IMG}${post?.photo}` || "";

  if (isPostLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsivePageWrapper>
      <div className="post-page" ref={containerRef}>
        <img
          src={
            postImage
              ? postImage
              : `https://placehold.co/1200x450?text=${post?.title}`
          }
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
            {isLogged ? (
              <Link className="post-page__button btn" to={`/add-comment/${id}`}>
                Ваше впечатление об этом месте
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </ResponsivePageWrapper>
  );
};

export default PostPage;
