<template>
  <section class="container calendar">
    <!-- add book cabin 1 -->
    <base-modal
      title="Đăng ký học cabin"
      :isShow="isShowModalAddBooking"
      @close-modal-add-booking="closeModalAddBooking"
    >
      <template #body>
        <booking-form @submit-form-add-booking="addBooking"></booking-form>
      </template>
    </base-modal>

    <!-- add book cabin 2 -->
    <base-modal
      title="Đăng ký học cabin"
      :isShow="isShowModalAddBooking2"
      @close-modal-add-booking="closeModalAddBooking"
    >
      <template #body>
        <booking-form-two-field @add-booking="addBooking2"></booking-form-two-field>
      </template>
    </base-modal>

    <!-- Toast message -->
    <base-toast
      :show="isShowToast"
      :title="toastTitle"
      :description="toastDesc"
      :status="toastStatus"
      :time="toastTime"
      @close="closeToast"
    ></base-toast>

    <div class="row">
      <div class="col">
        <header class="calendar-header d-flex gap-1">
          <calendar-filter
            :current-month="currentMonth"
            :current-year="currentYear"
            @select-month="selectMonth"
            @open="openModalAddBooking"
            @filter="filterBooking"
            @refresh="refreshBookList"
          ></calendar-filter>
        </header>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <section class="calendar-content mt-3 bg-dark">
          <calendar-week></calendar-week>
          <ul class="calendar-day-list mt-0">
            <calendar-day-item
              v-for="(day, index) in listDayOfMonth"
              :key="index"
              :class="{ 'd-flex justify-content-center align-items-center': isLoading }"
            >
              <base-spinner v-if="isLoading"></base-spinner>
              <section v-else>
                <header class="header-day-item d-flex justify-content-end align-items-center mt-1">
                  <span :class="{ 'day-item': day }" v-if="typeof day === 'object'">{{
                    day.date.slice(0, 2)
                  }}</span>
                  <span :class="{ 'day-item': day }" v-else>{{ day }}</span>
                </header>

                <section v-show="day" class="booking-list" @click="showModalBooking">
                  <div
                    class="card mb-3"
                    v-show="
                      this.mode === 'had' && day?.morning?.length > 0
                        ? true
                        : this.mode === 'empty' && (!day?.noon?.length || day?.noon?.length < 4)
                        ? true
                        : this.mode === 'all'
                        ? true
                        : false
                    "
                  >
                    <div
                      class="card-header bg-black text-white d-flex justify-content-between align-items-center"
                    >
                      <a
                        class="session flex-grow-1"
                        data-bs-toggle="collapse"
                        :href="`#day-morning-${index}`"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        Sáng
                      </a>
                      <div class="card-header-controls me-1 d-flex gap-2 align-items-center">
                        <a
                          class="text-light"
                          v-if="!day?.morning || day?.morning?.length < 4"
                          @click="showModalAddBooking2('morning', day.id || listDayOfMonth[index])"
                        >
                          <i class="fa-solid fa-plus"></i>
                        </a>
                        <a
                          class="text-light"
                          data-bs-toggle="collapse"
                          :href="`#day-morning-${index}`"
                          @click="setCurrentDayAndSession(day.date, 'morning')"
                        >
                          <i class="fa-solid fa-pen-to-square"></i
                        ></a>
                      </div>
                      <span
                        class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger ms-3"
                        v-if="day.morning?.length > 0"
                      >
                        {{ day.morning.length }}
                        <span class="visually-hidden">slot cabin</span>
                      </span>
                      <span
                        class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success ms-3"
                        v-else
                      >
                        0
                        <span class="visually-hidden">slot cabin</span>
                      </span>
                    </div>

                    <ul
                      class="list-group list-group-flush collapse"
                      :id="`day-morning-${index}`"
                      v-if="!currentDay"
                    >
                      <li
                        class="list-group-item bg-dark p-1 text-white d-flex justify-content-between ps-2 pe-2"
                        v-for="(booking, index) in day['morning']"
                        :key="index"
                      >
                        <span>{{ booking }}</span>
                        <span
                          class="trash-teacher"
                          @click="deleteSlotCabin(day.id, 'morning', index)"
                        >
                          <i class="fa-solid fa-trash-can"></i>
                        </span>
                      </li>
                    </ul>
                    <form
                      @submit.prevent="changeTeacher(day.id, 'morning')"
                      v-else-if="
                        day.date &&
                        day.date.length >= 0 &&
                        currentDay === day.date.slice(0, 2) &&
                        currentSession === 'morning' &&
                        day['morning']?.length > 0
                      "
                    >
                      <ul class="list-group list-group-flush">
                        <li
                          class="list-group-item bg-dark p-0"
                          v-for="(booking, index) in day['morning']"
                          :key="index"
                        >
                          <input
                            type="text"
                            class="form-control bg-transparent text-white p-1"
                            :value="booking"
                            :ref="`morning-${day.id}`"
                            required
                          />
                        </li>
                      </ul>
                      <button type="submit" class="btn btn-primary btn-sm">OK</button>

                      <button class="btn btn-secondary btn-sm ms-1" @click="currentDay = null">
                        Cancel
                      </button>
                    </form>
                  </div>

                  <div
                    class="card mb-3"
                    v-show="
                      this.mode === 'had' && day?.noon?.length > 0
                        ? true
                        : this.mode === 'empty' && (!day?.noon?.length || day?.noon?.length < 4)
                        ? true
                        : this.mode === 'all'
                        ? true
                        : false
                    "
                  >
                    <div
                      class="card-header bg-black text-white d-flex justify-content-between align-items-center"
                    >
                      <a
                        class="session flex-grow-1"
                        data-bs-toggle="collapse"
                        :href="`#day-noon-${index}`"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        Trưa
                      </a>

                      <div class="card-header-controls me-1 d-flex gap-2 align-items-center">
                        <a
                          class="text-light"
                          v-if="!day?.noon || day?.noon?.length < 4"
                          @click="showModalAddBooking2('noon', day.id || listDayOfMonth[index])"
                        >
                          <i class="fa-solid fa-plus"></i>
                        </a>
                        <a
                          class="text-light"
                          data-bs-toggle="collapse"
                          :href="`#day-noon-${index}`"
                          @click="setCurrentDayAndSession(day.date, 'noon')"
                        >
                          <i class="fa-solid fa-pen-to-square"></i
                        ></a>
                      </div>
                      <span
                        class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger ms-3"
                        v-if="day.noon?.length > 0"
                      >
                        {{ day?.noon?.length }}
                        <span class="visually-hidden">slot cabin</span>
                      </span>
                      <span
                        class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success ms-3"
                        v-else
                      >
                        0
                        <span class="visually-hidden">slot cabin</span>
                      </span>
                    </div>

                    <ul
                      class="list-group list-group-flush collapse"
                      :id="`day-noon-${index}`"
                      v-if="!currentDay"
                    >
                      <li
                        class="list-group-item bg-dark p-1 text-white d-flex justify-content-between ps-2 pe-2"
                        v-for="(booking, index) in day['noon']"
                        :key="index"
                      >
                        <span> {{ booking }}</span>

                        <span class="trash-teacher" @click="deleteSlotCabin(day.id, 'noon', index)">
                          <i class="fa-solid fa-trash-can"></i>
                        </span>
                      </li>
                    </ul>
                    <form
                      @submit.prevent="changeTeacher(day.id, 'noon')"
                      v-else-if="
                        day.date &&
                        day.date.length >= 0 &&
                        currentDay === day.date.slice(0, 2) &&
                        currentSession === 'noon' &&
                        day['noon']?.length > 0
                      "
                    >
                      <ul class="list-group list-group-flush">
                        <li
                          class="list-group-item bg-dark p-0"
                          v-for="(booking, index) in day['noon']"
                          :key="index"
                        >
                          <input
                            type="text"
                            class="form-control bg-transparent text-white p-1"
                            :value="booking"
                            :ref="`noon-${day.id}`"
                            required
                          />
                        </li>
                      </ul>
                      <button type="submit" class="btn btn-primary btn-sm">OK</button>

                      <button class="btn btn-secondary btn-sm ms-1" @click="currentDay = null">
                        Cancel
                      </button>
                    </form>
                  </div>

                  <div
                    class="card mb-1"
                    v-show="
                      this.mode === 'had' && day?.afternoon?.length > 0
                        ? true
                        : this.mode === 'empty' &&
                          (!day?.afternoon?.length || day?.afternoon?.length < 4)
                        ? true
                        : this.mode === 'all'
                        ? true
                        : false
                    "
                  >
                    <div
                      class="card-header bg-black text-white d-flex justify-content-between align-items-center"
                      @click="showHideDetailBooking"
                    >
                      <a
                        class="session flex-grow-1"
                        data-bs-toggle="collapse"
                        :href="`#day-afternoon-${index}`"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        Chiều
                      </a>

                      <div class="card-header-controls me-1 d-flex gap-2 align-items-center">
                        <a
                          class="text-light"
                          v-if="!day?.afternoon || day?.afternoon?.length < 4"
                          @click="
                            showModalAddBooking2('afternoon', day.id || listDayOfMonth[index])
                          "
                        >
                          <i class="fa-solid fa-plus"></i>
                        </a>
                        <a
                          class="text-light"
                          data-bs-toggle="collapse"
                          :href="`#day-morning-${index}`"
                          @click="setCurrentDayAndSession(day.date, 'afternoon')"
                        >
                          <i class="fa-solid fa-pen-to-square"></i
                        ></a>
                      </div>
                      <span
                        class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger ms-3"
                        v-if="day.afternoon?.length > 0"
                      >
                        {{ day.afternoon?.length }}
                        <span class="visually-hidden">slot cabin</span>
                      </span>
                      <span
                        class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success ms-3"
                        v-else
                      >
                        0
                        <span class="visually-hidden">slot cabin</span>
                      </span>
                    </div>

                    <ul
                      class="list-group list-group-flush collapse"
                      :id="`day-afternoon-${index}`"
                      v-if="!currentDay"
                    >
                      <li
                        class="list-group-item bg-dark p-1 text-white d-flex justify-content-between ps-2 pe-2"
                        v-for="(booking, index) in day['afternoon']"
                        :key="index"
                      >
                        <span> {{ booking }}</span>

                        <span
                          class="trash-teacher"
                          @click="deleteSlotCabin(day.id, 'afternoon', index)"
                        >
                          <i class="fa-solid fa-trash-can"></i>
                        </span>
                      </li>
                    </ul>
                    <form
                      @submit.prevent="changeTeacher(day.id, 'afternoon')"
                      v-else-if="
                        day.date &&
                        day.date.length >= 0 &&
                        currentDay === day.date.slice(0, 2) &&
                        currentSession === 'afternoon' &&
                        day['afternoon']?.length > 0
                      "
                    >
                      <ul class="list-group list-group-flush">
                        <li
                          class="list-group-item bg-dark p-0"
                          v-for="(booking, index) in day['afternoon']"
                          :key="index"
                        >
                          <input
                            type="text"
                            class="form-control bg-transparent text-white p-1"
                            :value="booking"
                            :ref="`afternoon-${day.id}`"
                            required
                          />
                        </li>
                      </ul>
                      <button type="submit" class="btn btn-primary btn-sm">OK</button>

                      <button class="btn btn-secondary btn-sm ms-1" @click="currentDay = null">
                        Cancel
                      </button>
                    </form>
                  </div>
                </section>
              </section>
            </calendar-day-item>
          </ul>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { mapStores } from 'pinia'
import useBookingsStore from '@/store/bookings'
import useAuthStore from '@/store/auth'
import { formatDate } from '@/utilities'

import CalendarFilter from '../../components/calendar/CalendarFilter.vue'
import CalendarWeek from '../../components/calendar/CalendarWeek.vue'
import CalendarDayItem from '../../components/calendar/CalendarDayItem.vue'
import BookingForm from '../../components/booking/BookingForm.vue'
import BookingFormTwoField from '../../components/booking/BookingFormTwoField.vue'

export default {
  components: {
    CalendarFilter,
    CalendarWeek,
    CalendarDayItem,
    BookingForm,
    BookingFormTwoField
  },

  data() {
    return {
      isLoading: false,
      currentId: null,
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      currentMonth: null,
      currentYear: null,
      daySelected: {},
      isShowModalAddBooking: false,
      isShowModalAddBooking2: false,
      currentDay: null,
      currentSession: null,
      isShowToast: false,
      toastTitle: '',
      toastDesc: '',
      toastStatus: false,
      toastTime: 11,
      downloadTimer: null,
      mode: 'all',
      listDay: []
    }
  },

  created() {
    this.setCurrentMonth()
    this.setCurrentYear()
    this.loadBookingList()
    this.verifyRefreshToken()
  },

  computed: {
    ...mapStores(useBookingsStore, useAuthStore),

    endDayOfMonth() {
      return new Date(this.currentYear, this.currentMonth, 0).getDate()
    },

    startDayOfMonth() {
      return new Date(this.currentYear, this.currentMonth - 1, 1).getDay()
    },

    allBooking() {
      return this.bookingsStore.bookingList
    },

    listDayOfMonth() {
      const listDayCopy = []
      for (let i = 1; i <= this.endDayOfMonth; i++) {
        let day = i.toString()

        if (i < 10) {
          day = 0 + day
        }

        const date = formatDate(`${this.currentYear}-${this.currentMonth}-${day}`)

        const booking = this.bookingsStore.bookingList.find((booking) => {
          return booking.id === date
        })

        if (!booking) {
          listDayCopy.push(i)
        } else {
          listDayCopy.push(booking)
        }
      }

      if (this.startDayOfMonth === 0) {
        for (let i = 0; i < 6; i++) {
          listDayCopy.unshift('')
        }
      } else if (this.startDayOfMonth > 0) {
        for (let i = 0; i < this.startDayOfMonth - 1; i++) {
          listDayCopy.unshift('')
        }
      }

      const endDay = new Date(this.currentYear, this.currentMonth - 1, this.endDayOfMonth).getDay()

      if (endDay < 6) {
        for (let i = 0; i < 6 - endDay; i++) {
          listDayCopy.push('')
        }
      }

      return listDayCopy
    },

    hasBooking() {
      return !this.isLoading && this.bookingsStore.hasBooking
    }
  },

  methods: {
    selectMonth(month) {
      this.currentMonth = month
    },

    setCurrentMonth() {
      this.currentMonth = +this.months[new Date().getMonth()]
    },

    setCurrentYear() {
      this.currentYear = new Date().getFullYear()
    },

    openModalAddBooking() {
      this.isShowModalAddBooking = true
    },

    closeModalAddBooking() {
      this.isShowModalAddBooking = false
      this.isShowModalAddBooking2 = false
      this.currentId = null
      this.currentSession = null
    },

    async addBooking(bookingData) {
      try {
        await this.bookingsStore.addBooking(bookingData)
        this.toastTitle = 'Thành công'
        this.toastDesc = 'Đặt lịch thành công!'
        this.toastStatus = true
      } catch (error) {
        this.toastTitle = 'Thất bại'
        this.toastDesc = error.message
        this.toastStatus = false
      }

      this.isShowToast = true
      this.timer()
      this.toastTime = 11
    },

    async showModalAddBooking2(session, id) {
      this.currentId = id
      this.currentSession = session

      this.isShowModalAddBooking2 = true
    },

    async addBooking2(formData) {
      const bookingData = {
        id: this.currentId,
        month: this.currentMonth,
        year: this.currentYear,
        session: this.currentSession,
        teacher: formData.teacher,
        quantity: formData.quantity
      }

      this.bookingsStore.addBooking2(bookingData)
    },

    async loadBookingList() {
      this.isLoading = true
      try {
        await this.bookingsStore.loadBookingList()
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    },

    async changeTeacher(id, session) {
      this.isShowToast = false
      const teacherElem = this.$refs[session + '-' + id]
      const bookingData = {
        teacherList: [],
        session,
        date: id
      }
      teacherElem.forEach((teacher) => {
        bookingData.teacherList.push(teacher.value)
      })

      try {
        await this.bookingsStore.updateBooking(bookingData)
        this.toastTitle = 'Thành công'
        this.toastDesc = 'Cập nhật thành công!'
        this.toastStatus = true
        this.currentDay = null
        this.currentSession = null
      } catch (error) {
        this.toastTitle = 'Thất bại'
        this.toastDesc = error.message || 'Lỗi cập nhật!'
        this.toastStatus = false
      }

      this.isShowToast = true
      this.timer()
      this.toastTime = 11
    },

    setCurrentDayAndSession(date, session) {
      this.currentDay = date?.slice(0, 2)
      this.currentSession = session
      this.clearTimer()
      this.isShowToast = false
    },

    timer() {
      this.downloadTimer = setInterval(() => {
        if (this.toastTime === 0) {
          clearInterval(this.downloadTimer)
          this.isShowToast = false
        }
        --this.toastTime
      }, 1000)

      this.toastTime = 11
    },

    clearTimer() {
      clearInterval(this.downloadTimer)
    },

    closeToast() {
      this.clearTimer()
      this.toastTime = 11
      this.isShowToast = false
    },

    deleteSlotCabin(id, session, pos) {
      const payload = { id, session, pos }
      this.bookingsStore.deleteOne(payload)
    },

    filterBooking(mode) {
      this.mode = mode
    },

    async refreshBookList() {
      this.isLoading = true
      try {
        await this.bookingsStore.loadBookingList()
      } catch (error) {
        console.log(error)
      }
      this.isLoading = false
    },

    async verifyRefreshToken() {
      try {
        await this.authStore.verifyRefreshToken()
      } catch (error) {
        localStorage.removeItem('refreshToken')
        this.authStore.refreshToken = null
        this.$router.push('/auth')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-content {
  border: 0.5px solid #fff;
}
.calendar-day-list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0;
  transition: all 0.25s ease;
}

.header-day-item {
  position: relative;
  margin: 0;
}

.day-item {
  position: absolute;
  top: 2px;
  left: 2px;
  background-color: #ad1313;
  color: #fff;
  display: block;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
}

// Booking list
.booking-list {
  margin-top: 32px;
  font-size: 14px;
  padding: 6px 4px;
  h3 {
    font-size: 14px;
    font-weight: 700;
    text-align: center;
  }
}

.card {
  background-color: #000;
  border: 0.5px solid #fff;

  &-header {
    padding: 0;
  }
}

.session {
  text-decoration: none;
  color: #fff;
  display: block;
  height: inherit;
  padding: 6px 8px;
}

.list-group-item {
  input::placeholder {
    color: red;
    font-size: 14px;
  }

  input {
    border: none;
  }
}

.trash-teacher {
  color: #000;
  font-size: 16px;

  i {
    transition: all 0.25s ease-out;
  }

  i:hover {
    color: #fff;
    transform: scale(1.2);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s linear;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
