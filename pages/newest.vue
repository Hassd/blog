<template>
    <div class="content">
      <h1>最新博文</h1>
      <div class="err" v-if="!block.length">没有文章！</div>
      <div v-for="(itme,index) in block" :key="index">
          <block :block="itme"></block>
      </div>
      <pagingion v-if="block.length" @change="zxc" :edata="numtext"></pagingion>
      <pagetail></pagetail>
    </div>
</template>

<script>
import axios from 'axios'
import block from '~/components/block.vue'
import pagetail from '~/components/pagetail.vue'
import pagingion from '~/components/pagingion.vue'
export default {
  inject:['reload'],
  data(){
    return{
      block:'',
      num:0,
      numtext:0

    }
  },
  mounted() {
    axios.get('http://39.108.13.166:3000/qianarticleallnum',{
      params:{
        typeclass:''
      }
    }).then((data)=>{
      if(data.data%10){
        this.numtext=parseInt(data.data/10)+1;
      }else{
        this.numtext=parseInt(data.data/10);
      }
    }).catch(()=>{
      this.reload()
    })
    axios.post('http://39.108.13.166:3000/qianarticleallskip',{
      num:0,
      typeclass:''
    }).then((data)=>{
      this.block=data.data
    }).catch(()=>{
      this.reload()
    })
  }, 
  components: {
    block,
    pagetail,
    pagingion
  },
  methods:{
    zxc(data){
      axios.post('http://39.108.13.166:3000/qianarticleallskip',{
        num:data,
        typeclass:''
      })
      .then((data)=>{
        this.block=data.data
      }).catch(()=>{
        this.reload()
      })
    }
  }
  
}
</script>

