<template>
  <div id="list">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="name"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import LuigiClient from '@kyma-project/luigi-client';

export default {
  name: 'list',
  components: {
    HelloWorld
  },
  data() {
    return {
      name : ""
    }
  },
  created: function () {
    LuigiClient.addInitListener((data)=>{
      console.log(data.token);
      this.$http.headers.common.Authorization = `Bearer ${data.token}`;
      this.$http.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${data.token}`
        }
      }).then(response => {
        this.name = response.body.name
      });
    });
  },
  methods: {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
