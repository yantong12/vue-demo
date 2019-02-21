import Axios from 'axios'
import qs from 'qs'
import {Message, Loading} from 'element-ui'
const _host = '/'

// 默认的携带参数
const defaultData = {}
// 修改请求头，在跨域时不发送options请求
Axios.interceptors.request.use(function (config) {
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (config.method === 'post') {
    config.data = qs.stringify({
      ...config.data
    })
  }
  return config
}, function (error) {
  return Promise.reject(error)
})


// 添加响应拦截器
Axios.interceptors.response.use(function (res) {
  // 返回的不是json
  if (typeof res.data !== 'object') {
    res.data = {msg: '数据有误', code: 500}
  }
  return res.data
}, function () {
  Message.error('接口请求出错')
});

Axios.defaults.withCredentials = true;

/**
 * 参数合并
 * @param par 传入参数
 * @returns {{} & any}
 * @private
 */
const _merge = function (par) {
  return Object.assign(JSON.parse(JSON.stringify(defaultData)), par)
}

/**
 * 发送get请求
 * @param url
 * @param params
 * @param options
 * @returns {*}
 */
function get(url, data = {}, options) {
  return aAjax(url, data, 'get', options)
}

/**
 * 发送post请求
 * @param url
 * @param data
 * @param options
 * @returns {*}
 */
function post(url, data = {}, options) {
  return aAjax(url, data, 'post', options)
}

/**
 * 统一的ajax请求
 * @param url
 * @param params
 * @param type
 * @param options
 */
function aAjax(url, params, type, options = {}) {
  let p = {
    url: url,
    method: type,
    baseURL: options.baseURL ? options.baseURL : _host,
    timeout: 0,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }

  if (params) {
    if (['put', 'post', 'patch'].includes(type)) {
      p.data = _merge(params)
    } else {
      p.params = _merge(params)
    }
  }
  let loadingInstance;
  if (options.loading) {
    loadingInstance = Loading.service({
      fullscreen: true,
      text: '加载中...'
    });
  }
  return new Promise((resolve,reject)=>{
    Axios(p).then(res => {
      if (options.loading) {
        loadingInstance.close()
      }
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default {
  get,
  post,
  host: _host
}
