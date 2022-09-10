import {VoteType} from "./vote-type";

export interface VotePayload {
  voteType?: VoteType;
  postName?: string;
  username?: string;
}
