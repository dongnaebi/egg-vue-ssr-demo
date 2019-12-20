<template>
  <div id="app" :class="state.route.meta.wrapClass">
    <header>
      <header-bar v-if="!state.route.meta.hideHeader"></header-bar>
    </header>
    <a-locale-provider :locale="zhCN">
      <transition name="page-slide" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </a-locale-provider>
    <footer>
      <footer-bar v-if="!state.route.meta.hideFooterBar"></footer-bar>
    </footer>
  </div>
</template>
<script>
  import Vue from 'vue'
  import headerBar from './pages/public/header-bar.vue'
  import footerBar from './pages/public/footer-bar.vue'
  import Icon from 'vue-awesome/components/Icon.vue'
  import {mapState} from 'vuex'
  import draggable from './util/draggable'
  import { LocaleProvider } from 'ant-design-vue'
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import 'moment/locale/zh-cn'

  Vue.component('icon', Icon)
  Vue.use(LocaleProvider)

  export default {
    components: {
      headerBar,
      footerBar
    },
    data () {
      return {
        zhCN: zhCN
      }
    },
    computed: {
      ...mapState({
        state: state => state
      })
    },
    metaInfo () {
      return {
        title: this.state.route.meta.title,
        titleTemplate: `%s - ${this.$config.title}`,
        meta: [
          {
            vmid: 'description',
            name: 'description',
            content: this.$config.seo.description
          },
          {vmid: 'keywords', name: 'keywords', content: this.$config.seo.keywords}
        ]
      }
    },
    mounted () {

    },
    watch: {
    },
    methods: {

    }
  }
</script>
<style scoped>
  
</style>
