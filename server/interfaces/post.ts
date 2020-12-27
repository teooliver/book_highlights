import { Document } from "mongoose";

export default interface IPost extends Document {
  title: string;
  message: string;
  creator: string;
  tags: string[];
  selectedFile: string;
  likeCount: number;
  createdAt: Date;
}
