<template>
  <div>
    {{test}}
    <van-cell :value="value" icon="shop-o" is-link>
      <div style="float: left">
        <span class="custom-text">单元格{{ label }}</span>
        <van-tag type="danger">标志{{ tag }}</van-tag>
      </div>

      <template slot="title">
        mpvue为什么不识别template呢？
        <span class="custom-text">单元格{{ label }}</span>
        <van-tag type="danger">标志{{ tag }}</van-tag>
      </template>

    </van-cell>
  </div>
</template>

<script>
  export default {
    name: 'index',
    props: ['value', 'label', 'tag'],
    data () {
      return {
        test: '测试'
      }
    }
  }
</script>

<style scoped>

</style>
