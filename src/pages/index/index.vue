<template>
  <div class="wrapper">
    <p>客户端渲染：{{index}}</p>
    <router-link to="/list/1" style="color:var(--color-highlight)">跳转列表页</router-link>
    <a-button>antd style test</a-button>
  </div>
</template>
<script>
import Vue from 'vue'
import { Button } from 'ant-design-vue'
import { mapActions } from 'vuex'
import isClient from '~/mixins/isClient'
Vue.use(Button)

export default {
  mixins: [isClient],
  components: {},
  data () {
    return {
      index: null
    }
  },
  metaInfo () {
    return {
      title: '首页',
      titleTemplate: null
    }
  },
  computed: {

  },
  created () {

  },
  mounted () {
    this.fetchData().then(res => {
      if (res.code === 200) {
        this.index = res.data
      }
    })
  },
  methods: {
    ...mapActions({
      fetchData: 'indeData'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
