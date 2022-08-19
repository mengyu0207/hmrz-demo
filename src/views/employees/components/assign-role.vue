<template>
  <div>
    <el-dialog
      @close="onClose"
      title="分配角色"
      :visible="visible"
      @open="OnOpen"
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="assignRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getRolesApi, assignPerm } from '@/api/role'
import { getUserDetailById } from '@/api/user'
export default {
  name: '',
  data() {
    return {
      checkList: [], //记录选中

      roles: [],
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    employeesId: {
      type: String,
      required: true,
    },
  },

  components: {},
  computed: {},
  beforeMount() {},
  mounted() {},
  methods: {
    // 获取角色列表数据
    async getRolesList() {
      const { rows } = await getRolesApi()
      console.log('角色列表数据', rows)
      this.roles = rows
    },
    OnOpen() {
      this.getRolesList()
      this.getEmployeesRoles()
    },
    onClose() {
      this.$emit('update:visible', false)
    },
    // 获取员工角色
    async getEmployeesRoles() {
      const { roleIds } = await getUserDetailById(this.employeesId)
      console.log('员工角色数据', roleIds)
      this.checkList = roleIds
    },
    // 分配角色
    async assignRole() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      await assignPerm({
        id: this.employeesId,
        roleIds: this.checkList,
      })
      this.$message.success('分配成功')
      this.onClose()
    },
  },
  watch: {},
}
</script>
<style lang="less" scoped></style>
