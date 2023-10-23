<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label for="teacher" class="form-label">Giáo viên</label>
      <input
        type="text"
        class="form-control"
        id="teacher"
        placeholder="Nhập tên giáo viên"
        v-model="teacher"
        required
      />
    </div>

    <div class="mb-3">
      <label for="dateLearn" class="form-label">Ngày học</label>
      <input type="date" class="form-control" id="dateLearn" v-model="date" required />
    </div>

    <div class="mb-3">
      <h6>Số lượng</h6>
      <select class="form-select" aria-label="Default select example" v-model="quantity" required>
        <option selected value="" disabled>Bấm vào đây để chọn số lượng</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>

    <div class="mb-3">
      <h6>Chọn buổi học</h6>
      <select class="form-select" aria-label="Default select example" v-model="session" required>
        <option selected value="" disabled>Bấm vào đây để chọn buổi</option>
        <option value="morning">Buổi sáng (7h - 10h)</option>
        <option value="noon">Buổi Trưa (10h30 - 13h30)</option>
        <option value="afternoon">Buổi tối (14h - 17h)</option>
      </select>
    </div>

    <button type="submit" class="btn btn-primary center">Đăng ký</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      teacher: '',
      date: '',
      quantity: null,
      session: ''
    }
  },

  methods: {
    submit() {
      const bookingData = {
        date: this.date,
        teacher: this.teacher,
        quantity: this.quantity,
        session: this.session
      }
      this.$emit('submit-form-add-booking', bookingData)
    }
  }
}
</script>

<style lang="scss" scoped>
input::placeholder {
  color: #fff;
}
</style>
