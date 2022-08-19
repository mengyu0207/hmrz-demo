<template>
  <div>
    <i
      @click="$router.push(`/employees/print/${userId}?type=personal`)"
      class="el-icon-printer"
    ></i>
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
  methods: {},
  watch: {},
}
</script>
<style lang="less" scoped></style>
