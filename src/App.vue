<template>
  <div id="app" class="pt-3 bg-dark"><calendar-month></calendar-month></div>
</template>

<script>
import CalendarMonth from './pages/calendar/CalendarMonth.vue'

export default {
  components: {
    CalendarMonth
  }
}
</script>

<style lang="scss">
ul {
  list-style: none;
  padding: 0;
}

#app {
  // background-color: #fff2f2;
}
</style>
