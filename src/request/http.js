import axios from "axios";
// 全局的配置
// const testURL = 'http://httpbin.org/post';
const serverURL = 'http://localhost:9998/';
// const serverURL = 'http://121.104.5.77:8888'
axios.defaults.baseURL = serverURL;
axios.defaults.timeout = 3000;

axios.defaults.headers.post['Content-Type'] = 'application/json';
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    console.log(`url = ${url}, params = ${params}`);

    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                console.log("err  = ", err);
                reject(err.data)
            });
    });
}