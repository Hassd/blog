<template>
    <div class="block">
        <h2>
            <samp title="类型">{{block.type}}</samp>
            <nuxt-link :to="{name:'aid-id',params:{id:block._id}}">{{block.title}}</nuxt-link>
        </h2>
        <div class="bolck-p">
            <div class="block-img" v-if="block.srcimg">
                <nuxt-link :to="{name:'aid-id',params:{id:block._id}}">
                    <img :src="block.srcimg" :alt="block.title">
                </nuxt-link>
            </div>
            <p v-html="block.introduce"></p>
        </div>
        <nuxt-link :to="{name:'aid-id',params:{id:block._id}}">查看全文&gt;&gt;</nuxt-link>
        <div class="block-icon">
            <i title="点击数" class="iconfont icon-fire"></i>
            <span>浏览：{{block.click}}</span>
            <i title="时间" class="iconfont icon-ico_home_committed"></i>
            <span>时间：{{block.time}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props:['block']
}
</script>

<style>
.block{
    padding: 20px 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #DCDFE6;
}
.block h2,.block div,.block p{
    text-align: left;
    margin-bottom: 10px;
}
.block:hover h2 a{
    color: coral;
}
.block h2{
    width: 100%;
    font-weight: 400;
    font-size: 20px;
}
.bolck-p::after,.block h2::after{
    clear:both;
    display: block;
    content: '';
}
.block-img{
    width: 200px;
    height: 120px;
    overflow: hidden;
    float: left;
    margin-right: 10px;
    border-radius: 4px;
}
.block-img img{
    width: 100%;
    transition: all 0.3s;
    opacity: 0.8;
}
.block:hover img{
    transform: scale(1.1);
}
.block samp{
    padding: 0px 6px;
    background-color: coral;
    height: 18px; 
    color:#fff;
    float: left;
    display: block;
    font-size: 10px;
    position: relative;
    line-height: 18px;
    margin-right: 6px;
    margin-top: 5px;
    font-weight: 900;
}
.block samp::after{
    content:'';
    width: 0;
    height: 0;
    border-bottom: 4px solid transparent;
    border-left:  4px solid coral;
    border-top:  4px solid transparent;
    position: absolute;
    right: -4px;
    top: 5px;
}
.block h2 a{
    color: #888;
    transition: all 0.5s;
}

.block i{
    font-size: 13px;
    color: #999;
}
.block span{
    font-size: 12px;
    margin-right:10px;
    color: darkgoldenrod;
}
.block-icon{
    width: 100%;
    text-align: right !important;
}
.block p{
    position:relative;
    line-height:1.4em;
    max-height: 6.9em;
    overflow:hidden;
    color: #555;
}
.block p::after{
    content:"...";
    height: 20px;
    font-weight:bold;
    position:absolute;
    bottom:2px;
    right:0;
    padding:0px 15px;
    background-color: #fff;
}
.block > a{
    font-size: 12px;
}
</style>
