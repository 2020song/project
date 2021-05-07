<template>
    <div>
        <van-nav-bar fixed @click-left="$router.back()" title="房屋(12)" left-text="返回" left-arrow />

        <p class="example">
            <span class="type1"><van-icon name="wap-home" />自用</span>
            <span class="type2"><van-icon name="wap-home" />仓储</span>
            <span class="type3"><van-icon name="wap-home" />出租</span>
            <span class="type4"><van-icon name="wap-home" />闲置</span>
            <span class="type5"><van-icon name="wap-home" />网约</span>
        </p>

        <div class="content">
            <div class="item" v-for="(item,index) in houseList" :key="index">
                <div class="ceng">
                    {{houseList.length - index}}层
                </div>
                <div class="room" v-for="ele in item" :key="ele.num" @click="toRoom">
                    <p :class="'type' + ele.type"><van-icon name="wap-home" /></p>
                    <p :class="'type' + ele.type">{{ele.num}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                houseList: [
                    [
                        {num:"301",type:1},
                        {num:"302",type:4},
                        {num:"303",type:3}
                    ],
                    [
                        {num:"201",type:2},
                        {num:"202",type:5},
                        {num:"203",type:1}
                    ],
                    [
                        {num:"101",type:5},
                        {num:"102",type:1},
                        {num:"103",type:3},
                        {num:"104",type:4}
                    ],
                ]
            }
        },
        methods: {
            toRoom() {
                this.$router.push({
                    path:"/house/detailRoom"
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.type1{
    color: #409EFF;
}
.type2{
    color: #E6A23C;
}
.type3{
    color: #F56C6C;
}
.type4{
    color: #67C23A;
}
.type5{
    color: #303133;
}

.example{
    margin: 46px 0 0;
    padding: 0 1rem;
    span{
        display: inline-block;
        margin-right: 1rem;
        i{
            margin-right: 2px;
            line-height: 1.5rem;
            top:2px;
        }
    }
}

.content {
    padding: 0 1rem;
    margin-top: 2rem;
    .item{
        padding: 1rem 0;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        .ceng{
            float: left;
            color: #fff;
            width: 1.2rem;
            text-align: center;
            line-height: 20px;  
            font-size: 14px;
            word-wrap: break-word;/*英文的时候需要加上这句，自动换行*/ 
            background-color: #c73e3a;
            margin-right: 2rem;
        }
        .room{
            float: left;
            margin-right: 1.5rem;
            p{
                margin: 0;
                text-align: center;
                &:first-child{
                    font-size: 24px;
                    line-height: 18px;
                }
                &:last-child{
                    line-height: 18px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>