<template>
  <div id="app">
    <div>
      <nav>
          <div class="nav-top" >
            <div class="nav-top-top" v-if="navvav">
              <div class="nav-top-top-nav" @click="navopen"><i class="iconfont icon-weibiaoti15"></i></div>
              <div class="nav-top-top-logo">
                <nuxt-link  title="Hassd博客" to="/newest"><img src="~/static/t1.jpg" alt="Hassd博客"></nuxt-link>
              </div>
            </div>
            <div class="nav-top-zhe" v-if="!navvav" @click="navclose"></div>
            <div class="nav-top-left" v-if="!navvav">
              <div class="nav-top-left-logo">
                <div class="nav-top-left-img" @click="navclose">
                  <nuxt-link  title="Hassd博客" to="/newest"><img src="~/static/t1.jpg" alt="Hassd博客"></nuxt-link>
                </div>
                <h2>Hassd博客</h2>
              </div>
              <ul @click="navclose">
                <li><nuxt-link to="/newest"><i title="首页" class="iconfont icon-weibiaoti15"></i><span>首页</span></nuxt-link></li>
                <li><nuxt-link to="/notes"><i title="学习笔记" class="iconfont icon-iconset0124"></i><span>学习笔记</span></nuxt-link></li>
                <li><nuxt-link to="/record"><i title="生活趣事" class="iconfont icon-shenghuo"></i><span>生活趣事</span></nuxt-link></li>
                <li><nuxt-link to="/type"><i title="类型分类" class="iconfont icon-iconset0124"></i><span>类型分类</span></nuxt-link></li>
                <li><nuxt-link to="/search"><i title="搜索文章" class="iconfont icon-sousuo1"></i><span>搜索文章</span></nuxt-link></li>
                <li><nuxt-link to="/about"><i title="关于我" class="iconfont icon-bangzhuguanyuwomen"></i><span>关于我</span></nuxt-link></li>
              </ul>
            </div>
          </div>
        <div class="nav-left">
          <div class="nav-left-logo">
            <div class="nav-left-img">
              <nuxt-link title="Hassd博客" to="/newest"><img src="~/static/t1.jpg" alt="Hassd博客"></nuxt-link>
            </div>
            <h2>Hassd博客</h2>
          </div>
          <ul>
            <li><nuxt-link to="/newest"><i title="首页" class="iconfont icon-weibiaoti15"></i><span>首页</span></nuxt-link></li>
            <li><nuxt-link to="/notes"><i title="学习笔记" class="iconfont icon-iconset0124"></i><span>学习笔记</span></nuxt-link></li>
            <li><nuxt-link to="/record"><i title="生活趣事" class="iconfont icon-shenghuo"></i><span>生活趣事</span></nuxt-link></li>
            <li><nuxt-link to="/type"><i title="类型分类" class="iconfont icon-iconset0124"></i><span>类型分类</span></nuxt-link></li>
            <li><nuxt-link to="/search"><i title="搜索文章" class="iconfont icon-sousuo1"></i><span>搜索文章</span></nuxt-link></li>
            <li><nuxt-link to="/about"><i title="关于我" class="iconfont icon-bangzhuguanyuwomen"></i><span>关于我</span></nuxt-link></li>
          </ul>
        </div>
      </nav>
      <div class="notice">
        <div class="notice-hot">
          <h3><em>热门文章</em></h3>
          <div v-for="(itme,index) in noticedata.notice1" :key="index">
            <nuxt-link :to="{name:'aid-id',params:{id:itme._id}}">{{itme.title}}</nuxt-link>
          </div>
        </div>
        <div class="notice-hot">
          <h3><em>推荐文章</em></h3>
          <div v-for="(itme,index) in noticedata.notice2" :key="index">
            <nuxt-link :to="{name:'aid-id',params:{id:itme._id}}">{{itme.title}}</nuxt-link>
          </div>
        </div>
        <div class="notice-hot">
          <h3><em>广告</em></h3>
          <div><a href="https://www.baidu.com" target="_blank"><img src="~/static/t1.jpg" alt="百度一下"></a></div>
        </div>
      </div>
    </div>
    <nuxt v-if="isRouterAlive"/>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  provide(){
    return{
      reload:this.reload,
    }
  },
  data(){
    return{
      isRouterAlive:true,
      noticedata:'',
      navvav:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    },
    navopen(){
      this.navvav=false;
    },
    navclose(){
      this.navvav=true;
    }
  },
  created() {
    axios.get('http://39.108.13.166:3000/notice')
    .then((data)=>{
      this.noticedata=data.data;
    })
    .catch(()=>{
      console.log('连接失败！')
    })
  }
}
</script>


