<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="不要着急嘛~"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :file-list="fileList"
      action="#"
      list-type="picture-card"
      :on-change="onChange"
      :http-request="onRequest"
      :on-preview="OnPreview"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-load"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="预览图片" :visible.sync="showImgDialog">
      <img :src="ImgURl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
// AKIDsa1C7mAH7h02nIWT8XfW5NPAeroUt0rD          ---id----
// 7xWopZ2FBqELBk23oIVR6UbR0IJ2UgbE          ----------key-----
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDsa1C7mAH7h02nIWT8XfW5NPAeroUt0rD',
  SecretKey: '7xWopZ2FBqELBk23oIVR6UbR0IJ2UgbE',
})
console.log('cos实例', cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      loading: false,
      maxSize: '',
      ImgURl: '',
      showImgDialog: false,
      fileList: [
        // {
        //   name: 'ImgTest',
        //   url: 'http://destiny001.gitee.io/image/cxk.gif',
        // },
      ],
    }
  },
  components: {},
  computed: {},
  beforeMount() {},
  mounted() {},
  methods: {
    onRequest({ file }) {
      cos.putObject(
        {
          Bucket: 'mengyu-hm-1312420491' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败')
          }
          this.$emit('onSuccess', {
            url: 'http://' + data.Location,
          })
        },
      )
      console.log(666)
    },
    onChange(file, fileList) {
      console.log('卧槽')
      this.fileList = fileList
    },
    OnPreview(file) {
      console.log(file)
      this.showImgDialog = true
      this.ImgURl = file.url
    },
    beforeUpload(file) {
      //可以上传的图片类型
      console.log('上传检查', file)
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('&') + '图片')
        return false
      }

      //限制上传的图片大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择图片不能超过2m')
        return false
      }
    },
  },
  watch: {},
}
</script>
<style lang="scss">
.hide.el-upload--picture-card {
  display: none;
}
.custom-load {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
