<template>
    <div>
        <van-nav-bar fixed @click-left="$router.back()" title="实有楼栋登记" left-text="返回" right-text="编辑"  left-arrow @click-right="edit" />

        <van-cell-group>
            <van-cell required title="楼栋号" v-model="form.houseId" />
            <van-cell required title="类别" v-model="form.type" />
            <van-cell required title="性质" v-model="form.character" />
            <van-cell title="经纬度" v-model="form.address" />
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

        <div class="btns">
            <van-button class="view" color="#c73e3a" @click="toRoomList" block>查看房屋列表</van-button>
            <van-button class="view" color="#c73e3a" @click="toView" block>空间示意图</van-button>
        </div>
    </div>
</template>

<script>
import { ImagePreview } from 'vant';

    export default {
        data() {
            return {
                form:{
                    houseId: 1,
                    type:"自建房",
                    character:"固有房产",
                    address:"116.39,39.9"
                },
                photo:[
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg',
                    'https://img.yzcdn.cn/vant/apple-3.jpg'
                ]
            }
        },
        methods: {
            edit() {
                this.$router.push({
                    path:"/house/formHouse"
                })
            },
            toView(){
                this.$router.push({
                    path:"/house/houseView"
                })
            },
            look(index){
                ImagePreview({
                    images:this.photo,
                    startPosition:index
                });
            },
            toRoomList(){
                this.$router.push({
                    path:"/house/roomList"
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
.van-cell-group{
    padding-top: 46px;
}
.btns{
    margin-top: 1rem;
    padding: 0 1rem;
    width: calc(100% - 2rem);
    overflow: hidden;
    .van-button{
        width: calc(50% - 1rem);
        float: left;
        &:first-child{
            margin-right: 2rem;
        }
    }
}
</style>