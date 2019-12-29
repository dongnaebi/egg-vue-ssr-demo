<template>
  <div class="list">
    服务端渲染列表页数据：
    {{list}}
  </div>
</template>
<script>
import list from '~/store/modules/list'
import { mapState } from 'vuex'
const registerModule = (store, key, moduler) => {
  let registered = store._modules.root._children[key] !== undefined
  if (!registered) store.registerModule(key, moduler, { preserveState: !!store.state[key] })
}
const unregisterModule = (store, key) => {
  if (store._modules.root._children[key] !== undefined) {
    store.unregisterModule(key)
  }
}
export default {
  asyncData ({ store, route }) {
    registerModule(store, 'list', list)
    return store.dispatch('list/getList', route.params.id || 0)
  },
  data () {
    return {}
  },
  metaInfo () {
    return {
      title: '列表页ssr',
      titleTemplate: null
    }
  },
  computed: {
    ...mapState({
      list: state => state && state.list.list
    })
  },
  beforeMount () {
    registerModule(this.$store, 'list', list)
  },
  destroyed () {
    unregisterModule(this.$store, 'list')
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .list{padding:30px;}
</style>
