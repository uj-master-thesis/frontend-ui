import {PostModel} from "../shared/post-model";

export const POST_MODELS: PostModel[] = [
  {
    id: 1,
    postName: 'post1',
    url: 'http://eggewegsa',
    description: 'aefea',
    voteCount: 2,
    userName: 'Patryk',
    subredditName: 'raz',
    commentCount: 4,
    duration: '312',
    upVote: true,
    downVote: false
  },
  {
    id: 2,
    postName: 'post1',
    url: 'http://eggewegsa',
    description: 'aefea',
    voteCount: 2,
    userName: 'Patryk',
    subredditName: 'raz',
    commentCount: 4,
    duration: '312',
    upVote: true,
    downVote: false
  },
  {
    id: 3,
    postName: 'post2',
    url: 'http://eggewegsa',
    description: 'aefea',
    voteCount: 4,
    userName: 'Patryk',
    subredditName: 'raz',
    commentCount: 4,
    duration: '312',
    upVote: false,
    downVote: true
  },
  {
    id: 0,
    postName: 'post2',
    url: 'http://eggewegsa',
    description: 'aefea',
    voteCount: 4,
    userName: 'Patryk',
    subredditName: 'raz',
    commentCount: 4,
    duration: '312',
    upVote: false,
    downVote: true
  },
  // { id: 1, postName: 'post3', url: 'http://eggewegsa', description: 'aefea', voteCount: 2, userName: 'Patryk', subredditName: 'raz', commentCount: 4, duration: '312', upVote: true, downVote: false },
  // { id: 2, postName: 'post2', url: 'http://eggewegsa231', description: 'aefea', voteCount: 4, userName: 'Patryk', subredditName: 'dwa', commentCount: 7, duration: '3122', upVote: true, downVote: false }
];


// export interface PostModel {
//   id: number;
//   postName: string;
//   url: string;
//   description: string;
//   voteCount: number;
//   userName: string;
//   subredditName: string;
//   commentCount: number;
//   duration: string;
//   upVote: boolean;
//   downVote: boolean;
// }
