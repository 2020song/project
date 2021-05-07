<template>
    <div>
        <van-nav-bar fixed @click-left="$router.back()" title="实有人员登记" left-text="返回" right-text="保存" left-arrow />

        <van-form validate-first :show-error="false" validate-trigger="onChange">

            <van-field required name="cardPhoto" label="证件照片">
                <template #input>
                    <van-uploader v-model="cardPhoto" />
                </template>
            </van-field>

            <van-field
                v-model="form.name"
                required
                label="姓名"
                name="name"
                placeholder="请输入住户姓名"
                :rules="[{ required:true,message: '请输入住户姓名' }]"
            />

            <van-field
                v-model="form.phone"
                required
                type="digit"
                label="手机号"
                name="phone"
                placeholder="请输入手机号"
                :rules="[{ required:true,message: '请输入手机号' }]"
            />

            <van-field
                v-model="form.houseId"
                required
                label="身份证"
                name="idcard"
                placeholder="请输入身份证"
                :rules="[{ required:true,message: '请输入身份证' }]"
            >
                <template #button>
                    <van-button size="mini" color="#c73e3a">扫描证件</van-button>
                </template>
            </van-field>

           <van-field required name="six" label="性别">
                <template #input>
                    <van-radio-group v-model="form.six" direction="horizontal">
                        <van-radio name="1" icon-size="16px" checked-color="#c73e3a">男</van-radio>
                        <van-radio name="2" icon-size="16px" checked-color="#c73e3a">女</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <van-field
                v-model="form.nation"
                required
                label="民族"
                name="nation"
                placeholder="请输入民族"
                :rules="[{ required:true,message: '请输入民族' }]"
            />

            <van-field
                v-model="form.address"
                required
                label="户籍住址"
                name="address"
                placeholder="请输入户籍住址"
                :rules="[{ required:true,message: '请输入户籍住址' }]"
            >
                <template #button>
                    <van-checkbox v-model="isSameAddress" icon-size="16px" checked-color="#c73e3a" shape="square">同现住址</van-checkbox>
                </template>
            </van-field>

            <van-field
                v-if="!isSameAddress"
                required
                v-model="form.nowAddress"
                label="现住址"
                name="nowAddress"
                placeholder="请输入现住址"
                :rules="[{ required:true,message: '请输入户籍住址' }]"
            />

            <van-field
                v-if="$route.query.from == 'createUser'"
                readonly
                required
                clickable
                name="type"
                :value="form.buildId"
                label="楼栋号"
                placeholder="点击选择楼栋号"
                @click="showBuildId = true"
                :rules="[{ required:true,message: '请选择楼栋号' }]"
            >
                <template #button>
                    <van-button size="mini" color="#c73e3a" @click.stop="toHouse">新建楼栋</van-button>
                </template>
            </van-field>
            <van-popup v-model="showBuildId" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="buildIdList"
                    @confirm="buildIdOnConfirm"
                    @cancel="showBuildId = false"
                />
            </van-popup>

            <van-field
                v-if="$route.query.from == 'createUser'&&form.buildId != ''"
                readonly
                required
                clickable
                name="houseId"
                :value="form.houseId"
                label="房号"
                placeholder="点击选择房号"
                @click="showHouseId = true"
                :rules="[{ required:true,message: '请选择房号' }]"
            >
                <template #button>
                    <van-button size="mini" color="#c73e3a" @click.stop="toRoom">新建房号</van-button>
                </template>
            </van-field>
            <van-popup v-model="showHouseId" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="houseIdList"
                    @confirm="houseIdOnConfirm"
                    @cancel="showHouseId = false"
                />
            </van-popup>

            <van-field
                readonly
                required
                is-link
                clickable
                name="type"
                :value="form.type"
                label="人口类型"
                placeholder="点击选择人口类型"
                @click="showUserType = true"
                :rules="[{ required:true,message: '请选择人口类型' }]"
            />
            <van-popup v-model="showUserType" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="userTypeList"
                    @confirm="userTypeOnConfirm"
                    @cancel="showUserType = false"
                />
            </van-popup>

            <van-field required name="flow" label="流动/常驻">
                <template #input>
                    <van-radio-group v-model="form.flow" direction="horizontal">
                        <van-radio name="1" icon-size="16px" checked-color="#c73e3a">流动</van-radio>
                        <van-radio name="2" icon-size="16px" checked-color="#c73e3a">常驻</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <van-field
                v-if="$route.query.isReplace == 1&&form.type != '房主'"
                readonly
                required
                is-link
                clickable
                name="relation"
                :value="form.relation"
                label="与户主关系"
                placeholder="点击选择与户主关系"
                @click="showRelationType = true"
                :rules="[{ required:true,message: '请选择与户主关系' }]"
            />
            <van-popup v-model="showRelationType" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="relationList"
                    @confirm="relationTypeOnConfirm"
                    @cancel="showRelationType = false"
                />
            </van-popup>

            <van-field
                v-if="form.type == '租住'"
                readonly
                is-link
                clickable
                name="rentStartTime"
                :value="form.rentStartTime"
                label="租住日期起"
                placeholder="点击选择租住日期"
                @click="showStartTime = true"
                :rules="[{ required:true,message: '请选择租住日期' }]"
            />
            <van-popup v-model="showStartTime" position="bottom">
                <van-datetime-picker
                    :value="new Date()"
                    type="date"
                    title="选择年月日"
                    :max-date="new Date()"
                    @confirm="startTimeConfirm"
                    @cancel="showStartTime = false"
                />
            </van-popup>

            <van-field
                v-if="form.type == '租住'"
                readonly
                is-link
                clickable
                name="rentEndTime"
                :value="form.rentEndTime"
                label="租住日期止"
                placeholder="点击选择租住日期"
                @click="showEndTime = true"
                :rules="[{ required:true,message: '请选择租住日期' }]"
            />
            <van-popup v-model="showEndTime" position="bottom">
                <van-datetime-picker
                    :value="new Date()"
                    type="date"
                    title="选择年月日"
                    :min-date="new Date()"
                    @confirm="endTimeConfirm"
                    @cancel="showEndTime = false"
                />
            </van-popup>

            <van-field required name="follow" label="重点人员">
                <template #input>
                    <van-radio-group v-model="form.follow" direction="horizontal">
                        <van-radio name="1" icon-size="16px" checked-color="#c73e3a">是</van-radio>
                        <van-radio name="2" icon-size="16px" checked-color="#c73e3a">否</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <van-field
                v-if="form.follow == '1'"
                readonly
                required
                is-link
                clickable
                name="followType"
                :value="form.followType"
                label="类型"
                placeholder="点击选择类型"
                @click="showFollowType = true"
                :rules="[{ required:true,message: '请选择类型' }]"
            />
            <van-popup v-model="showFollowType" position="bottom">
                <van-picker
                    show-toolbar
                    :columns="followTypeList"
                    @confirm="followTypeOnConfirm"
                    @cancel="showFollowType = false"
                />
            </van-popup>

            <van-field
                v-if="form.follow == '1'"
                readonly
                is-link
                clickable
                name="archivesStartTime"
                :value="form.archivesStartTime"
                label="建档日期"
                placeholder="点击选择建档日期"
                @click="showArchivesStart = true"
                :rules="[{ required:true,message: '请选择建档日期' }]"
            />
            <van-popup v-model="showArchivesStart" position="bottom">
                <van-datetime-picker
                    :value="new Date()"
                    type="date"
                    title="选择年月日"
                    :max-date="new Date()"
                    @confirm="archivesStartConfirm"
                    @cancel="showArchivesStart = false"
                />
            </van-popup>

            <van-field
                v-if="form.follow == '1'"
                readonly
                is-link
                clickable
                name="archivesEndTime"
                :value="form.archivesEndTime"
                label="撤档日期"
                placeholder="点击选择撤档日期"
                @click="showArchivesEnd = true"
                :rules="[{ required:true,message: '请选择撤档日期' }]"
            />
            <van-popup v-model="showArchivesEnd" position="bottom">
                <van-datetime-picker
                    :value="new Date()"
                    type="date"
                    title="选择年月日"
                    :max-date="new Date()"
                    @confirm="archivesEndConfirm"
                    @cancel="showArchivesEnd = false"
                />
            </van-popup>

            <van-field v-if="form.follow == '1'" name="followPhoto" label="法律文书/诊断证明">
                <template #input>
                    <van-uploader v-model="followPhoto" />
                </template>
            </van-field>

            <van-field name="face" label="本人正面照">
                <template #input>
                    <van-uploader v-model="face" />
                </template>
            </van-field>

            <van-field name="hand" label="手持证件照">
                <template #input>
                    <van-uploader v-model="hand" />
                </template>
            </van-field>

            <van-field name="cardFace" label="身份证正面照">
                <template #input>
                    <van-uploader v-model="cardFace" />
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
                placeholder="请输入备注"
            />

        </van-form>

        
    </div>
</template>

<script>
import { parseTime } from "@/utils/index"

    export default {
        data() {
            return {
                form: {
                    name:"",
                    phone:"",
                    idcard:"",
                    six:"1",
                    address:"",
                    nowAddress:this.$route.query.address,
                    type:"房主",
                    flow:"1",
                    relation:"",
                    rentStartTime:"",
                    rentEndTime:"",
                    follow:"2",
                    followType:"",
                    archivesStartTime:"",
                    archivesEndTime:"",
                    houseId:"",
                    buildId:""
                },
                userTypeList:["房主","代管人","租住","同住"],
                showUserType:false,
                relationList:["配偶","父母（公婆、岳父母）","子女","祖父母（外祖父母）","孙子女（外孙子女）","无"],
                showRelationType:false,
                followTypeList:["涉恐","涉稳","涉军","重大刑事犯罪前科人员","涉毒人员","在逃人员","肇事肇祸精神病人","重点上访人员"],
                showFollowType:false,
                houseIdList:["101","102","103"],
                showHouseId:false,
                buildIdList:["1","2","3","4"],
                showBuildId:false,

                showStartTime:false,
                showEndTime:false,
                showArchivesStart:false,
                showArchivesEnd:false,

                isSameAddress:true,
                cardPhoto:[],
                followPhoto:[],
                face:[],
                hand:[],
                cardFace:[]
            }
        },
        methods: {
            userTypeOnConfirm(value) {
                this.form.type = value;
                this.showUserType = false;
            },
            relationTypeOnConfirm(value) {
                this.form.relation = value;
                this.showRelationType = false;
            },
            followTypeOnConfirm(value) {
                this.form.followType = value;
                this.showFollowType = false;
            },
            startTimeConfirm(value){
                let time = parseTime(value,"{y}-{m}-{d}")
                this.form.rentStartTime = time;
                this.showStartTime = false
            },
            endTimeConfirm(value){
                let time = parseTime(value,"{y}-{m}-{d}")
                this.form.rentEndTime = time;
                this.showEndTime = false
            },
            archivesStartConfirm(value){
                let time = parseTime(value,"{y}-{m}-{d}")
                this.form.archivesStartTime = time;
                this.showArchivesStart = false
            },
            archivesEndConfirm(value){
                let time = parseTime(value,"{y}-{m}-{d}")
                this.form.archivesEndTime = time;
                this.showArchivesEnd = false
            },
            houseIdOnConfirm(value) {
                this.form.houseId = value;
                this.showHouseId = false;
            },
            buildIdOnConfirm(value) {
                this.form.buildId = value;
                this.showBuildId = false;
            },
            toHouse(){
                this.$router.push({
                    path:"/house/formHouse"
                })
            },
            toRoom(){
                this.$router.push({
                    path:"/house/formRoom"
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.van-form{
    overflow-y:scroll;
    height: calc(100% - 46px);
}
.van-form{
    padding-top: 46px;
}
</style>