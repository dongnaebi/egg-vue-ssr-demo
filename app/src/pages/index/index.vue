<template>
  <div>
    首页1234
    <img src="../../assets/images/logo.svg">
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import isClient from '~/mixins/isClient'

  export default {
    mixins: [isClient],
    components: {},
    data () {
      return {

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

    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>

</style>
