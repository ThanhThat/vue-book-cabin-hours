<template>
  <ul class="calendar-week bg-black">
    <li v-for="day in days" :key="day.id">
      <div>{{ day.day }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      days: [
        { id: 0, day: 'Chủ nhật' },
        { id: 1, day: 'Thứ hai' },
        { id: 2, day: 'Thứ ba' },
        { id: 3, day: 'Thứ tư' },
        { id: 4, day: 'Thứ năm' },
        { id: 5, day: 'Thứ sáu' },
        { id: 6, day: 'Thứ bảy' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-week {
  position: sticky;
  top: 0px;
  background-color: #fff;
  z-index: 999;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 0.5px solid #fff;
  font-size: 16px;
  color: #fff;
  margin-bottom: 0;

  li {
    border-right: 0.5px solid #fff;
    border-left: 0.5px solid #fff;
    text-align: center;
    font-weight: bold;
    display: block;
    padding: 6px 0;
  }

  li:last-child {
    border-right: none;
  }

  li:first-child {
    border-left: none;
  }
}
</style>
