import { BaseResponse } from "./shared.models";

export interface UserMessage {
  text: string;
  title: string;
  visited: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserMessageResponse extends BaseResponse<UserMessage[]>{
  notVisited: number;
}