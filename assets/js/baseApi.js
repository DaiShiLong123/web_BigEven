// 这个函数中可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  options.url = 'http://www.liulongbin.top:3007' + options.url
  //  统一为权限的接口，设置headers请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || '',
    }
  }

  // 全局统一挂载 complete
  options.complete = function (res) {
    console.log(res.responseJSON, 'sdsdsfdfsdf')
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      // 1. 强制清空 token
      localStorage.removeItem('token')
      // 2. 强制跳转到登录页面
      location.href = '/login.html'
    }
  }
})
