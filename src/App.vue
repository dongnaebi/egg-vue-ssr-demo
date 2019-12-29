<template>
  <div id="app" :class="state.route.meta.wrapClass">
    <progress-bar ref="bar"></progress-bar>
    <transition name="slide-down">
      <div class="error" v-if="state.error">
        {{state.error.url}}
        {{state.error.title}}
        {{state.error.description}}
        {{state.error.errData}}
      </div>
    </transition>
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
import progressBar from './components/progress-bar.vue'
import headerBar from './pages/public/header-bar.vue'
import footerBar from './pages/public/footer-bar.vue'
import Icon from 'vue-awesome/components/Icon.vue'
import { mapState } from 'vuex'
// import draggable from './util/draggable'
import { LocaleProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'

Vue.component('icon', Icon)
Vue.use(LocaleProvider)

export default {
  components: {
    progressBar,
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
      titleTemplate: `%s - ${this.$site.title}`,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.$site.seo.description
        },
        { vmid: 'keywords', name: 'keywords', content: this.$site.seo.keywords }
      ]
    }
  },
  mounted () {

  },
  watch: {
    '$store.state.progressBar' (val) {
      if (val) {
        this.$refs.bar.start()
      } else {
        this.$refs.bar.finish()
      }
    }
  },
  methods: {

  }
}
</script>
<style scoped>
  .error{height:20px;line-height:20px;text-align: center;background:var(--color-danger);color:var(--color-white);}
</style>
