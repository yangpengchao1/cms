import {BaseResponse} from "../Entity/response/BaseResponse";
import BaseAPI from "./BaseAPI";
import {LoginRequest} from "../Entity/request/LoginRequest";
import {LoginResponse} from "../Entity/response/LoginResponse";
import {LogoutRequest} from "../Entity/request/LogoutRequest";

class AuthAPI extends BaseAPI {
    public login(req: LoginRequest): Promise<BaseResponse<LoginResponse>> {
        return this.createPost(req).then(this.showMessage("",true));
    }

    public logout(req: LogoutRequest): Promise<BaseResponse<boolean>> {
        return this.createPost(req);
    }
}

export const authAPI = new AuthAPI();
