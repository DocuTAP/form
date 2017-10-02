<template>
  <form class="docutap-form" novalidate @submit.prevent="validateBeforeSubmit">
    <component v-for="item in schemaItems" :key="item.name" :schema="item" :is="item.component" :model="model" :showErrors="showErrors"></component>
  </form>
</template>

<script>
export default {
  name: 'docutap-form',
  $validates: true,
  props: {
    model: {
      type: Object
    },
    schema: {
      type: Object
    }
  },
  data () {
    return {
      schemaItems: [],
      showErrors: false
    }
  },
  mounted () {
    this.schemaItems = this.schema.fields
      .map(item => {
        // Set name
        if (item.name === undefined) { item.name = this.camelize(item.label) }
        // Get component from type
        if (item.component === undefined) {
          if (['select', 'radio', 'checkboxes'].includes(item.type)) {
            item.component = `docutap-${item.type}`
          } else if (item.type === 'submit') {
            item.component = 'docutap-submit'
            item.input = false
            item.validator = false
          } else if (item.type === 'info') {
            item.component = 'docutap-info'
            item.input = false
            item.validator = false
          } else {
            item.component = 'docutap-input'
          }
        }
        // Set default validator
        if (item.validator === undefined) { item.validator = '' }
        // Set default type if input
        if (item.component === 'docutap-input' && item.type === undefined) { item.type = 'text' }
        // Create
        if (item.input !== false && this.model[item.name] === undefined) {
          if (item.type === 'checkboxes') {
            this.model[item.name] = {}
            const checkboxesModel = item.values.reduce((p, c) => {
              p[c] = false
              return p
            }, {})
            this.$set(this.model, item.name, checkboxesModel)
          } else {
            this.$set(this.model, item.name, '')
          }
        }

        return item
      })
    // Defaults to focusing on first input
    if (this.schema.autofocus !== false) {
      setTimeout(() => this.$el.querySelector('input').focus())
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit('submit')
          return
        }
        this.showErrors = true
        this.$el.querySelector(`*[data-vv-id="${this.$validator.errors.items[0].id}"]`).focus()
      })
    },
    camelize (str) {
      if (str === undefined) { return }
      return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return Boolean(index) === false ? letter.toLowerCase() : letter.toUpperCase()
      }).replace(/\s+/g, '')
    }
  }
}
</script>

<style>
  .docutap-form {
    margin: 80px auto;
    max-width: 500px !important;
  }
</style>
