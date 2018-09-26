<template>
  <div id="details" >
    <div class="fd-ui fd-ui--fundamental">
        <div class="fd-ui__app">
            <div class="fd-app">
                <main class="fd-app__main">
                    <section class="fd-section">
                        <div class="fd-action-bar">
                            <div class="fd-action-bar__back">
                                <button class=" fd-button--secondary fd-button--compact sap-icon--nav-back" v-on:click="goBackToList"></button>
                            </div>
                            <div class="fd-action-bar__header">
                                <h1 class="fd-action-bar__title">
                                    {{ $route.params.name }}
                                </h1>
                            </div>
                            <div class="fd-action-bar__actions">
                                <button class="fd-button--main fd-button--l">Delete</button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import LuigiClient from '@kyma-project/luigi-client';


export default {
  name: 'Details',
  components: {
    
  },
  data() {
    return {
      
    }
  },
  created: function () {
    LuigiClient.addInitListener((data)=>{
        this.nodeParams =
        Object.keys(LuigiClient.getNodeParams()).length > 0
          ? LuigiClient.getNodeParams()
          : null;
          // eslint-disable-next-line
         console.log(this.nodeParams); 
         // eslint-disable-next-line
         console.log(data); 
    });
  },
  methods: {
    goBackToList: ()=>{
        LuigiClient.linkManager().goBack()
    }
  }
}
</script>

<style>
@import 'https://unpkg.com/fundamental-ui@1.2.0/dist/fundamental-ui.min.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
