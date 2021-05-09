<template>
    <div class="content-view">
        <div class="my-content">
            <div><img src="https://img01.yzcdn.cn/vant/apple-1.jpg" alt=""></div>
            <div>积分:1000分</div>
            <div>排名:33名</div>
        </div>
        <div class="list-content">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
            <van-cell v-for="item in list" :key="item" :title="item" />
            </van-list>    
        </div>
    </div>
</template>

<script>
export default {
     data() {
        return {
            list: [],
            loading: false,
            finished: false,
        };
    },
    methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
            }

            // 加载状态结束
            this.loading = false;

            // 数据全部加载完成
            if (this.list.length >= 40) {
            this.finished = true;
            }
        }, 1000);
        },
    }
}
</script>

<style lang="css" scoped>
    .my-content{
        display: flex;
        align-items: center;
        padding: 15px;
    }
    .my-content>:nth-child(1){
        height: 35px;
        width: 35px;
        margin-right: 30px;
    }
    .my-content>:nth-child(2){ 
        margin-right: 30px;
        font-family: '宋体';
        font-weight: bold;
    }
    .my-content>:nth-child(3){ 
        font-family: '宋体';
        font-weight: bold;
    }
    .my-content>div>img{
        width: 100%;
        height: 100%;
        border-radius: 100%;
    }
    .list-content{
        height: 328px;
        overflow: scroll;
    }
</style>