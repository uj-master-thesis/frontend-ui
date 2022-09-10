export interface CreatePostPayload {
  postName: string;
  threadName?: string;
  url?: string;
  description: string;
  userName: string;
  fileCompressed?: string; //as base64
}
