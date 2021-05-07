<template>
    <div>
        <van-nav-bar fixed @click-left="$router.back()" title="实有楼栋登记" left-text="返回" right-text="保存" left-arrow />

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
                readonly
                required
                is-link
                clickable
                name="type"
                :value="form.type"
                label="类别"
                placeholder="点击选择楼栋类别"
                @click="showTypeList = true"
                :rules="[{ required:true,message: '请选择楼栋类别' }]"
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
                name="character"
                :value="form.character"
                label="性质"
                placeholder="点击选择楼栋性质"
                @click="showCharacterList = true"
            />
            <van-popup v-model="showCharacterList" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="characterList"
                    @confirm="characterOnConfirm"
                    @cancel="showCharacterList = false"
                />
            </van-popup>

            <van-field
                readonly
                is-link
                clickable
                name="address"
                :value="form.address"
                label="经纬度"
                placeholder="点击选择经纬度"
                @click="chooseAddress"
            />

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
                    type:"",
                    character:"",
                    address:""
                },
                uploader:[],
                typeList: ['单元楼/公寓', '筒子楼', '别墅', '自建房', '平房','四合院','其他'],
                characterList:['固有房产','集体所有房产','私有财产','联营企业房产','股份制企业房产','港/澳/台胞房产','涉外房产','其他'],
                showTypeList: false,
                showCharacterList:false,
            }
        },
        methods: {
            typeOnConfirm(value) {
                this.form.type = value;
                this.showTypeList = false;
            },
            characterOnConfirm(value) {
                this.form.character = value;
                this.showCharacterList = false;
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