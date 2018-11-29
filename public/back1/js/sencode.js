/***********设置二级菜单的样式***** */
$(function () {
  var currPage = 1;
  var pageSize = 5;

  //封装渲染函数
  function render() {

    //发送ajax请求
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        //绑定模板引擎
        var htmlStr = template('tmp', info);
        $('tbody').html(htmlStr);

        //初始化分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total/info.size), //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currPage = page;

            render();
          }
        });

      }
    });
  }
  render();

  //点击添加分类按钮，弹出模态框
  $('.addBtn').click(function () {
    
    //显示模态框
    $('#addCate').modal('show');

    //发送ajax请求，获取一级菜单的内容
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      data:{
        page:1,
        pageSize:100,
      },
      dataType:'json',
      success:function (info) {
        
        console.log(info);
        //绑定模板
        var htmlStr = template('fister_tmp',info);
        $('.dropdown-menu').html(htmlStr);


        
      }
    });
  });


})