
$(document).ready(function() {

  //根据category显示相应文章列表
  categoryDisplay();

  //给普通文本增加highlightjs里的样式
  //$("code.language-text").addClass("hljs");
  $("code[data-lang='text']").addClass("hljs");

  //给使用`text`生成的文本text加上样式
  $("code:not([data-lang])").addClass("monospace");
  $('mark').addClass("monospace");
  
  //初始化highlightjs
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  //给table加上INS CSS样式
  $("table").addClass("ink-table alternating hover bordered");
});

/**
 * 分类展示
 * 点击右侧的分类展示时
 * 左侧的相关裂变展开或者收起
 * @return {[type]} [description]
 */
function categoryDisplay() {
  var cate = getUrlParam('cate');
  console.log("tag:", cate);
  cate = cate || "All";

  $('.post-list-body>div[post-cate!="' + cate + '"]').hide();
  $('.post-list-body>div[post-cate="' + cate + '"]').show();
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(decodeURI(r[2])); return null; //返回参数值
}