<template>
    <div class="container">
        <div class="row">
            <h1>Drag The Links Below to Your Browser's Bookmark Bar</h1>
        </div>
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <Bookmarklet init-url="{{serverUrl}}"
                             init-name="Testing"/>
            </div>
        </div>
    </div>


</template>

<script>

import {serverUrl} from "../config/config.env";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Bookmarklet from './components/Bookmarklet.vue'

export default {
  name: 'App',
  components: {
    Bookmarklet
  },
    data(){
      return {
          serverUrl
      }
    }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
