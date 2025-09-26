import { Comments } from "../../types/Comment";
import "./CommentsList.css";

interface CommentsListProps {
  comments: Comments;
}

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <ul className="comments-list">
      {comments.map((comment, index) => (
        <li
          key={comment.id ? comment.id : index}
          className="comments-list__item"
        >
          <div className="comments-list__author">
            <h3 className="comments-list__author-name">
              {comment.author_name}
            </h3>
            <p className="comments-list__author-date">
              {comment.created_at &&
                new Date(comment.created_at).toLocaleDateString()}
            </p>
          </div>
          <p className="comments-list__comment">{comment.comment}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
