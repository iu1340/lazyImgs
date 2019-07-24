# lazyImgs
针对dom内部的图片实现懒加载，本插件为VUE插件，针对DOM内部的图片做懒加载，DOM中滚动产生懒加载效果。当不设置parent的时候，默认图片的在整个页面内懒加载。
# USE
```
// main.js
import LazyImgs from 'vue-lazy-imgs-dom'

Vue.use(LazyImgs)

// vue file
<div class="hello">
    <img v-for="(item,i) of images" :key="i" v-lazy="item.image" parent=".hello" width="100" height="100" />
  </div>
```
# DEMO

[Demo](https://iu1340.github.io/lazyImgs)