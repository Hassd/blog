<template>
    <div class="content">
        <h1>博文类型</h1>
        <div class="err" v-if="!typedata">没有文章！</div>
        <div class="type" >
            <nuxt-link v-for="(itme,index) in typedata" :key="index" :to="{name:'specific',params:{title:'',typename:itme.typename}}">{{itme.typename}}</nuxt-link>
        </div>
        <pagetail></pagetail>
    </div>
</template>

<script>
import axios from 'axios'
import pagetail from '~/components/pagetail.vue'
export default {
    inject:['reload'],
    data(){
        return{
            typedata:''
        }
    },
    mounted() {
        axios.get('http://39.108.13.166:3000/typeallfind')
        .then((data)=>{
            this.typedata=data.data;
        }).catch(()=>{
            this.reload()
        })
    },
    components: {
        pagetail
    }
}
</script>

<style>
.type{
    width: 100%;
    padding: 20px 0;
}
.type::after{
    content: '';
    display: block;
    clear: both;
    height: 0;
}
.type a{
    color: #555;
    display: block;
    float: left;
    padding: 5px 20px;
    border: 1px solid #DCDFE6;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 4px;
}
.type a:hover{
    background-color: #DCDFE6;
    color:#333;
}
</style>
