
$(document).ready(function() {

  //根据category显示相应文章列表
  categoryDisplay();

  //给普通文本增加highlightjs里的样式
  //$("code.language-text").addClass("hljs");
  $("code[data-lang='text']").addClass("hljs");

  //给使用`text`生成的文本text加上样式
  $("code:not([data-lang])").addClass("monospace");
  
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
    /*only show All*/
    $('.post-list-body>div[post-cate!=All]').hide();
    /*show category when click categories list*/
    $('.categories-list-item').click(function() {
        var cate = $(this).attr('cate'); //get category's name

        $('.post-list-body>div[post-cate!="' + cate + '"]').hide(250);
        $('.post-list-body>div[post-cate="' + cate + '"]').show(400);
    });
}
