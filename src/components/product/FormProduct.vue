<template>

    <v-form v-model="valid" ref="form" lazy-validation>

      <v-text-field
        label="Title"
        v-model="product.title"
        :rules="titleRules"
        required
      ></v-text-field>

      <v-text-field
        label="Description"
        v-model="product.description"
        :rules="descriptionRules"
        multi-line
        required
      ></v-text-field>      

      <v-text-field
        label="Short description"
        v-model="product.shortDescription"
        :rules="shortDescriptionRules"
        required
      ></v-text-field>

      <v-text-field
        label="Price"
        v-model="product.price"
        prefix="$"
        :rules="priceRules"
        required
      ></v-text-field>

      <v-btn color="primary" @click="submit" :disabled="!valid">Save
        <v-icon dark right>check_circle</v-icon>
      </v-btn>

      <v-btn color="red" dark @click="clear">Cancel
        <v-icon dark right>block</v-icon>
      </v-btn>

    </v-form>

</template>

<script>
  export default {
    props: {
      product: {
        type: Object,
        default: () => {
          return {
            title: '',
            description: '',
            shortDescription: '',
            price: ''
          }
        }
      }

    },
    data: () => ({
      valid: true,

      titleRules: [
        (v) => !!v || 'Title is required'
      ],
      descriptionRules: [
        (v) => !!v || 'Description is required'
      ],
      shortDescriptionRules: [
        (v) => !!v || 'Short description is required'
      ],
      priceRules: [
        (v) => !!v || 'Price is required',
        (v) => !isNaN(v) || 'Price must be a number',
        (v) => parseFloat(v) < 10000000 || 'Price must lower than 10.000.000'
      ]

    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.$emit('save', this.product)
        }
      },
      clear () {
        this.$emit('cancel')
      }
    }
  }
</script>
