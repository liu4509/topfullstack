<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        mode="vertical"
        style="height: 100vh"
        :default-active="$route.path"
        router
      >
        <el-submenu
          v-for="(item, index) in menus.items"
          :index="`${index} + 1`"
          :key="`menus-item-${index}`"
        >
          <template slot="title">{{ item.title }}</template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :index="`${subItem.path}`"
            :key="`menus-item-${index}-${subIndex}`"
          >
            {{ subItem.title }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-container>
        <el-header> <h3>全栈之巅 - 后台管理界面</h3> </el-header>

        <el-main>
          <!-- 基于路由路径进行更新 :key 应 edit cerate 共用组件 解决数据重复与不更新的问题-->
          <router-view :key="$route.path"></router-view>
        </el-main>
        <el-footer> 底部</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Main extends Vue {
  menus = {
    items: [
      {
        title: "内容管理",
        items: [
          { title: "首页", path: "/" },
          { title: "课程管理", path: "/courses/list" },
          { title: "课时管理", path: "/episodes/list" },
        ],
      },
      {
        title: "运营管理",
        items: [{ title: "用户管理", path: "/users/list" }],
      },
    ],
  };
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
</style>
