<template>
  <div class="mb-3">
    <label class="form-label">{{ label }}</label>
    <input v-bind="$attrs" @input="onInput" class="form-control" />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    label: String,
    inputId: String
  },

  methods: {
    onInput(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
