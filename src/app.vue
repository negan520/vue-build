<template>
    <div id="text">
        {{text}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName: '首页',//侧滑菜单选中项
                noticeList: [],//公告数据列表
                index: 0,//判断侧滑菜单选中项
                egDate: '',//首页日期时间
                imgIdex:0,
                scrollNotice:0,
                selfLeft:0.5,
                noticeIn:null,
                text: 'lrxu'
            }
        }
    }
</script>

<style>
    #text {
        color: red;
    }
</style>