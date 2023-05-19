<template>
  <div>
    <h3>课程管理</h3>
    <el-table :data="data.data" border :stripe="true" height="500">
      <el-table-column
        v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.label"
      >
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot="header">
          <el-button
            @click="$router.push({ name: 'courses-create' })"
            type="text"
            size="small"
            >创建</el-button
          ></template
        >
        <template slot-scope="scope">
          <!-- TODO: 需要获取当前行 ID 进行查询 -->
          <el-button @click="onEdit(scope)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="onDelete(scope)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface dataInterface {
  data?: Array<object>;
  lastPage?: number;
  page?: number;
  total?: number;
}

@Component({})
export default class CourseList extends Vue {
  data: dataInterface = {};
  // 定义表格头数据
  fields = {
    _id: { label: "ID" },
    name: { label: "课程名称" },
    cover: { label: "课程封面图" },
  };
  scope = 1;

  async fetch() {
    const { data } = await this.$http.get("courses");
    this.data = data;
  }
  onEdit(scope: any) {
    this.$router.push({
      name: "courses-Edit",
      params: { id: scope.row._id },
    });
  }
  async onDelete(scope: any) {
    try {
      // 捕获取消的异常 return 出去 不做处理
      await this.$confirm("是否确认删除");
    } catch (error) {
      return;
    }
    await this.$http.delete(`courses/${scope.row._id}`);
    this.fetch();
    this.$message.success("删除成功");
  }
  created() {
    this.fetch();
  }
}
</script>

<style scoped></style>
