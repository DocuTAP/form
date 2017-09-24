<template>
  <md-button :class="schema.classes" class="md-raised md-accent" type="submit">{{ schema.text || 'Submit' }}</md-button>
</template>

<script>
export default {
  name: 'docutap-submit',
  props: {
    schema: {
      type: Object
    }
  }
}
</script>
