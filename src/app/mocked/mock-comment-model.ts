import {PostModel} from "../shared/post-model";
import {CommentPayload} from "../comment/comment-payload";

export const COMMENTS_MODEL: CommentPayload[] = [
  { text: 'efa', postId: 123, username: 'Patryk', duration: '21'},
  { text: 'efdsfa', postId: 1223, username: 'Patryk', duration: '213'},
];


// export interface CommentPayload{
//   text: string;
//   postId: string;
//   username:string;
//   duration: string;
// }
