<template>
  <form @submit.prevent="addBooking2">
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="floatingInput"
        placeholder="Tên giáo viên"
        v-model="nameTeacher"
        required
      />
      <label for="floatingInput" class="text-black">Giáo viên</label>
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

    <button class="btn btn-primary">Add</button>
  </form>
</template>

<script></script>

<style lang="scss" scoped></style>
