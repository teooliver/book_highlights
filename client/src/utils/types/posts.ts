export interface PostFormData {
  creator: string;
  title: string;
  message: string;
  tags: string;
  selectedFile: string;
}

export interface Post {
  _id: string;
  createdAt: Date;
  creator: string;
  title: string;
  message: string;
  tags: string[];
  selectedFile: string;
  likeCount: number;
}
