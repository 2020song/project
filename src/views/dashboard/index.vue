<template>
  <div>
    <van-popup v-model="userBox" position="left" :style="{ width: '70%' ,height: '100%'}" >

    </van-popup>

    <van-nav-bar @click-left="openUser" :title="userName" @click-right="search">
      <template #left>
        <van-icon
          name="user-o"
          size="18"
        />
      </template>
      <template #right>
        <van-icon
          name="search"
          size="18"
        />
      </template>
    </van-nav-bar>

    <van-grid :column-num="3">
      <van-grid-item v-for="item in menuList" :key="item.name" :icon="item.icon" :text="item.name" @click="toDetail(item.page)"/>
    </van-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      userBox:false,
      menuList:[{
        icon:"wap-home-o",
        name:"学习系统",
        page:"/dome/index"
      },{
        icon:"wap-home-o",
        name:"房屋/人口",
        page:"/house/index"
      },{
        icon:"friends-o",
        name:"重点人口",
        page:"/house/index"
      },{
        icon:"volume-o",
        name:"通知公告",
        page:"/house/index"
      },{
        icon:"notes-o",
        name:"百万警进千万家",
        page:"/house/index"
      },{
        icon:"records",
        name:"我的任务",
        page:"/house/index"
      }]
    };
  },
  mounted() {
    this.userName = this.$store.getters.userName;
  },
  methods: {
    openUser() {
      this.userBox = true
    },
    toDetail(path){
      this.$router.push({
        path:path
      })
    },
    search(){
      this.$router.push({
        path:"/house/index"
      })
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-grid-item__content::after{
  border-width: 0px;
}
</style>