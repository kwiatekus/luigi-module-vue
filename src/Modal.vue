<template>
  <div v-if="visible" class="fd-ui__overlay fd-overlay fd-overlay--modal" aria-hidden="false">
    <div class="fd-modal" role="dialog">
      <div class="fd-modal__content" role="document">
        <header class="fd-modal__header">
          <slot name="header">
            <h1 class="fd-modal__title">New Tractor</h1>
            <button @click="hide" class=" fd-button--secondary fd-modal__close"></button>
          </slot>
        </header>
        <div class="fd-modal__body">
            <div class="fd-modal__body">
                <div class="fd-form__group">
                    <div class="fd-form__item">
                        <label class="fd-form__label is-required" for="input-2">Name</label>
                        <input class="fd-form__control" type="text" id="input-2" v-model="name">
                    </div>
                </div>
                <div class="fd-form__group">
                    <div class="fd-form__item">
                        <label class="fd-form__label" for="input-2">Description</label>
                        <input class="fd-form__control" type="text" id="input-2" v-model="description">
                    </div>
                </div>
            </div>
        </div>
        <footer class="fd-modal__footer">
          <slot name="footer">
            <div class="fd-modal__actions">
              <button @click="hide" class=" fd-button--secondary">Cancel</button>
              <button @click="create" class="fd-button--main fd-button--l fd-button--primary">Create</button>
            </div>
          </slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import LuigiClient from '@kyma-project/luigi-client';

  export default {
    name: "Modal",
    data: () => ({
      visible: false,
      name: '',
      description: ''
    }),
    methods: {
      show () {
        this.visible = true
        this.luigiClient.uxManager().addBackdrop();
      },
      hide () {
        this.visible = false
        this.luigiClient.uxManager().removeBackdrop();
      },
      create() {
          this.$emit('product', {name: this.$data.name, description: this.$data.description})
          this.hide();
      }
    },
    mounted () {
      this.luigiClient = LuigiClient;
    }
  }
</script>

<style lang="css" scoped>

  @import 'https://unpkg.com/fundamental-ui@1.2.0/dist/fundamental-ui.min.css';
    
</style>
