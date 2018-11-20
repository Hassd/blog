<template>
    <div class="content">
        <div class="article-text">
            <h1>{{article.title}}</h1>
            <div class="article-iocn">
                <i title="类型" class="iconfont icon-17"></i>
                <span>{{article.type}}</span>
                <i title="点击数" class="iconfont icon-fire"></i>
                <span>{{article.click}}</span>
                <i title="时间" class="iconfont icon-ico_home_committed"></i>
                <span>{{article.time}}</span>
            </div>
            <p v-html="article.introduce"></p>
            <p v-html="article.content"></p>
        </div>
        <div class="comment">
            <div class="comment-tltie"><span>Comments</span></div>
            <div class="comment-input">
                <input type="text" v-model="text" placeholder="写下你的感想">
                <button @click="comment">评论</button>
                <div class="comment-logon" v-if="$store.state.loginstate">
                    <div><input v-model="userid" type="text" placeholder="用户名,没有自动创建"></div> 
                    <div><input v-model="password" type="password" placeholder="密码"></div>
                    <div><button @click="login">登录</button></div>
                </div>
            </div>
            <h2>&nbsp;&nbsp;最新</h2>
            <div class="comment-content">
                <div class="err" v-if="!commenttxt.length">没有评论！</div>
                <div class="comment-text" v-for="(itme,index) in commenttxt" :key="index">
                    <i class="iconfont icon-wo"></i>
                    
                    <span>{{itme.comment.userid}}：</span>
                    <p>{{itme.comment.comment}}</p>
                    <em>{{itme.comment.time}}</em>
                    
                    <div v-for="(itme,index) in itme.reply" :key="index">
                        <span>{{itme.userid}}：</span>
                        <p>{{itme.comment}}</p>
                        <em>{{itme.time}}</em>
                    </div>
                    <button @click="reply(itme.comment._id,index)">回复</button>
                    <input v-model="replytext[index]" type="text">
                    <samp></samp>
                </div>
            </div>
        </div>
        <pagetail></pagetail>
    </div>
</template>

<script>
import axios from 'axios'
import pagetail from '~/components/pagetail.vue'

export default {
    inject:['reload'],
    head(){
        return{
            title:this.article.title,
            meta:[
                { hid: 'description', name: 'description', content: 'My custom description' }
            ]
        }
    },
    data(){
        return{
            article:'',
            userid:'',
            password:'',
            text:'',
            commenttxt:'',
            replytext:[]
        }
    },
    created(){
        axios.post('http://39.108.13.166:3000/articlefindone',{
            _id:this.$route.params.id
        }).then((data)=>{
            this.article=data.data
        }).catch(()=>{
            this.reload()
        })
        axios.get('http://39.108.13.166:3000/commentarticleidfind',{
            params: {
                articleid:this.$route.params.id
            }
        }).then((data)=>{
            this.commenttxt=data.data;
        }).catch(()=>{
            this.reload()
        })
        axios.get('http://39.108.13.166:3000/articleclick',{
            params: {
                _id:this.$route.params.id
            }
        })
    },
    mounted() {
        if(this.$store.state.loginstate){
            if(window.sessionStorage.userid){
                this.$store.state.userid=sessionStorage.userid;
                this.$store.state.password=sessionStorage.password;
                this.$store.state.loginstate=false;
            }
        }
    },
    components:{
        pagetail
    },
    methods:{
        login(){
            this.userid=this.userid.replace(/\s/g,'');
            if(this.userid){
                axios.post('http://39.108.13.166:3000/user',{
                    userid:this.userid,
                    password:this.password
                }).then((data)=>{
                    if(data.data.state==1){
                        this.$store.state.userid=this.userid;
                        this.$store.state.password=this.password;
                        this.$store.state.loginstate=false;
                        sessionStorage.userid=this.userid;
                        sessionStorage.password=this.password;
                        sessionStorage.loginstate=false;
                    }else if(data.data==""){
                        this.$store.state.userid=this.userid;
                        this.$store.state.password=this.password;
                        this.$store.state.loginstate=false;
                        sessionStorage.userid=this.userid;
                        sessionStorage.password=this.password;
                        sessionStorage.loginstate=false;
                    }else if(data.data.state==0){
                        alert('密码错误！');
                    }
                }).catch(()=>{
                    this.reload()
                })
            }else{
                alert('用户名不能为空！')
            }
        },
        comment(){
            if(this.$store.state.loginstate==true){
                alert('请登录！');
            }else{
                this.text=this.text.replace(/\s/g,'');
                if(this.text){
                    axios.get('http://39.108.13.166:3000/commentadd',{
                        params: {
                            articleid:this.$route.params.id,
                            userid:this.$store.state.userid,
                            comment:this.text
                        }
                    }).then((data)=>{
                        this.$router.go(0) 
                    }).catch(()=>{
                        this.reload()
                    })
                }else{
                    alert('内容不能为空！');
                }
            }
        },
        reply(data,index){
            if(this.$store.state.userid){
                this.replytext[index]=this.replytext[index].replace(/\s/g,'');
                if(this.replytext[index]){
                    axios.get('http://39.108.13.166:3000/replyadd',{
                        params: {
                            userid:this.$store.state.userid,
                            commentid:data,
                            comment:this.replytext[index]
                        }
                    }).then((data)=>{
                        this.$router.go(0);
                    }).catch(()=>{
                        this.reload()
                    })
                }else{
                    alert('内容不能为空！')
                }
            }else{
                alert('请先登录！')
            }
            
        }
    }
}
</script>

<style>
.article-text{width: 100%;}
.article-text > h1{text-align: center;color: #555;font-weight: 400;padding: 20px 0;}
.article-iocn{text-align: center;}
.article-iocn i{font-size: 16px;color: #999;}
.article-iocn span{font-size: 14px;color:#999;margin-right: 20px;}
.article-text > p{margin: 10px 0;color: #555;word-wrap:break-word;line-height: 2em;}
.article-text li{margin-left: 30px;}
.content-h4{color:coral;}
.comment{width: 100%;margin-top: 50px;}
.comment-tltie{width: 100%;height: 30px;color: coral;padding: 2px 10px;font-size: 24px;}
.comment-input{width: 100%;height: 150px;margin-top: 20px;padding: 10px;box-sizing: border-box;padding-right: 100px;position: relative;}
.comment-input > button{padding: 5px 20px;display: block;border: 0; font-size: 16px;color: #fff;background-color:#409eff;text-align: center;line-height: 20px;border-radius: 4px;position: absolute;right: 6px;top: 10px;cursor: pointer;outline: none;}
.comment-input > button:hover{background-color:#5cadfd;}
.comment-input input{border:1px solid #DCDFE6;width: 100%;height: 30px;text-indent: 10px;border-radius: 4px;outline: none;color: #555;}
.comment-input input:hover{border: 1px solid #c0c0c0}
.comment-input input:focus{border:1px solid #409EFF;}
.comment > h2{color: coral;margin: 20px 0;font-weight: 400;font-size: 20px;text-align: left;}
.comment > h2::before{content: '';border: 3px solid #409EFF;border-top-right-radius: 4px;border-bottom-right-radius: 4px;}
.comment-text{width: 100%;padding: 10px 10px 10px 50px;box-sizing: border-box;position: relative;}
.comment-text i{position: absolute;top:8px;left: 10px;font-size: 24px;color: #777;}
.comment-text span{color: #409EFF;display: block;}
.comment-text p{color: #777;word-wrap: break-word;}
.comment-text button{float: right;}
.comment-text em{color: #999;display: block;font-size: 12px;text-align: right;}
.comment-text samp{border-bottom: 1px dashed #999;margin-top: 30px;display: block;}
.comment-logon{margin-top: 15px;}
.comment-logon input{width: 60%;margin-bottom: 2px;}
.comment-text button,.comment-logon button{background-color: transparent;color: blueviolet;border: 0;outline: 0;cursor: pointer;}
.comment-text input{text-indent: 5px;border: 1px solid #DCDFE6;color: #777; float: right;margin-right: 10px;border-radius: 4px;display: none;}
.comment-text:hover input{display: block;}
.hljs{background-color: #222;padding: 10px;color: #eee;margin: 10px 0;border-radius: 4px;}
.hljs-keyword{color: #3d9dfd}
.hljs-number{color:#fdd9ad}
.hljs-string{color:orangered;}
.hljs-comment{color: mediumseagreen}
.hljs-built_in{color: lime}
table{border-collapse: collapse;border:1px solid #999;}
table tr{border:1px solid #999;}
td,th{padding: 10px;border-right: 1px solid #999;}
</style>
