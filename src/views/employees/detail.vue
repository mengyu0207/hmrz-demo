<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formData.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="OnSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <userInfo />
          </el-tab-pane>

          <el-tab-pane label="岗位信息" />
          <jobInfo />
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import userInfo from './components/user-info.vue'
import jobInfo from './components/job-info.vue'
export default {
  name: '',
  data() {
    return {
      formData: {},
    }
  },
  created() {
    this.getUserDetail()
  },
  components: {
    userInfo,
    jobInfo,
  },
  computed: {},
  beforeMount() {},
  mounted() {},
  methods: {
    async getUserDetail() {
      const res = await getUserDetailById(this.$route.params.id)
      console.log('用户的基本信息', res)
      this.formData = res
    },
    async OnSave() {
      await saveUserDetailById(this.formData)
      this.$message.success('你牛逼啊！')
    },
  },
  watch: {},
}
</script>
<style lang="less" scoped></style>
