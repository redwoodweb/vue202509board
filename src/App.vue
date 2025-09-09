<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
export default {
  name: "App",
  components: {
    Navbar,
    Footer
  }
}
</script>
<style lang="scss">
@charset "UTF-8";
@import "./assets/scss/font";
@import "./assets/scss/initial";
@import "./assets/scss/components/select_box";
@import "./assets/scss/general_ui";
@import "./assets/scss/common";
@import "./assets/scss/layout";
</style>
