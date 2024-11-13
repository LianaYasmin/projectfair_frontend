import axios from "axios"


export const commonApi= async(httpRequest,url,reqBody,reqHeader)=>{
    const regConfig={
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
    }
    return await axios(regConfig).then((result)=>{
        return result
    }).catch((error)=>{
        return error
    })
}