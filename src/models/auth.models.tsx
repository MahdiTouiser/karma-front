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


export interface UserSecurityInformation {
  username: string;
  password: string;
}

export interface OTPRequest {
  phone: string;
}

export type OTPResponse = BaseResponse<string>