/**
 * Created by ebi on 2018/3/12.
 */
function load (component) {
  return () => import(`../pages/${component}.vue`)
}

export default [
  {
    path: '/',
    component: load(`index/index`),
    meta: { title: '首页' }
  }
]
