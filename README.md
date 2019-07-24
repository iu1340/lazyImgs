# lazyImgs
针对dom内部的图片实现懒加载
# USE
```
// main.js
import LazyImgs from 'lazyimgs'

Vue.use(LazyImgs)

// vue file
<img v-lazy="img-path" parent="class/id">
```