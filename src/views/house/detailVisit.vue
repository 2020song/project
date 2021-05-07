<template>
    <div>
        <van-nav-bar fixed @click-left="$router.back()" title="走访记录" left-text="返回" right-text="编辑"  left-arrow @click-right="edit" />

        <van-cell-group>
                <van-cell required title="走访类型" :value="form.type" />
                <van-cell required title="走访分类" :value="form.visitType" />
                <van-cell required title="子分类" :value="form.childrenType" />
                <van-cell v-for="(item,index) in form.textList" :key="index" :title="item.name" :label="item.value" />
                <van-cell title="备注" :label="form.remark" />
                <van-cell title="图片信息">
                    <template #label>
                        <van-image @click="look(index)" style="margin-right:0.3rem;" v-for="(item,index) in images" :key="index" width="5rem" height="5rem" fit="contain" :src="item" />
                    </template>
                </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import { ImagePreview  } from 'vant';

    export default {
        data() {
            return {
                form:{
                    type:"百万警进千万家",
                    visitType:"特殊人群家庭",
                    childrenType:"矛盾纠纷当事人",
                    textList:[{
                        name:"存在的困难/反映的诉求",
                        value:"车子被隔壁小孩划花"
                    },{
                        name:"帮教管控措施",
                        value:"对小孩及监护人进行批评教育，赔偿当事人损失"
                    }],
                    remark:"双方最终和解"
                },
                images:[
                    "https://img.yzcdn.cn/vant/cat.jpeg",
                    "https://img.yzcdn.cn/vant/cat.jpeg",
                    "https://img.yzcdn.cn/vant/cat.jpeg"
                ]
            }
        },
        methods: {
            edit() {
                this.$router.push({
                    path:"/house/formVisit"
                })
            },
            look(index){
                ImagePreview({
                    images:this.images,
                    startPosition:index
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
.van-cell-group{
    padding-top: 46px;
}
</style>