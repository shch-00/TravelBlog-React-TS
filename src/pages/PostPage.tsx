import { FC } from "react";

interface PostPageProps {
  id: string;
}

const PostPage: FC<PostPageProps> = ({ id }) => {
  return <div>PostPage: post id: {id}</div>;
};

export default PostPage;
