<script>
import Header from './components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>

<template>
  <div class="bg-gray-900 text-white h-screen">
  <Header></Header>
    <router-view></router-view>
  </div>
</template>
