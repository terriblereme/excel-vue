//接口路径
export const apiDevelop =
    process.env.NODE_ENV === 'production'
        ? ''
        : '/api'

//获取地址栏参数
export function getUrlKey(name){
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href)||[null,""])[1].replace(/\+/g, '%20')) || null
    }

//微信网页授权回调接口
// //海鑫
export const token_code = "hxjrsy_token";
export const appid = "wxe280b5d3c8f5b22c";
export const redirecturi = "http://hxfk.xmboq.com/mobile/home";
// 佰行
// export const token_code = "bqfk_token";
// export const appid="wx449054bc69714f6a";
// export const redirecturi="http://bqfk.xmboq.com/mobile/home";