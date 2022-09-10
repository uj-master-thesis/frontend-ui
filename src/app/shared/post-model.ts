export interface PostModel {
  id: number;
  postName: string;
  url: string;
  description: string;
  voteCount: number;
  userName: string;
  threadName: string;
  commentCount: number;
  duration: string;
  upVote: boolean;
  downVote: boolean;
}
