<template>
  <div>
    <h4>Edit Product</h4>
    <form-product @save="onSave($event)" @cancel="onCancel" :product="selectedProduct"></form-product>
  </div>
</template>

<script>
  import FormProduct from './FormProduct'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      FormProduct
    },

    created () {
      this.selectProduct(this.$route.params.id)
    },

    data: () => ({
    }),

    computed: {
      ...mapGetters({
        selectedProduct: 'product/selectedProduct'
      })
    },

    methods: {
      ...mapActions({
        insert: 'product/insert',
        findAll: 'product/findAll',
        showMessage: 'common/showMessage',
        selectProduct: 'product/selectProduct'
      }),
      onSave (product) {
        this.insert(product).then(() => {
          this.showMessage({text: 'Product has been saved', icon: 'info_outline', color: 'green'})
          this.findAll()
          this.$router.push('/product')
        })
      },
      onCancel () {
        this.$router.go(-1)
      }
    }

  }
</script>
