<template>
  <div>

    <h4>List Products</h4>

    <v-data-table
      :headers="headers"
      :items="products"
      :pagination.sync="pagination"
      :total-items="totalNumberOfProducts"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.shortDescription }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td>

          <v-btn flat icon color="light-blue darken-1" :to="`product/${props.item.id}/edit`">
            <v-icon>mode_edit</v-icon>
          </v-btn>

          <v-btn flat icon color="red darken-1" @click.native.stop="confirmDeleteProduct(props.item.id)">
            <v-icon>delete</v-icon>
          </v-btn>

        </td>        
      </template>
    </v-data-table>

    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      :to="{path: 'product/new'}"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-dialog v-model="deleteProductDialog" max-width="290" persistent v-if="selectedProduct">
      <v-card>
        <v-card-title class="headline">Delete Product</v-card-title>
        <v-card-text>Are you sure you want to delete this product? <strong>{{ selectedProduct.title }}</strong></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="light-blue darken-1" flat @click="cancelDeleteProduct()">Cancel</v-btn>
          <v-btn color="red darken-1" flat @click="deleteProduct()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>

</template>

<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'

  export default {
    data () {
      return {
        deleteProductDialog: false,
        pagination: {
          rowsPerPage: 5,
          page: 1
        },
        headers: [
          { text: 'Id', align: 'left', value: 'id', sortable: false },
          { text: 'Title', align: 'left', value: 'title', sortable: false },
          { text: 'Description', align: 'left', value: 'shortDescription', sortable: false },
          { text: 'Price', align: 'right', value: 'price', sortable: false }
        ]
      }
    },
    watch: {
      pagination: {
        handler (after, before) {
          this.updatePagination(after)
          let navigation = after.page - before.page
          if (after.rowsPerPage !== before.rowsPerPage) navigation = 0

          switch (navigation) {
            case 0:
              this.find()
              break
            case 1:
              this.findNext()
              break
            case -1:
              this.findPrevious()
              break
          }
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters({
        products: 'product/products',
        totalNumberOfProducts: 'product/totalNumberOfProducts',
        loading: 'product/loading',
        selectedProduct: 'product/selectedProduct'
      })
    },
    methods: {
      ...mapActions({
        find: 'product/find',
        findNext: 'product/findNext',
        findPrevious: 'product/findPrevious',
        selectProduct: 'product/selectProduct',
        delete: 'product/delete',
        showMessage: 'common/showMessage'
      }),

      ...mapMutations({
        updatePagination: 'product/UPDATE_PAGINATION_DATA'
      }),

      confirmDeleteProduct (productId) {
        this.selectProduct(productId)
        this.deleteProductDialog = true
      },

      deleteProduct () {
        this.deleteProductDialog = false
        this.delete(this.selectedProduct).then(() => {
          this.showMessage({text: 'Product has been deleted', icon: 'info_outline', color: 'green'})
          this.pagination.page = 1
        })
      },

      cancelDeleteProduct () {
        this.deleteProductDialog = false
      }
    }
  }
</script>
