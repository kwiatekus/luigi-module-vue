<template>
  <div id="list" v-on:product="newProduct">
    <div class="fd-ui fd-ui--fundamental">
        <div class="fd-ui__app">
            <div class="fd-app">
                <main class="fd-app__main">
                    <img alt="Vue logo" src="./assets/logo.png" class="resize">
                    <HelloWorld :msg="name"/>
                    <section class="fd-section">
                        <div class="fd-action-bar">
                            <div class="fd-action-bar__back">
                                <button class=" fd-button--secondary fd-button--compact sap-icon--nav-back" v-on:click="goBack"></button>
                            </div>
                            <div class="fd-action-bar__header">
                                <h1 class="fd-action-bar__title">
                                    List of Products
                                </h1>
                                <p class="fd-action-bar__description"></p>
                            </div>
                            <div class="fd-action-bar__actions">
                                <button class="fd-button--main fd-button--l" v-on:click="showModal">+ New</button>
                            </div>
                        </div>
                        <table class="fd-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in items" v-bind:key="item.name">
                                    <td>
                                    
                                    <!-- <router-link to="/list/{{item.name}}"> -->
                                    <a class="fd-has-font-weight-semi" v-on:click="gotToDetails(item.name)">
                                        {{item.name}}
                                    </a>
                                    
                                    </td>
                                    <td>{{item.description}}</td>
                                    <td>
                                        <div class="fd-popover">
                                            <div class="fd-popover__control">
                                                <button class="fd-button--secondary sap-icon--vertical-grip" aria-controls="pQqQR213" aria-haspopup="true" aria-expanded="false" aria-label="More"></button>
                                            </div>
                                            <div class="fd-popover__body" aria-hidden="true" id="pQqQR213">
                                                <nav class="fd-menu">
                                                    <ul class="fd-menu__list">
                                                        <li><a href="#" class="fd-menu__item">Edit</a></li>
                                                        <li><a href="#" class="fd-menu__item">Lock</a></li>
                                                        <li><a href="#" class="fd-menu__item">Duplicate</a></li>
                                                        <li><a href="#" class="fd-menu__item">Delete</a></li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        </div>
        <Modal ref="myModalRef"></Modal>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import LuigiClient from '@kyma-project/luigi-client';
import Modal from './Modal';


export default {
  name: 'list',
  components: {
    HelloWorld,
    Modal
  },
  data() {
    return {
      name : "",
      items : [{
            name: "blue T-shirt",
            description: "It's not yellow, it's not pink either.."
        },{
            name: "Angry Unicorn",
            description: "It has a horn and it's not afraid to use it"
        },{
            name: "Book : 'Provisioning microservices to the front-end'",
            description: "Wait.. what?!"
        }]
    }
  },
  created: function () {
    LuigiClient.addInitListener((data)=>{
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
    goBack: ()=>{
        LuigiClient.linkManager().navigate('/home')
    },
    showModal () {
        this.$refs.myModalRef.show()
    },
    gotToDetails: (name) => {
        LuigiClient.linkManager().withParams({name: name}).navigate(`/home/external/vue/details`);
    },
    newProduct: ()=>{
        alert("new product")
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

.resize {
    float: left;
    width: 50px;
    height: auto;
}
</style>
