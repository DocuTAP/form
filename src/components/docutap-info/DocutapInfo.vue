<template>
  <div class="docutap-info" :class="[themeClass]" :disabled="disabled">
    <img v-if="schema.image" :src="schema.image">
    <p v-if="schema.text || schema.label" class="intro-content">{{ schema.text || schema.label }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      schema: {
        type: Object
      }
    }
  };
</script>

<style src="./DocutapInfo.css" scoped>
  .docutap-info {
    padding-top: 2em;
  }
</style>
