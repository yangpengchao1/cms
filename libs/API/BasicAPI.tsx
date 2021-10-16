import axios from "axios";
import {message} from "antd";

export default function BasicAPI() {
    const reqHandlerCurry =
        (
            reqHandler: (params: Record<string, string>) => any,
            resHandle: (res: any) => void
        ) =>
            (req: any) => {
        const requestParams = reqHandler(req);
        axios(requestParams).then(res => resHandle(res)).catch(err => message.error(err.message));
    }

    const reqHandler = (params: Record<string, string>) => {
      return ;
    }

    const resHandle = (res: any) => {

    }

    const test=()=>{
        const a= {"a":"abc"};
        reqHandlerCurry(
            function (){console.log(1);},
            function (){
            console.log(2);});("abc");{
            console.log(3)
        }
    }
}