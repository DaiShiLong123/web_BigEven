$(function () {
  // 调用getUserInfo获取用户的基本信息
  getUserInfo()
  let layer = layui.layer
  $('#btnLogout').on('click', function () {
    layer.confirm(
      '确实退出登录?',
      { icon: 3, title: '提示' },
      function (index) {
        //do something
        // 1.消除token值
        localStorage.removeItem('token')
        // 2.跳转到登录的页面
        location.href = 'login.html'

        layer.close(index)
      }
    )
  })
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    /* headers: {
      Authorization: localStorage.getItem('token') || '',
    }, */
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败')
      }
      // 调用 renderAvatar 渲染用户的头像
      renderAvatar(res.data)
    },
  })
}

// 渲染用户的头像
function renderAvatar(user) {
  // 1.获取用户的名称
  let name = user.nickname || user.username
  // 2.设置欢迎的文本
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 3.按需渲染用户的头像
  if (user.user_pic !== null) {
    // 3.1渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    // 3.2渲染文本头像
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}
