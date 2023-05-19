<template>
  <div>
    <avue-crud v-if="option.column" :data="data.data" :option="option" :page="page" @row-save="rowSave"
      @row-update="rowUpdate" @row-del="rowDel" @refresh-change="refreshChange" @on-load="changePage"
      @sort-change="changeSort" @search-change="search" :upload-after="uploadAfter"></avue-crud>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

interface dataInterface {
  data?: [object];
  lastPage?: number;
  page?: number;
  total?: number;
}
interface option {
  title?: String;
  column?: [{ prop?: String; label?: String; regex?: Boolean }];
}

@Component({})
export default class ResourceCRUD extends Vue {
  @Prop(String) resource?: String;
  data: dataInterface = {};
  option: option = {};
  query: any = {
  };
  page: any = {
    total: 0,
  };
  // TODO: 需要确定是否上传成功
  async uploadAfter(res: any, done: any,) {
    done()
    this.$message.success('上传成功')
  }
  async changePage({ currentPage, pageSize }: any) {
    this.query.page = currentPage
    this.query.limit = pageSize
    this.fetch()
  }

  async changeSort({ prop, order }: any) {
    if (!order) {
      this.query.sort = null
    } else {
      this.query.sort = {
        // 用 [] [当前键值] 不是固定的 prop
        [prop]: order == 'ascending' ? 1 : -1
      }
    }
    this.fetch()
  }

  async search(where: any, done: any) {
    let that: any = this
    for (let k in where) {
      const field = that.option.column.find((v: any) => v.prop === k)
      if (field.regex) {
        where[k] = { $regex: where[k] }
      }
    }
    this.query.where = where
    this.fetch()
    done()
  }

  async fetch() {
    const { data } = await this.$http.get(`${this.resource}`, {
      params: {
        // 对象转换字符串
        query: JSON.stringify(this.query),
      },
    });
    this.data = data;
    this.page.total = data.total;
  }
  async fetchOption() {
    const { data } = await this.$http.get(`${this.resource}/option`);
    this.option = data;
  }
  onEdit(scope: any) {
    this.$router.push({
      name: "courses-Edit",
      params: { id: scope.row._id },
    });
  }
  async rowSave(row: any, done: any, loading: any) {
    await this.$http.post(`${this.resource}`, row);
    this.$message.success("创建成功");
    this.fetch();
    loading();
    done();
  }
  async rowUpdate(row: any, done: any, loading: any) {
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`${this.resource}/${row._id}`, row);
    this.$message.success("修改成功");
    this.fetch();
    loading();
  }
  async rowDel(row: any) {
    try {
      // 捕获取消的异常 return 出去 不做处理
      await this.$confirm("是否确认删除");
    } catch (error) {
      return;
    }
    await this.$http.delete(`${this.resource}/${row._id}`);
    this.fetch();
    this.$message.success("删除成功");
  }
  async refreshChange() {
    this.fetch();
    this.$message.success("刷新成功");
  }
  created() {
    this.fetch();
    this.fetchOption();
  }
}
</script>

<style scoped></style>
