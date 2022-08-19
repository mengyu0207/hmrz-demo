<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            @click="$router.push('/import')"
            size="small"
            type="warning"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="addStaff"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  hight: 100px;
                  padding: 10px;
                "
                @click="showImgQRcode(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatFormOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="assignFn(row.id)"
                >角色</el-button
              >
              <el-button type="text" size="small" @click="OnMove(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="pages.size"
            :current-page="pages.page"
            :total="total"
            @current-change="currentChange"
          />
        </el-row>
        <!-- 添加员工组件 -->
        <addEmployees
          @add-success="getEmployeesInfo"
          :Visible.sync="addvisible"
        />
        <!-- 弹层二维码 -->
        <el-dialog
          title="二维码"
          :visible.sync="ercodeDialog"
          @close="ercodeDialog = false"
        >
          <canvas id="canvas"></canvas>
        </el-dialog>
      </el-card>
    </div>
    <!-- 分配角色 -->
    <assiginRole
      :employeesId="currentEmployeesID"
      :visible.sync="showAssignVisible"
    />
  </div>
</template>

<script>
import importModule from '@/router/index'
import employees from '@/constant/employees'
import { getEmployeesInfoApi, delEmployeeApi } from '@/api/employees'
import addEmployees from './components/add-employeess.vue'
import assiginRole from './components/assign-role.vue'
import QRcode from 'qrcode'
export default {
  data() {
    return {
      currentEmployeesID: '',
      showAssignVisible: false,
      visible: '',
      ercodeDialog: false,
      addvisible: false,
      DeleteVisible: false,
      total: 0,
      employees: [],
      pages: {
        page: 1,
        size: 5,
      },
    }
  },
  components: {
    addEmployees,
    assiginRole,
  },
  created() {
    this.getEmployeesInfo()
  },

  methods: {
    // 角色按钮
    assignFn(id) {
      this.showAssignVisible = true
      this.currentEmployeesID = id
    },
    async exportExcel() {
      await import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header: ['姓名', '手机号'], //表头 必填
          data: [['宇哥', '666666']], //具体数据 必填
          filename: '员工列表', //非必填
          autoWidth: true, //非必填
          bookType: 'xlsx', //非必填
        })
      })
    },
    addStaff() {
      this.addvisible = true
    },
    formatFormOfEmployment(row, column, cellValue, index) {
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    async getEmployeesInfo() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      console.log('员工列表数据', rows)
      this.employees = rows
      this.total = total
    },
    currentChange(val) {
      this.pages.page = val
      this.getEmployeesInfo()
    },
    async OnMove(id) {
      this.DeleteVisible = true
      await this.$confirm('确认删除？')
      await delEmployeeApi(id)
      this.getEmployeesInfo()
    },
    // 二维码
    showImgQRcode(staffPhoto) {
      if (!staffPhoto) return this.$message.error('不要着急嘛~')
      this.ercodeDialog = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRcode.toCanvas(canvas, staffPhoto)
      })
    },
  },
}
</script>

<style scoped lang="less"></style>
