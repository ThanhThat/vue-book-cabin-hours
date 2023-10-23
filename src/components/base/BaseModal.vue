<template>
  <transition>
    <div class="modal" :class="{ show: isShow, fade: isShow, display: isShow }" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="close()"
            ></button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },

    title: {
      type: String,
      required: true
    }
  },

  methods: {
    close() {
      this.$emit('closeModalAddBooking')
    }
  }
}
</script>

<style lang="scss" scoped>
.display {
  display: block;
}

.modal {
  background-color: rgba(0 0 0 /0.8);
}
</style>
