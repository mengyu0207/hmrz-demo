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
          <el-button size="small" type="danger">导出</el-button>
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
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
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
      </el-card>
    </div>
  </div>
</template>

<script>
import importModule from '@/router/index'
import employees from '@/constant/employees'
import { getEmployeesInfoApi, delEmployeeApi } from '@/api/employees'
import addEmployees from './components/add-employeess.vue'
export default {
  data() {
    return {
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
  },
  created() {
    this.getEmployeesInfo()
  },

  methods: {
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
  },
}
</script>

<style scoped lang="less"></style>
