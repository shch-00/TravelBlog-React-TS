import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { usePost } from "../../hooks/posts";
import { useComments } from "../../hooks/comments";
import { ResponsivePageWrapper } from "../../utils/motionConfigurations";

const PostPage: FC = () => {
  const { id } = useParams();
  const { data: post, isLoading: isPostLoading } = usePost(Number(id));
  const { data: comments, isLoading: isCommentsLoading } = useComments(
    Number(id)
  );

  if (isPostLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ResponsivePageWrapper>
      <div className="post-page">
        <Link to="/">Назад</Link>
        <div className="post-page__content">
          <img src="https://placehold.co/1200x500" alt={post?.title} />
          <h2>{post?.title}</h2>
          <p>{post?.description}</p>
        </div>
      </div>
    </ResponsivePageWrapper>
  );
};

export default PostPage;
