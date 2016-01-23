/**
 * 页面ready方法
 */
$(document).ready(function() {

    categoryDisplay();
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
