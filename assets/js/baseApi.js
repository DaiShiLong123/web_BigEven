// 这个函数中可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  console.log(options.url)
  options.url = 'http://www.liulongbin.top:3007' + options.url
})
