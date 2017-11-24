<template>
  <div>
    <h4>New Product</h4>
    <form-product @save="onSave($event)" @cancel="onCancel"></form-product>
  </div>
</template>

<script>
  import FormProduct from './FormProduct'
  import { mapActions } from 'vuex'

  export default {
    components: {
      FormProduct
    },
    data: () => ({
    }),
    methods: {
      ...mapActions({
        insert: 'product/insert',
        find: 'product/find',
        showMessage: 'common/showMessage'
      }),
      onSave (product) {
        this.insert(product).then(() => {
          this.showMessage({text: 'Product has been saved', icon: 'info_outline', color: 'green'})
          this.find()
          this.$router.push('/product')
        })
      },
      onCancel () {
        this.$router.go(-1)
      }
    }
  }
</script>
