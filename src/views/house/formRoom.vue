<template>
    <div>
        <van-nav-bar fixed @click-left="$router.back()" title="实有房屋登记" left-text="返回" right-text="保存" left-arrow />

        <van-form validate-first :show-error="false" validate-trigger="onBlur">

            <van-field
                v-model="form.houseId"
                required
                type="digit"
                label="楼栋号"
                name="houseId"
                placeholder="请输入楼栋号,仅支持数字"
                :rules="[{ required:true,message: '请输入楼栋号' }]"
            />

            <van-field
                v-if="$route.query.type == 1"
                v-model="form.houseId"
                required
                type="digit"
                label="单元号"
                name="unit"
                placeholder="请输入单元号,仅支持数字"
                :rules="[{ required:true,message: '请输入单元号' }]"
            />

            <van-field
                v-model="form.floor"
                required
                type="digit"
                label="楼层"
                name="floor"
                placeholder="请输入楼层,仅支持数字"
                :rules="[{ required:true,message: '请输入楼层' }]"
            />

            <van-field
                readonly
                required
                is-link
                clickable
                name="type"
                :value="form.type"
                label="房屋用途"
                placeholder="点击选择房屋用途"
                @click="showTypeList = true"
                :rules="[{ required:true,message: '请选择房屋用途' }]"
            />
            <van-popup v-model="showTypeList" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="typeList"
                    @confirm="typeOnConfirm"
                    @cancel="showTypeList = false"
                />
            </van-popup>

            <van-field
                readonly
                required
                is-link
                clickable
                name="replace"
                :value="form.replace"
                label="是否代管"
                placeholder="点击选择是否代管"
                @click="showReplaceList = true"
            />
            <van-popup v-model="showReplaceList" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="replaceList"
                    @confirm="replaceOnConfirm"
                    @cancel="showReplaceList = false"
                />
            </van-popup>

            <van-field name="uploader" label="照片">
                <template #input>
                    <van-uploader v-model="uploader" />
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
                    houseId: "",
                    unit:"",
                    type:"",
                    replace:"",
                    address:""
                },
                uploader:[],
                typeList: ['自用', '仓储', '出租', '闲置', '网约'],
                replaceList:['是','否'],
                showTypeList: false,
                showReplaceList:false,
            }
        },
        methods: {
            typeOnConfirm(value) {
                this.form.type = value;
                this.showTypeList = false;
            },
            replaceOnConfirm(value) {
                this.form.replace = value;
                this.showReplaceList = false;
            },
            chooseAddress(){
                this.$router.push({
                    path:"/position"
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.van-form{
    padding-top: 46px;
}
</style>