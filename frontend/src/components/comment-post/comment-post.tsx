import { ReactNode } from 'react';

interface CommentPostProps {
  children: ReactNode;
}

function CommentPost(props: CommentPostProps) {
  const { children } = props;

  return <div>{children}</div>;
}

export default CommentPost;
