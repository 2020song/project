<template>
    <div>
        <van-nav-bar fixed @click-left="$router.back()" title="实有人员登记" left-text="返回" right-text="保存" left-arrow />

        <van-form validate-first :show-error="false" validate-trigger="onChange">
            <van-field
                readonly
                required
                is-link
                clickable
                name="type"
                :value="form.type"
                label="走访类型"
                placeholder="点击选择走访类型"
                @click="showType = true"
                :rules="[{ required:true,message: '请选择走访类型' }]"
            />
            <van-popup v-model="showType" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="typeList"
                    @confirm="typeOnConfirm"
                    @cancel="showType = false"
                />
            </van-popup>

            <van-field
                v-if="form.type!=''&&form.type == '百万警进千万家'"
                readonly
                required
                is-link
                clickable
                name="visitType"
                :value="form.visitType"
                label="走访分类"
                placeholder="点击选择走访分类"
                @click="showVisitType = true"
                :rules="[{ required:true,message: '请选择走访分类' }]"
            />
            <van-popup v-model="showVisitType" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="visitTypeList"
                    @confirm="visitTypeOnConfirm"
                    @cancel="showVisitType = false"
                />
            </van-popup>

            <van-field
                v-if="form.visitType!=''&&form.visitType != '其他'"
                readonly
                required
                is-link
                clickable
                name="childrenType"
                :value="form.childrenType"
                label="子分类"
                placeholder="点击选择子分类"
                @click="showChildrenType = true"
                :rules="[{ required:true,message: '请选择子分类' }]"
            />
            <van-popup v-model="showChildrenType" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="childrenTypeList[visitTypeList.findIndex(v =>v == form.visitType)]"
                    @confirm="childrenTypeOnConfirm"
                    @cancel="showChildrenType = false"
                />
            </van-popup>

            <van-field
                v-if="form.type == '百万警进千万家'"
                v-model="form.difficulty"
                label="存在的困难/反映的诉求"
                type="textarea"
                maxlength="50"
                rows="2"
                show-word-limit
                autosize
                name="difficulty"
                placeholder="请输入"
            />

            <van-field
                v-if="form.type == '百万警进千万家'&&form.visitType == '特殊人群家庭'"
                v-model="form.measures"
                label="帮教管控措施"
                type="textarea"
                maxlength="50"
                rows="2"
                show-word-limit
                autosize
                name="measures"
                placeholder="请填写帮教管控措施"
            />

            <van-field
                v-if="form.type != ''&&form.type != '百万警进千万家'"
                required
                v-model="form.situation"
                label="走访情况"
                type="textarea"
                maxlength="50"
                rows="2"
                show-word-limit
                autosize
                name="situation"
                placeholder="请填写走访情况"
                :rules="[{ required:true,message: '请填写走访情况' }]"
            />

            <van-field
                v-if="form.type != ''&&form.type != '百万警进千万家'"
                required
                v-model="form.opinion"
                label="群众意见"
                type="textarea"
                maxlength="50"
                rows="2"
                show-word-limit
                autosize
                name="opinion"
                placeholder="请填写群众意见"
                :rules="[{ required:true,message: '请填写群众意见' }]"
            />

            <van-field v-if="form.type != ''&&form.type != '百万警进千万家'" name="replay" label="需要二次回访">
                <template #input>
                    <van-radio-group v-model="form.replay" direction="horizontal">
                        <van-radio name="1" icon-size="16px" checked-color="#c73e3a">是</van-radio>
                        <van-radio name="2" icon-size="16px" checked-color="#c73e3a">否</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <van-field
                v-model="form.remark"
                label="备注"
                type="textarea"
                maxlength="50"
                rows="2"
                show-word-limit
                autosize
                name="remark"
                placeholder="请填写备注"
            />

            <van-field name="images" label="图片信息">
                <template #input>
                    <van-uploader v-model="images" />
                </template>
            </van-field>
        </van-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form:{
                    type:"",
                    visitType:"",
                    childrenType:"",
                    difficulty:"",
                    measures:"",
                    situation:"",
                    replay:"2"
                },
                images:[],

                typeList: ["百万警进千万家","民调评警","辖区走访"],
                showType:false,
                visitTypeList:["生活困难群体家庭","重点退役人员家庭","特殊人群家庭","其他"],
                showVisitType:false,
                childrenTypeList:[
                    ["低收入群众","城镇失业下岗","残疾人","孤寡老人","留守儿童","重点青少年","外来务工人员","失独丧偶","遭受病灾","遭受不法侵害","其他"],
                    ["涉军人员","涉军访重点人员","已被判处刑罚对象及其家属","依法提请逮捕和监视居住对象家属","依法变更取保候审对象及其家属","其他"],
                    ["矛盾纠纷当事人","利益诉求人员","肇事肇祸严重精神障碍患者","扬言实施个人极端行为人员","刑满释放人员","重点人口"]
                ],
                showChildrenType:false
            }
        },
        methods: {
            typeOnConfirm(value,index) {
                this.form.type = value
                this.showType = false
            },
            visitTypeOnConfirm(value,index){
                this.form.visitType = value
                this.showVisitType = false
            },
            childrenTypeOnConfirm(value,index){
                this.form.childrenType = value
                this.showChildrenType = false
            }
        },
    }
</script>

<style lang="scss" scoped>
.van-form{
    padding-top: 46px;
}
</style>