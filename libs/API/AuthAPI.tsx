import { BaseResponse } from "../Entity/response/BaseResponse";
import BaseAPI from "./BaseAPI";
import { AxiosResponse } from "axios";
import { LoginRequest } from "../Entity/request/LoginRequest";
import { LoginResponse } from "../Entity/response/LoginResponse";
import { LogoutRequest } from "../Entity/request/LogoutRequest";

class AuthAPI extends BaseAPI {
  public login(
    req: LoginRequest
  ): Promise<AxiosResponse<BaseResponse<LoginResponse>>> {
    return this.createPost(req);
  }

  public logout(
    req: LogoutRequest
  ): Promise<AxiosResponse<BaseResponse<boolean>>> {
    return this.createPost(req);
  }
}

export const authAPI = new AuthAPI();
