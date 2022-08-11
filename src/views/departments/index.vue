<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <treeTools
          @add="ShowAddDepts"
          :isRoot="true"
          :treeNode="{ name: '宇哥教育', manager: '负责人' }"
        />
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <treeTools
              @add="dialogVisible = true"
              @Remove="loadDepts"
              :treeNode="data"
              @edit="showEdit"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 弹出框 -->
    <addDept
      ref="addDept"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
    />
  </div>
</template>~

<script>
import addDept from './components/add-dept'
import { getDepsApi } from '@/api/department'
import { tranListToTreeData } from '@/utils/index'
import treeTools from './components/tree-tools.vue'
export default {
  data() {
    return {
      currentNode: {},
      defaultProps: {
        label: 'name',
      },
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      dialogVisible: false,
    }
  },
  components: {
    treeTools,
    addDept,
  },
  created() {
    this.loadDepts()
  },
  methods: {
    showEdit(val) {
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
    },
    ShowAddDepts(val) {
      this.dialogVisible = true
      this.currentNode = val
      console.log(val)
    },
    async loadDepts() {
      const res = await getDepsApi()
      console.log(res)
      this.treeData = tranListToTreeData(res.depts, '')
    },
  },
}
</script>

<style scoped lang="less"></style>
