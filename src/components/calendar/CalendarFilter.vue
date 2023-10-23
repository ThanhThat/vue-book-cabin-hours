<template>
  <!-- Example split danger button -->
  <div class="row">
    <div class="col">
      <div class="btn-group">
        <button type="button" class="btn btn-dark border-1 border-white">
          Tháng {{ currentMonth }}
        </button>
        <button
          type="button"
          class="btn btn-dark border-1 border-white dropdown-toggle dropdown-toggle-split"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="visually-hidden">dropdown</span>
        </button>
        <ul class="dropdown-menu">
          <li v-for="month in months" :key="month">
            <a class="dropdown-item" href="#" @click="chooseMonth(month)">{{ month }}</a>
          </li>
        </ul>
      </div>

      <div class="btn-group">
        <button type="button" class="btn btn-dark border-white border-1">
          năm {{ currentYear }}
        </button>
      </div>

      <button class="btn btn-dark border-1 border-white" @click="openModalAddBooking()">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentMonth: {
      type: Number,
      required: true
    },

    currentYear: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  },

  methods: {
    chooseMonth(month) {
      this.$emit('selectMonth', month)
    },

    openModalAddBooking() {
      this.$emit('open')
    }
  }
}
</script>

<style lang="scss" scoped></style>
