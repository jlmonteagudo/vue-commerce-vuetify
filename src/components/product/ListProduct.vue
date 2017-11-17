<template>
  <div>

    <h4>List Products</h4>

    <v-data-table
      :headers="headers"
      :items="products"
      :search="search"
      :pagination.sync="pagination"
      :total-items="totalItems"
      :loading="loading"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.description }}</td>
        <td>
          <v-btn flat icon color="light-blue darken-1" :to="`product/${props.item.id}/edit`">
            <v-icon>mode_edit</v-icon>
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

  </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        search: '',
        totalItems: 0,
        items: [],
        pagination: {},
        headers: [
          { text: 'Title', align: 'left', value: 'title', sortable: false },
          { text: 'Description', align: 'left', value: 'description', sortable: false }
        ]
      }
    },
    watch: {
      pagination: {
        handler () {
          console.log('paginating...')
          this.findAllProducts()

          /*
          this.getDataFromApi()
            .then(data => {
              this.items = data.items
              this.totalItems = data.total
            })
          */
        },
        deep: true
      }
    },
    mounted () {
      // this.findAllProducts()
    },
    computed: {
      ...mapGetters({
        products: 'product/products',
        loading: 'product/loading'
      })
    },
    methods: {
      ...mapActions({
        findAllProducts: 'product/findAll'
      })
    }
  }
</script>

<style scope>
  table.table thead th {
    font-size: 1.1rem;
  }
</style>
