<template>
    <div class="content">
        <h1>搜索文章</h1>
        <div class="search">
            <div>
                <input type="text" v-model="searchdata" @keyup.enter="search" placeholder="要搜索的标题">
                <button @click="search"><i class="iconfont icon-sousuo"></i></button>
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
            searchdata:''
        }
    },
    components: {
        pagetail
    },
    methods:{
        search(){
            if(this.searchdata){
                this.$router.push({name:'specific',params:{title:this.searchdata,typename:''}});
            }else{
                alert("内容不能为空！")
            }
        }
    }
}
</script>

<style>
.search{
    width: 100%;
    height:400px;
}
.search div{
    height: 40px;
    border: 1px solid #C0C4CC;
    width: 350px;
    margin: 50px auto;
    border-radius: 4px;
}
.search input{
    width: 300px; 
    border: 0;
    outline: 0;
    float: left;
    height: 40px;
    font-size: 18px;
    text-indent: 10px;
    color: #777;
}
.search div:hover{
    border: 1px solid #999;
}
.search button{
    display: block;
    float: left;
    width: 50px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 0;
    outline: none;
    cursor: pointer;
    background-color: transparent;
}
.search i{
    font-size: 28px;
    color: #555;
}
</style>
