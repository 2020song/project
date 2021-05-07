<template>
    <div>
        <van-nav-bar fixed @click-left="$router.back()" title="实有人员登记" left-text="返回" right-text="编辑"  left-arrow @click-right="edit" />

        <div class="content">
            
            <van-cell-group>
                <van-cell required title="姓名" :value="form.name" />
                <van-cell required title="手机" :value="form.phone" />
                <van-cell required title="身份证" :value="form.idcard" />
                <van-cell required title="性别" :value="form.sex" />
                <van-cell required title="民族" :value="form.nation" />
                <van-cell required title="户籍住址" :value="form.address" />
                <van-cell required title="现住址" :value="form.nowAddress" />
                <van-cell required title="人口类型" :value="form.type" />
                <van-cell required title="常住/流动" :value="form.flow" />
                <van-cell required title="与户主关系" :value="form.relation" />
                <van-cell title="租住日期起" :value="form.rentStartTime" />
                <van-cell title="租住日期止" :value="form.rentEndTime" />
                <van-cell required title="重点人员" :value="form.follow" />
                <van-cell required title="类型" :value="form.followType" />
                <van-cell title="建档日期" :value="form.archivesStartTime" />
                <van-cell title="撤档日期" :value="form.archivesEndTime" />
                <van-cell title="法律文书/诊断证明">
                    <template #label>
                        <van-image @click="look(index,followPhoto)" style="margin-right:0.3rem;" v-for="(item,index) in followPhoto" :key="index" width="5rem" height="5rem" fit="contain" :src="item" />
                    </template>
                </van-cell>
                <van-cell title="本人正面照">
                    <template #label>
                        <van-image @click="look(index,face)" style="margin-right:0.3rem;" v-for="(item,index) in face" :key="index" width="5rem" height="5rem" fit="contain" :src="item" />
                    </template>
                </van-cell>
                <van-cell title="手持证件照">
                    <template #label>
                        <van-image @click="look(index,hand)" style="margin-right:0.3rem;" v-for="(item,index) in hand" :key="index" width="5rem" height="5rem" fit="contain" :src="item" />
                    </template>
                </van-cell>
                <van-cell title="身份证正面照">
                    <template #label>
                        <van-image @click="look(index,cardFace)" style="margin-right:0.3rem;" v-for="(item,index) in cardFace" :key="index" width="5rem" height="5rem" fit="contain" :src="item" />
                    </template>
                </van-cell>
                <van-cell title="备注" :label="form.remark"/>
            </van-cell-group>

            <div class="btnBox">
                <van-button class="btns" color="#c73e3a" block @click="visit">走访</van-button>
                <van-button class="btns" color="#c73e3a" block @click="toRoomList">查看同住</van-button>
                <van-button class="btns" color="#c73e3a" block @click="out">退住</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { ImagePreview,Dialog  } from 'vant';

    export default {
        data() {
            return {
                isSameAddress:true,
                form:{
                    name:"张三",
                    phone:"18312341234",
                    idcard:"360103191212121234",
                    sex:"男",
                    nation:"汉",
                    address:"江西省永修县南山村",
                    nowAddress:"江西省永修县南山村",
                    type:"租住",
                    flow:"常住",
                    relation:"子女",
                    rentStartTime:"2020-10-14",
                    rentEndTime:"2020-10-14",
                    follow:"是",
                    followType:"涉恐",
                    remark:"艾佛我安慰法开网吧发发王洪安文化服务哦啊方"
                },
                followPhoto:[
                    "https://img.yzcdn.cn/vant/cat.jpeg",
                    "https://img.yzcdn.cn/vant/cat.jpeg",
                    "https://img.yzcdn.cn/vant/cat.jpeg",
                    "https://img.yzcdn.cn/vant/cat.jpeg",
                    "https://img.yzcdn.cn/vant/cat.jpeg",
                ],
                face:[
                    "https://img.yzcdn.cn/vant/cat.jpeg"
                ],
                hand:[
                    "https://img.yzcdn.cn/vant/cat.jpeg"
                ],
                cardFace:[
                    "https://img.yzcdn.cn/vant/cat.jpeg"
                ]
            }
        },
        methods: {
            toRoomList(){
                this.$router.push({
                    path:"/house/roomList"
                })
            },
            visit(){
                this.$router.push({
                    path:"/house/visitList"
                })
            },
            look(index,images){
                ImagePreview({
                    images:images,
                    startPosition:index
                });
            },
            out(){
                Dialog.confirm({
                    title: '退住',
                    message: '确认将该人员退住吗',
                })
                .then(() => {
                    
                }).catch(() => {});
            },
            edit() {
                this.$router.push({
                    path:"/house/formUser"
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.content{
    overflow-y:scroll;
    height: calc(100% - 46px);
}
.content{
    padding-top: 46px;
}
.btnBox{
    display: flex;
    width: calc(100% - 2rem);
    margin-left: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    justify-content : space-between;
    .btns{
        max-width: 28%;
    }
}
</style>