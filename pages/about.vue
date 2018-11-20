<template>
    <div class="content">
        <h1>关于我</h1>
        <div class="about">
            <h2>我的网站</h2>
            <div>
                <h3>前台页面</h3>
                <div>网站是响应式布局</div>
                <div>前端应用vue的 <span>nuxt</span> 框架</div>
                <div>后端应用node的 <span>koa2</span> 框架</div>
                <div>数据库应用 <span>MongoDB</span> 最像关系型数据库的非关系型开源数据库</div>
            </div>
            <div>
                <h3>后台页面</h3>
                <div>网站是 <a href="http://admin.hassd.top">admin.hassd.top</a></div>
                <div>前端应用vue的 <span>vue-cli</span> 框架</div>
                <div>后端应用node的 <span>koa2</span> 框架</div>
                <div>数据库应用 <span>MongoDB</span> 最像关系型数据库的非关系型开源数据库</div>
            </div>
        </div>
        <pagetail></pagetail>
    </div>
</template>

<script>
import axios from 'axios'
import pagetail from '~/components/pagetail.vue'
export default {
    data(){
        return{
        }
    },
    components: {
        pagetail
    }
}
</script>

<style>
.about h2,.about h3{
    font-weight: 400;
    color: #777;
}
.about{
    width: 100%;
    margin-left: 15px;
}
.about h2{
    font-size: 20px;
    margin: 10px 0;
}
.about >div{
    margin-left: 15px;
}
.about div div{
    color: #888;
    font-size: 14px;
    margin-bottom: 10px;
}
.about h3{
    margin-bottom: 10px;
}
.about span{
    color: coral;
}
</style>
