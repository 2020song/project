<template>
    <div>
        <van-nav-bar fixed @click-left="$router.back()" title="小区/村组(129)" left-text="返回" left-arrow @click-right="add">
            <template #right>
                <van-icon name="plus" size="18" />
            </template>
        </van-nav-bar>




       <van-swipe :autoplay="3000">
             <van-swipe-item v-for="(image, index) in images" :key="index">
               <img v-lazy="image" />
             </van-swipe-item>
        </van-swipe>


        <van-tabs v-model="activetitle" color="#00FF7F">
              <van-tab  title="我要学习">我要学习</van-tab>
              <van-tab  title="我要答题">我要答题</van-tab>
              <van-tab  title="排行榜">排行榜</van-tab>
        </van-tabs>




        <div class="search" v-show="filterShow">
            <van-cell-group>
                <van-cell v-if="active == 1">
                    <template #title>
                        <van-tag style="margin-right:1rem;" round color="#c73e3a" @click="chooseKind(item.value)" v-for="item in kindList" :key="item.value" size="large" :plain="!search.kind.includes(item.value)">{{item.name}}</van-tag>
                    </template>
                </van-cell>
                <van-cell v-if="active == 0">
                    <template #title>
                        <van-tag style="margin-right:1rem;" round color="#c73e3a" @click="chooseType(item.value)" v-for="item in typeList" :key="item.value" size="large" :plain="!search.type.includes(item.value)">{{item.name}}</van-tag>
                    </template>
                </van-cell>
                <van-cell>
                    <template #title>
                        <van-tag style="margin-right:1rem;" round color="#c73e3a" @click="choosePeople(item.value)" v-for="item in peopleList" :key="item.value" size="large" :plain="!search.people.includes(item.value)">{{item.name}}</van-tag>
                    </template>
                </van-cell>
            </van-cell-group>
            <van-button color="#c73e3a" hairline block @click="filterShow = !filterShow">搜索</van-button>
        </div>

        <van-tabs @change="getList" v-model="active" type="card" animated swipeable>
            <van-tab title="房屋">
                <van-pull-refresh
                    v-model="isLoading"
                    success-text="刷新成功"
                    @refresh="getList"
                    >
                        <div class="content">
                            <van-cell is-link to="/house/houseList" v-for="item in list" :key="item.title">
                                <template #title>
                                    <p style="font-size:14px;color:#333">
                                        {{item.title}} 
                                        <van-tag type="danger" v-if="item.tag.includes(0)" style="margin-left:0.3rem">重点人员</van-tag>
                                    </p>
                                    <p>楼栋数量：{{item.num}} 人口数量：{{item.people}}</p>
                                    <p>
                                        <van-tag type="primary" v-for="ele in item.tag" :key="ele">{{houseTags[ele]}}</van-tag>
                                    </p>
                                </template>
                            </van-cell>
                        </div>
                </van-pull-refresh>
            </van-tab>
            <van-tab title="人员">
                <van-pull-refresh
                    v-model="isLoading"
                    success-text="刷新成功"
                    @refresh="getList"
                    >
                        <div class="content">
                            <van-cell is-link to="/house/detailUser" v-for="item in list" :key="item.title">
                                <template #title>
                                    <img :src="item.avatar" class="avatar" alt="">
                                    <div>
                                        <p style="font-size:14px;color:#333">
                                            {{item.title}} 
                                            <van-tag type="danger" v-if="item.tag.includes(0)" style="margin-left:0.3rem">重点人员</van-tag>
                                        </p>
                                        <p>
                                            <van-icon name="phone-o" />
                                            {{item.phone}}
                                        </p>
                                        <p>
                                            <van-icon name="idcard" />
                                            {{item.idcard}}
                                        </p>
                                        <p>
                                            <van-icon name="location-o" />
                                            {{item.address}}
                                        </p>
                                        <p>
                                            <van-tag type="primary" v-for="ele in item.tag" :key="ele">{{peopleTags[ele]}}</van-tag>
                                        </p>
                                    </div>
                                </template>
                            </van-cell>
                        </div>
                </van-pull-refresh>
            </van-tab>
        </van-tabs>
        

        <van-overlay :show="filterShow" @click="filterShow = false" />



        <van-tabbar v-model="active" @change="switchover">
             <van-tabbar-item badge="3" v-for="item in tabbar" :key="item.title">
                     <span>{{item.title}}</span>
                    <template #icon="">
                      <img :src="item.img" />
                    </template>
             </van-tabbar-item>
        </van-tabbar>




    </div>
</template>

<script>
import { Lazyload } from 'vant';
    export default {
        data() {
            return {
                active:0,
                activetitle:0,
                tabbar :[
                {title:'发现',img:'https://img01.yzcdn.cn/vant/cat.jpeg'},
                {title:'课程列表',img:'https://img01.yzcdn.cn/vant/cat.jpeg'},
                {title:'个人中心',img:'https://img01.yzcdn.cn/vant/cat.jpeg'}
                ],

                images: [
                   'https://img01.yzcdn.cn/vant/apple-1.jpg',
                   'https://img01.yzcdn.cn/vant/cat.jpeg',
                ],





                searchKey: "",
                list:[],
                houseTags:["重点人员","自用","仓储","出租","闲置"],
                peopleTags:["重点人员","租住","同住","代管人"],
                isLoading: false,
                filterShow:false,
                search:{
                    type:[1,2,4],
                    kind:[1,2],
                    people:[0]
                },
                kindList:[{
                    name:"全部",
                    value:0
                },{
                    name:"租住",
                    value:1
                },{
                    name:"同住",
                    value:2
                },{
                    name:"代管人",
                    value:3
                }],
                typeList:[{
                    name:"全部",
                    value:0
                },{
                    name:"自用",
                    value:1
                },{
                    name:"仓储",
                    value:2
                },{
                    name:"出租",
                    value:3
                },{
                    name:"闲置",
                    value:4
                },{
                    name:"网约",
                    value:5
                }],
                peopleList:[{
                    name:"全部",
                    value:0
                },{
                    name:"重点人员",
                    value:1
                },{
                    name:"非重点人员",
                    value:2
                }]
            }
        },
        methods: {

            //切换tab跳转对应页面
            switchover(id){
                    // console.log(id);
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



</style>