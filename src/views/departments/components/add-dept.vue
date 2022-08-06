<template>
  <el-dialog
    :title="formTitle"
    :visible="visible"
    width="50%"
    :before-close="handleClose"
    @click="Onclose"
  >
    <el-form
      :rules="formRules"
      ref="form"
      :model="formData"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" placeholder="输入部门编码"></el-input>
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select
          v-model="formData.manager"
          prop="manager"
          style="width: 100%"
          placeholder="请选择部门负责人"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input
          prop="introduce"
          v-model="formData.introduce"
          placeholder="输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="Onclose">取 消</el-button>
      <el-button type="primary" @click="OnSave">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDepsApi, getDeptById, editDeptById } from '@/api/department'
import { getEmployeesApi } from '@/api/employees'
export default {
  data() {
    // const checkDeptNumber=(rule, value, callback) => {
    //           const isRepeat = this.currentNode.children.some(
    //             (item) => (item.name = value),
    //           )
    //           isRepeat ? callback(new Error('部门重复')) : callback()
    //           // console.log(this.currentNode)
    //         },
    const checkDepCode = async (rule, value, cb) => {
      const { depts } = await getDepsApi()
      console.log(depts)
      const isRepeat = depts.some((item) => item.code === value)
      isRepeat ? callback(new Error('编码重复')) : callback()
    }
    return {
      employees: [],
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          // {
          //   validator: (rule, value, callback) => {
          //     //编辑
          //     // if(this.formData.id){
          //     //   const{depts}=await getDepsApi()
          //     //   const filtersDepts=depts.filter(item=>item.pid===this.formData.pid&&item.id!==this.formData.id)
          //     // }
          //     const isRepeat = this.currentNode.children.some(
          //       (item) => (item.name = value),
          //     )
          //     isRepeat ? callback(new Error('部门重复')) : callback()
          //     // console.log(this.currentNode)
          //   },
          //   trigger: 'blur',
          // },
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          // {
          //   validator: checkDepCode,
          //   trigger: 'blur',
          // },
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            trigger: 'blur',
            min: 1,
            max: 300,
            message: '部门介绍要求1-50个字符',
          },
        ],
      },
      dialogVisible: false,
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formTitle() {
      return !!this.formData.id ? '编辑部门' : '添加部门'
    },
  },
  created() {
    this.getEmployees()
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    //获取员工列表
    async getEmployees() {
      const res = await getEmployeesApi()
      console.log('employees', res)
      this.employees = res
    },
    Onclose() {
      this.$emit('update:visible', false)
      this.$refs.form.restField()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      }
    },
    //确认
    async OnSave() {
      await this.$refs.form.validate()
      try {
        if (this.formData.id) {
          await editDeptById(this.formData)
          this.$message.success('编辑成功')
          this.Onclose()
        } else {
          this.formDate.pid = this.currentNode.id
          await getDepsApi(this.formData)
          this.$message.success('新增部门成功')
          this.Onclose()
        }
      } catch (error) {
        this.$message.error('操作失败')
      }

      console.log(this.formDate.pid)
      console.log('yuge')
    },
    async getDeptById(id) {
      const res = await getDeptById(id)
      this.formData = res
      console.log(res)
      // console.log(id)
    },
  },
}
</script>
<style lang="less" scoped></style>
