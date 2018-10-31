
<template>
  <div id="list">
      <div class="fd-ui fd-ui--fundamental">
    <div class="fd-page">
	<header class="fd-page__header">
    <div class="fd-action-bar">
        <div class="fd-action-bar__back">
            <button class=" fd-button--secondary fd-button--compact sap-icon--nav-back" v-on:click="goBack"></button>
        </div>
        <div class="fd-action-bar__header">
          <h1 class="fd-action-bar__title">
              Tractor OverVue <img src="./assets/logo.png" style="width:25px">
          </h1>
        </div>
        
        <div class="fd-action-bar__actions">
            <button class="fd-button sap-icon--add" v-on:click="showModal">New Tractor</button>
        </div>
        
    </div>
</header>

	<div class="fd-page__content">
    <section class="fd-section">
        <div class="fd-panel">
            <div class="fd-panel__header">
                <h1 class="fd-panel__title">
                    Items ({{tractors.length}})
                </h1>
                <div class="fd-panel__actions">
                    <div class="fd-dropdown fd-dropdown--s">
                        <nav class="fd-dropdown__menu" aria-hidden="true" id="tf5QS710">
                            <ul class="fd-dropdown__list">
                                <li><a href="#" class="fd-dropdown__item">Option 1</a></li>
                                <li><a href="#" class="fd-dropdown__item">Option 2</a></li>
                                <li><a href="#" class="fd-dropdown__item">Option 3</a></li>
                            </ul>
                        </nav>
                    </div>
                    <button class="fd-button--toolbar fd-button--s sap-icon--filter" aria-controls="yQUnd326" aria-haspopup="true" aria-expanded="false" aria-label="Filter">Filter</button>
                    <div class="fd-button-group" role="group" aria-label="Show as">
                        <button class=" fd-button--grouped fd-button--s sap-icon--grid"></button>
                        <button class=" fd-button--grouped fd-button--s sap-icon--list" aria-pressed="true"></button>
                    </div>
                </div>
            </div>
            <div class="fd-panel__filters" aria-hidden="true" id="yQUnd326">
                <div class="fd-dropdown fd-dropdown--s">
                    <button class="fd-dropdown__control fd-button--toolbar fd-button--s" aria-controls="CVXoG110" aria-expanded="false" aria-haspopup="true">
                        Color
                    </button>
                    <nav class="fd-dropdown__menu" aria-hidden="true" id="CVXoG110">
                        <ul class="fd-dropdown__list">
                            <li><a href="#" class="fd-dropdown__item">Option 1</a></li>
                            <li><a href="#" class="fd-dropdown__item">Option 2</a></li>
                            <li><a href="#" class="fd-dropdown__item">Option 3</a></li>
                        </ul>
                        </nav>

                    </div>
                    <div class="fd-dropdown fd-dropdown--s">
                        <button class="fd-dropdown__control fd-button--toolbar fd-button--s" aria-controls="p7mxb212" aria-expanded="false" aria-haspopup="true">
                            Size
                        </button>
                        <nav class="fd-dropdown__menu" aria-hidden="true" id="p7mxb212">
                            <ul class="fd-dropdown__list">
                                <li><a href="#" class="fd-dropdown__item">Option 1</a></li>
                                <li><a href="#" class="fd-dropdown__item">Option 2</a></li>
                                <li><a href="#" class="fd-dropdown__item">Option 3</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="fd-panel__body fd-panel__body--bleed">
                    <table class="fd-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Edit in SAP Tractor Editor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="tractor in tractors" v-bind:key="tractor.name">
                                <td><a class="fd-has-font-weight-semi" v-on:click="gotToDetails(tractor.id)">{{tractor.name}}</a>
                                </td>
                                <td>{{tractor.description}}</td>
                                <td>
                                    <span class="fd-list-group__action">
                                        <button v-on:click="goToSAPProductManager(tractor.id)" class="fd-button--secondary sap-icon--edit" aria-label="Edit"></button>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="fd-panel__footer">
                    <div class="fd-pagination"></div>
                </div>
            </div>
        </section>
    </div>

</div>

</div>
    <Modal ref="myModalRef"></Modal>
  </div>

</template>

<script>
/* eslint-disable */
import HelloWorld from './components/HelloWorld.vue'
import LuigiClient from '@kyma-project/luigi-client';
import Modal from './Modal';
const tractorSrvUrl = 'https://tractor-srv.us-east.stage.cf.yaas.io/api/tractors';

export default {
  name: 'list',
  components: {
    Modal
  },
  data() {
    return {
      name : "",
      tractors : []
    }
  },
  created: function () {
    this.$http.get(tractorSrvUrl).then(response => {
        this.$data.tractors = response.body;
    });
  },
  methods: {
    goBack: ()=>{
        if(LuigiClient.linkManager().hasBack()) {
            LuigiClient.linkManager().goBack()
        } else {
            LuigiClient.linkManager().navigate('/home')
        }
    },
    showModal () {
        this.$refs.myModalRef.show()
    },
    gotToDetails: (id) => {
        LuigiClient.linkManager().navigate(`${id}`);
    },
    goToSAPProductManager : (id) => {
        LuigiClient.linkManager().withParams({id}).navigate(`/home/sapui5`, null, true);
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
