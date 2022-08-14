<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>导入页面</h2>
      <UploadExcel :beforeUpload="excelSuccess" :onSuccess="onSuccess" />
    </div>
  </div>
</template>
<script>
import { formatTime } from '@/filters/index'
import { importEmployee } from '@/api/employees'
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
export default {
  name: '',
  data() {
    return {}
  },
  components: {},
  computed: {},
  beforeMount() {},
  mounted() {},
  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('傻x选错文件了')
        return false
      }
      return true
    },
    //上传成功
    async onSuccess({ header, results }) {
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            //excel 时间戳
            const timestamp = item[key]
            //转换
            const date = new Date((timestamp - 1) * 24 * 3600000)
            date.setFullYear(date.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(date)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      await importEmployee(newArr)
      this.$message.success('你牛逼')
      this.$router.go(-1)
      console.log(newArr)
      console.log(header)
      console.log(results)
    },
  },
  watch: {},
}
</script>
<style lang="less" scoped></style>
