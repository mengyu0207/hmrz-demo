<template>
  <div>
    <UploadImg @onSuccess="onSuccess1" />
    <h1>首页</h1>
  </div>
</template>
<script>
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
    onSuccess1({ url }) {
      console.log('a请求', url)
    },
    onSuccess2({ url }) {
      console.log(url)
    },
  },
  watch: {},
}
</script>
<style lang="less" scoped></style>
