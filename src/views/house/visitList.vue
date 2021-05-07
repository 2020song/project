<template>
    <div>
        <van-nav-bar fixed @click-left="$router.back()" title="走访列表" left-text="返回" left-arrow>
            <template #right>
                <van-icon name="plus" @click="add" size="18" />
            </template>
        </van-nav-bar>

        <van-search @input="getList" v-model="searchKey" placeholder="请输入关键字查询" />

        <van-pull-refresh
                    v-model="isLoading"
                    success-text="刷新成功"
                    @refresh="getList"
                    >
                    <div class="content">
                        <van-cell is-link to="/house/detailVisit" v-for="(item,index) in list" :key="index">
                            <template #title>
                                <img :src="item.avatar" class="avatar" alt="">
                                <div>
                                    <p style="font-size:14px;color:#333">
                                        {{item.title}}
                                    </p>
                                    <p>
                                        {{item.type}}
                                    </p>
                                    <p>
                                        走访时间：{{item.time}}
                                    </p>
                                </div>
                            </template>
                        </van-cell>
                    </div>
        </van-pull-refresh>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isLoading:false,
                searchKey: "",
                list:[]
            }
        },
        methods: {
            getList() {
                this.list = [{
                    avatar:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3111700633,1206484463&fm=26&gp=0.jpg",
                    title:"特殊人群家庭",
                    type:"肇事肇祸精神病患者",
                    time:"2020-10-10 11:24:30"
                },{
                    avatar:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3111700633,1206484463&fm=26&gp=0.jpg",
                    title:"特殊人群家庭",
                    type:"肇事肇祸精神病患者",
                    time:"2020-10-10 11:24:30"
                },{
                    avatar:"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3111700633,1206484463&fm=26&gp=0.jpg",
                    title:"特殊人群家庭",
                    type:"肇事肇祸精神病患者",
                    time:"2020-10-10 11:24:30"
                }]
                this.isLoading = false
            },
            add(){
                this.$router.push({
                    path:"/house/formVisit"
                })
            }
        },
        mounted () {
            this.getList();
        },
    }
</script>

<style lang="scss" scoped>
.van-search{
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 2;
    width: 100%;
    border-bottom: 1px solid #eee;
}

.avatar{
    width: 3.75rem;
    height: 4.5rem;
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
    line-height: 4.5rem;
}
.van-pull-refresh{
    margin-top: 101px;
}
</style>