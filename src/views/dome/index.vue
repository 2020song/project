<template>
    <div>
        <van-swipe :autoplay="3000" lazy-render >
            <van-swipe-item v-for="image in images" :key="image">
                <img :src="image" />
            </van-swipe-item>
        </van-swipe>


    

        <van-tabs  lazy-render v-model="activetitle" color="#00FF7F">
              <van-tab  title="我要学习啊">
                <div class="my-study-view" v-for="(item,index) in 3" :key="index">  
                    <div class="study-view-title">
                        <div>第一讲 关于党的近百年历史的几个问题（中）</div>
                        <div>
                            <span>现代教育报</span>
                            <span>2021-04-26</span>
                        </div>
                    </div>
                    <div class="my-study-img">
                        <img src="https://img01.yzcdn.cn/vant/apple-1.jpg" alt="">
                    </div>
                </div>
              </van-tab>

              <van-tab  title="我要答题">
                    <div class="answer-view">
                        <div v-for="(item,index) in 3" :key="index" class="answer-view-item">
                            <div class="answer-view-item-img"><img src="https://img01.yzcdn.cn/vant/apple-1.jpg" alt=""></div>
                            <div>每日答题</div>
                            <div>太阳每天都是新的</div>
                        </div>
                    </div>
              </van-tab>

              <van-tab  title="排行榜" class="my-van-flex">
                    <van-sidebar v-model="activeKey">
                        <van-sidebar-item title="积分" /> 
                        <van-sidebar-item title="学时" /> 
                        <van-sidebar-item title="课程" />
                    </van-sidebar>
                    <div class="sidebar-view-content" v-show="activeKey == 0">
                        <MyLiist></MyLiist>
                    </div>
                    <div class="sidebar-view-content" v-show="activeKey == 1">
                        每日答题
                    </div>
                    <div class="sidebar-view-content" v-show="activeKey == 2">
                        太阳每天都是新的
                    </div>
              </van-tab>
        </van-tabs>
        

        <van-tabbar v-model="active" @change="switchover">
             <van-tabbar-item  v-for="item in tabbar" :key="item.title">
                     <span>{{item.title}}</span>
                    <template #icon="props">
                      <img :src="props.active ? item.activeImg: item.inactiveimg" />
                    </template>
             </van-tabbar-item>
        </van-tabbar>


    </div>
</template>

<script>
import { Lazyload } from 'vant';
import MyLiist from './compontents/list';
    export default {
        data() {
            return {
                activeKey:0,
                active:0,
                activetitle:0,

                tabbar :[
                    {title:'发现',activeImg:'https://img01.yzcdn.cn/vant/user-active.png',inactiveimg:'https://img01.yzcdn.cn/vant/user-inactive.png'},
                    {title:'课程列表',activeImg:'https://img01.yzcdn.cn/vant/user-active.png',inactiveimg:'https://img01.yzcdn.cn/vant/user-inactive.png'},
                    {title:'个人中心',activeImg:'https://img01.yzcdn.cn/vant/user-active.png',inactiveimg:'https://img01.yzcdn.cn/vant/user-inactive.png'}
                ],
                images: [
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg',
                ]
            }
        },
        components:{
            MyLiist
        },
        methods: {

            //切换tab跳转对应页面
            switchover(id){
                    
            },


            getList() {
                if(this.active == 0){
                    this.list = [{
                        title:"长岗乡启光村新兴组",
                        num:1,
                        people:5,
                        tag:[0,2]
                    },{
                        title:"长岗乡永丰村星光组",
                        num:1,
                        people:5,
                        tag:[2]
                    },{
                        title:"新力合园",
                        num:1,
                        people:5,
                        tag:[3,4]
                    }]
                    this.isLoading = false
                }else{
                    this.list = [{
                        avatar:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3111700633,1206484463&fm=26&gp=0.jpg",
                        title:"张三",
                        phone:"15077041598",
                        idcard:"360425*****7015",
                        address:"长岗乡启光村新兴组1号101室",
                        tag:[0,2]
                    },{
                        avatar:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602852020895&di=9728799814914aa335aeba95e25b6b86&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F94o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Ff11f3a292df5e0fea1aee17a5f6034a85edf7212.jpg",
                        title:"张三",
                        phone:"15077041598",
                        idcard:"360425*****7015",
                        address:"长岗乡启光村新兴组1号101室",
                        tag:[1]
                    },{
                        avatar:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602852020896&di=562e9694a0c32d5e7286c6baef738363&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F455a0affc3cdc1cd5eef6d85e5d74376bf36e3787f3a7-17X1qT_fw658",
                        title:"张三",
                        phone:"15077041598",
                        idcard:"360425*****7015",
                        address:"长岗乡启光村新兴组1号101室",
                        tag:[0,3]
                    }]
                    this.isLoading = false
                }
            },
            chooseType(value){
                if(value == 0){
                    this.search.type = [0]
                }else{
                    let index = this.search.type.findIndex(item =>item == value)
                    let _index = this.search.type.findIndex(item =>item == 0)
                    if(_index != -1){
                        this.search.type.splice(_index,1)
                    }
                    if(index != -1){
                        this.search.type.splice(index,1)
                    }else{
                        this.search.type.push(value)
                    }
                }
            },
            chooseKind(value){
                if(value == 0){
                    this.search.kind = [0]
                }else{
                    let index = this.search.kind.findIndex(item =>item == value)
                    let _index = this.search.kind.findIndex(item =>item == 0)
                    if(_index != -1){
                        this.search.kind.splice(_index,1)
                    }
                    if(index != -1){
                        this.search.kind.splice(index,1)
                    }else{
                        this.search.kind.push(value)
                    }
                }
            },
            choosePeople(value){
                this.search.people = [value]
            },
            add(){
                this.$router.push({
                    path:"/house/formUser",
                    query:{
                        from:"createUser"
                    }
                })
            }
        },
        mounted () {
            this.getList();
        },
    }
</script>

<style lang="css" scoped>



 .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .van-swipe-item>img{
      width: 100%;
      height: 100%;
  }

  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }

   .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }

  

  .van-swipe{
      height: 200px;
      margin-top:3rem;
  }

  .my-study-view {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding:12px;
  }

    .study-view-title{
        flex: 2;
    }
    .study-view-title>:nth-child(1){
        font-size: 18px;
        color: #000;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .study-view-title>:nth-child(2){
        font-size: 14px;
        color: rgb(128, 128, 128);
        display: flex;
        align-items: center;
        margin-top: 10px;
    }
    .study-view-title>:nth-child(2)>:nth-child(1){
        margin-right: 10px;
    }
    .my-study-img{
        flex: 1;
    }
    .my-study-img>img{
        width: 100%;
        height: 100%;
    }
    .answer-view{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
        background: #f5f5f5;
        margin:24px 12px;
    }
    .answer-view-item{
        background: #fff;
        text-align: center;
        width: 32%;
        border-radius: 10px;
        box-shadow: 1px 1px 9px #a7a4a4;
    }
    .answer-view-item>:nth-child(2){
        font-weight: bold;
    }
    .answer-view-item>:nth-child(3){
        padding: 10px 14px ;
        font-size: 13px;
        color: gray;
    }
    .answer-view-item-img{
        height: 50px;
        width: 50px;
        padding: 19px 0 15px;
        margin: 0 auto;
    }
    .answer-view-item-img>img{
        width: 100%;
        height: 100%;
         border-radius: 100%;
    }

    .van-sidebar-item--select::before{
        left: 95%;
        background-color: #07c160;
    }
    .van-sidebar-item{
        text-align: center;
    }
   .my-van-flex{
       display: flex;
   }
   .sidebar-view-content{
       width: calc(100% - 80px);
   }
</style>