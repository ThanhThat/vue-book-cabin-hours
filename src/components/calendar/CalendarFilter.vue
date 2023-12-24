<template>
  <!-- Example split danger button -->
  <div class="row">
    <div class="col d-flex gap-2">
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
        <button class="btn btn-dark border-white border-1" @click="decrease(currentYear)">-</button>
        <button type="button" class="btn btn-dark border-white border-1">
          năm {{ currentYear }}
        </button>
        <button class="btn btn-dark border-white border-1" @click="ascending(currentYear)">
          +
        </button>
      </div>

      <button class="btn btn-dark border-1 border-white" @click="openModalAddBooking()">Add</button>

      <div class="dropdown">
        <button
          class="btn btn-dark border-1 border-white dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          data-bs-toggle="dropdown"
        >
          Hiển Thị {{ displayFilter }} <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
          <li><a class="btn w-100" href="#" @click="filterMode('all')">Tất cả</a></li>
          <li><a class="btn w-100" href="#" @click="filterMode('empty')">Trống</a></li>
          <li><a class="btn w-100" href="#" @click="filterMode('had')">Đã đặt</a></li>
        </ul>
      </div>
      <div class="btn btn-dark border-1 border-white" @click="refresh">Refresh</div>
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
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      filterVal: 'all'
    }
  },

  computed: {
    displayFilter() {
      if (this.filterVal === 'all') return 'Tất cả'
      if (this.filterVal === 'empty') return 'Trống'
      if (this.filterVal === 'had') return 'Đã đặt'

      return ''
    }
  },
  methods: {
    chooseMonth(month) {
      this.$emit('selectMonth', month)
    },

    openModalAddBooking() {
      this.$emit('open')
    },

    filterMode(mode) {
      this.filterVal = mode
      this.$emit('filter', mode)
    },

    refresh() {
      this.$emit('refresh')
    },

    ascending(currentYear) {
      this.$emit('ascending', currentYear)
    },

    decrease(currentYear) {
      this.$emit('decrease', currentYear)
    }
  }
}
</script>

<style lang="scss" scoped></style>
