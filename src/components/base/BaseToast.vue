<template>
  <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 999999999">
    <div
      id="liveToast"
      class="toast"
      :class="{ show: show, hide: !show }"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      v-if="show"
    >
      <div class="toast-header">
        <span class="text-primary me-1" v-if="status"
          ><i class="fa-solid fa-circle-check"></i
        ></span>
        <span class="text-danger me-1" v-else><i class="fa-solid fa-bomb"></i></span>

        <strong class="me-auto">{{ title }}</strong>
        <small>Biến mất sau {{ time }} giây</small>

        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="close()"
        ></button>
      </div>
      <div class="toast-body">{{ description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    status: {
      type: Boolean,
      default: false
    },

    time: {
      type: Number,
      default: 11
    }
  },

  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped></style>
