<template>
  <div class="dashboard-container">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <el-button @click="addVisible = true" type="primary"
            >新增角色</el-button
          >
          <!-- table -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="角色" width="180">
            </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- fenye -->
          <el-pagination
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total"
            @current-change="currentChange"
          >
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="角色管理" name="third">
          <!-- 消息提示 -->
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="companyInfo.companyAddress"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="companyInfo.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 添加弹框 -->
      <el-dialog title="新增角色" :visible.sync="addVisible" width="50%">
        <el-form
          ref="addRoleForm"
          :model="addRoleForm"
          label-width="80px"
          :rules="addRoleRulesForm"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="addRoleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="addRoleForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="OnSave">确 定</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import { getRolesApi, addRolesApi } from '@/api/role'
import { findCompanyApi } from '@/api/setting'
export default {
  data() {
    return {
      companyInfo: '',
      activeName: 'second',
      tableData: [],
      total: 0,
      pageSize: 10,
      page: 1,
      addVisible: false,
      addRoleForm: {
        name: '',
        description: '',
      },

      addRoleRulesForm: {
        name: [
          {
            required: true,
            message: '不能为空',
            trigger: 'blur',
          },
        ],
        description: {
          required: true,
          message: '不能为空',
          trigger: 'blur',
        },
      },
    }
  },

  created() {
    this.getRoles()
    this.findCompany()
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize,
      })
      console.log(rows)
      this.tableData = rows
      this.total = total
    },
    currentChange(val) {
      this.page = val
      this.getRoles()
    },
    async OnSave() {
      await this.$refs.addRoleForm.validate()
      await addRolesApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.addVisible = false
      this.getRoles()
    },
    async findCompany() {
      const res = await findCompanyApi(
        this.$store.state.user.userInfo.companyId,
      )
      console.log('公司信息', res)
      this.companyInfo = res
    },
  },
}
</script>

<style scoped lang="less"></style>
