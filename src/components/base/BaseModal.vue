<template>
  <div class="modal" :class="{ show: isShow, fade: isShow }" :style="display" tabindex="-1">
    <transition name="fade">
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
    </transition>
  </div>
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

  computed: {
    display() {
      return this.isShow === true ? 'display: block' : 'display: none'
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
.modal {
  background-color: rgba(0 0 0 /0.8);
  transition: all 3s ease-in;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    transform 0.4s cubic-bezier(0.5, 0, 0.5, 1),
    opacity 0.4s linear;
}

.fade-enter-to,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
