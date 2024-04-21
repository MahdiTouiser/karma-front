import { BaseResponse } from "./shared.models";

export interface AuthData {
  tokenType: string;
  authToken: string
  refreshToken: string;
  expiresIn: number;
  isAdmin: boolean;
  personalInformationCompleted: boolean,
  securityInformationCompleted: boolean
}


export interface UserSecurityInformation{
    username: string;
    password: string;
}

export interface OTPRequest{
  username: string;
}

export type OTPResponse = BaseResponse<string>