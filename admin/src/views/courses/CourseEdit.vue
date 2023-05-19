<template>
  <div>
    <h3>{{ !isNew ? "编辑" : "创建" }}课程</h3>
    <ele-form
      v-model="data"
      :form-desc="fields"
      :request-fn="handleSubmit"
      @request-success="handleSuccess"
      :rules="rules"
    ></ele-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

interface dataInterface {
  name?: string;
  cover?: string;
}

@Component({})
export default class CourseEdit extends Vue {
  // 获取路由传的 prop
  @Prop(String) id!: string;
  rules = {
    name: { required: true, type: "string", message: "必须填写课程名称" },
    cover: { required: true, type: "string", message: "必须填写课程封面图" },
  };
  data: dataInterface = {};
  // 定义表格头数据
  fields = {
    name: { label: "课程名称", type: "input" },
    cover: { label: "课程封面图", type: "input" },
  };

  async GetIdFetch(id: string) {
    const { data } = await this.$http.get(`courses/${id}`);
    this.data = data;
  }

  async handleSubmit() {
    const url = this.isNew ? `courses` : `courses/${this.id}`;
    const method = this.isNew ? "post" : "put";
    this.$http[method](url, this.data);
    this.$router.go(-1);
    this.data = {};
  }

  handleSuccess() {
    this.$message.success(`${this.isNew ? "创建" : "更新"}成功`);
  }
  get isNew() {
    return !this.id;
  }
  created() {
    !this.isNew && this.GetIdFetch(this.id);
  }
}
</script>

<style scoped></style>
