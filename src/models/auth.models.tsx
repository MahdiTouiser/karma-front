import { BaseResponse } from "./shared.models";

export interface AuthData {
  isAdmin: any;
  authToken: string
  refreshToken: string;
}


export interface UserSecurityInformation {
  username: string;
  password: string;
}

export interface OTPRequest {
  phone: string;
}

export type OTPResponse = BaseResponse<string>