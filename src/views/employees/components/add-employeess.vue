<template>
  <el-dialog
    title="新增员工"
    :visible="Visible"
    width="50%"
    :before-close="handleClose"
  >
    <!-- 表单 -->
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择部门"
          @focus="getDepts"
        >
          <el-tree
            @node-click="treeNodeClick"
            :data="depts"
            :props="treeProps"
          ></el-tree>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="OnClose()">取 消</el-button>
      <el-button type="primary" @click="OnSave()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDeptsApi } from '@/api/department'
import EmployeeEnum from '@/constant/employees'
import { tranListToTreeData } from '@/utils/index'
import { addEmployee } from '@/api/employees'
export default {
  name: '',
  data() {
    return {
      treeProps: { label: 'name' },
      depts: [],
      EmployeeEnum, // 在data中定义数据
      // 表单数据
      treeData: [], // 定义数组接收树形数据
      showTree: false, // 控制树形的显示或者隐藏
      loading: false, // 控制树的显示或者隐藏进度条
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: '',
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位',
          },
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur',
          },
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' },
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' },
        ],
        departmentName: [],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }],
      },
    }
  },
  props: {
    Visible: {
      type: Boolean,
      required: true,
    },
  },
  components: {},
  computed: {},
  beforeMount() {},
  mounted() {},
  methods: {
    OnClose() {
      this.$emit('update:Visible', false)
      this.$refs.form.resetFields()
    },
    OnSave() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        await addEmployee(this.formDate)
        this.$message.success('添加成功')
        this.OnClose()
        this.$emit('add-success')
      })
    },
    treeNodeClick(row) {
      this.formData.departmentName = row.name
      this.$refs.deptSelect.blur()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    async getDepts() {
      const { depts } = await getDeptsApi()
      tranListToTreeData(depts, '')
      this.depts = depts
    },
  },
  watch: {},
}
</script>
<style lang="scss" scoped>
.el-select-dropdown__item,
.el-select-dropdown__item:hover .el-select-dropdown__item {
  background-color: #fff;
  overflow: unset;
}
.el-select-dropdown__item {
  height: 200px;
}
.treeOption {
  height: 100px;
}
</style>
