<template>
  <div class="hello">
    <img v-for="(item,i) of images" :key="i" v-lazy="item.image" parent=".hello" width="100" height="100" />
  </div>
</template>

<script>
import images from '../assets/imagesurl.json'
export default {
  name: 'HelloWorld',
  data () {
    return {
      images: images
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  width: 600px;
  height: 500px;
  overflow: auto
}
</style>
