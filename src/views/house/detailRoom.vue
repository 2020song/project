<template>
    <div>
        <van-nav-bar fixed @click-left="$router.back()" title="实有房屋登记" left-text="返回" left-arrow />

        <van-tabs v-model="active" animated>
            <van-tab title="房屋信息">
                <van-cell-group>
                    <van-cell required title="房号" v-model="form.houseId" />
                    <van-cell required title="单元号" v-model="form.unit" />
                    <van-cell required title="楼层" v-model="form.floor" />
                    <van-cell required title="房屋用途" v-model="form.type" />
                    <van-cell required title="是否代管" v-model="form.replace" />
                    <van-cell title="照片" value="共3张" :border="false" />
                    <van-cell title="" value="">
                        <template #extra>
                            <van-image
                                v-for="(item,index) in photo"
                                :key="item"
                                @click="look(index)"
                                width="5rem"
                                height="5rem"
                                fit="contain"
                                :src="item"
                                style="margin-left:1rem"
                            />
                        </template>
                    </van-cell>
                </van-cell-group>
                <van-button class="btn" color="#c73e3a" @click="toEdit" block>编辑</van-button>
            </van-tab>
            <van-tab title="人员信息">
                <van-swipe-cell v-for="item in list" :key="item.title">
                    <van-cell is-link to="/house/detailUser">
                        <template #title>
                            <img :src="item.avatar" class="avatar" alt="">
                            <div>
                                <p style="font-size:14px;color:#333">
                                    {{item.title}} 
                                    <van-tag type="danger" v-if="item.tag.includes(0)" style="margin-left:0.3rem">重点人员</van-tag>
                                    <van-tag type="success" v-if="item.visit > 0" style="margin-left:0.3rem">走访{{item.visit}}次</van-tag>
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
                    <template #right>
                        <van-button class="out" square color="#c73e3a" @click="out" text="退住" />
                    </template>
                </van-swipe-cell>

                <van-button class="btn" color="#c73e3a" @click="addUser" block>添加人员</van-button>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { ImagePreview,Dialog  } from 'vant';

    export default {
        data() {
            return {
                active: 0,
                list:[],
                peopleTags:["重点人员","租住","同住","代管人"],
                form:{
                    houseId: 1,
                    unit:3,
                    floor:2,
                    type:"自用",
                    replace:"是"
                },
                photo:[
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg',
                    'https://img.yzcdn.cn/vant/apple-3.jpg'
                ]
            }
        },
        mounted () {
            this.getList();
        },
        methods: {
            out(){
                Dialog.confirm({
                    title: '退住',
                    message: '确认将该人员退住吗',
                })
                .then(() => {
                    
                }).catch(() => {});
            },
            look(index){
                ImagePreview({
                    images:this.photo,
                    startPosition:index
                });
            },
            toEdit(){
                this.$router.push({
                    path:"/house/formRoom",
                    query:{
                        type:Math.round(Math.random())
                    }
                })
            },
            getList() {
                this.list = [{
                    avatar:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3111700633,1206484463&fm=26&gp=0.jpg",
                    title:"张三一",
                    phone:"15077041598",
                    idcard:"360425*****7015",
                    address:"长岗乡启光村新兴组1号101室",
                    visit:2,
                    tag:[0,2]
                },{
                    avatar:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602852020895&di=9728799814914aa335aeba95e25b6b86&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F94o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Ff11f3a292df5e0fea1aee17a5f6034a85edf7212.jpg",
                    title:"张三二",
                    phone:"15077041598",
                    idcard:"360425*****7015",
                    address:"长岗乡启光村新兴组1号101室",
                    visit:5,
                    tag:[1]
                },{
                    avatar:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602852020896&di=562e9694a0c32d5e7286c6baef738363&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F455a0affc3cdc1cd5eef6d85e5d74376bf36e3787f3a7-17X1qT_fw658",
                    title:"张三三",
                    phone:"15077041598",
                    idcard:"360425*****7015",
                    address:"长岗乡启光村新兴组1号101室",
                    visit:1,
                    tag:[0,3]
                }]
            },
            addUser(){
                this.$router.push({
                    path:"/house/formUser",
                    query:{
                        address:"长岗乡启光村新兴组1号楼202",
                        isReplace:1
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.van-tabs{
    margin-top: 46px;
}

.avatar{
    width: 6rem;
    height: 7.5rem;
    display: block;
    float: left;
    margin-right: 1rem;
}
.van-cell__title p{
    margin:0;
    line-height: 1.5rem;
    font-size:12px;
    color: #999;
}

.van-cell__right-icon{
    line-height: 7.5rem;
}

.van-tag{
    margin-right: 0.5rem;
}

.btn{
    width: 50%;
    margin: 2rem auto 0;
}

.out{
    height: 100%;
}
</style>