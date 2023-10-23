import bookingsApi from '../../apis/models/bookingsApi'
import { formatDate } from '../../utilities'

export default {
  async addBooking(payload) {
    const date = formatDate(payload.date)
    const session = payload.session

    // console.log(date)

    const index = this.bookingList.findIndex((booking) => {
      return booking.date === date
    })

    // console.log(bookingItem)

    if (index !== -1) {
      let slotEmpty = 0

      if (this.bookingList[index][session] && this.bookingList[index][session].length) {
        slotEmpty = 4 - this.bookingList[index][session]?.length
      } else {
        slotEmpty = 4
      }

      // đã tồn tại và full slot
      if (slotEmpty <= 0 || payload.quantity > slotEmpty) {
        // console.log('Không đủ máy trống vui lòng kiểm tra lại!')
        const error = new Error('Không đủ máy, đăng ký thất bại nhé!')
        throw error
        // đã tồn tại chưa full
      } else {
        console.log('cập nhật mảng đang có')

        if (slotEmpty === 4) {
          this.bookingList[index][session] = []
        }
        for (let i = 0; i < +payload.quantity; i++) {
          this.bookingList[index][session]?.push(payload.teacher)
        }

        const response = await bookingsApi.update(this.bookingList[index])

        if (response.status !== 200) {
          const error = new Error(response.message || 'Đặt lịch thất bại! hihi :)')
          throw error
        }
      }
    }

    // chưa tồn tại
    else {
      // console.log('push thêm vào booking list')
      const bookingData = {
        id: date,
        date,
        [session]: []
      }

      for (let i = 0; i < payload.quantity; i++) {
        bookingData[session].push(payload.teacher)
      }

      const response = await bookingsApi.update(bookingData)

      console.log(response)

      this.bookingList.push(bookingData)
    }
  },

  async loadBookingList() {
    const response = await bookingsApi.getAll()
    const responseData = await response.data
    const bookingsTmp = []

    for (const key in responseData) {
      const data = {
        id: key,
        date: key,
        morning: responseData[key]?.morning,
        noon: responseData[key]?.noon,
        afternoon: responseData[key]?.afternoon
      }

      bookingsTmp.push(data)
    }

    this.bookingList = bookingsTmp
  },

  async updateBooking(payload) {
    const { date, session, teacherList } = payload

    const index = this.bookingList.findIndex((booking) => booking.date === date)

    try {
      const response = await bookingsApi.update({ id: date, [session]: teacherList })

      if (response.status !== 200) {
        console.log('Error: ', response.error)
        const error = new Error(response.message || 'Cập nhật không thành công!')
        throw error
      }

      this.bookingList[index][session] = []
      teacherList.forEach((teacher) => {
        this.bookingList[index][session].push(teacher)
      })
    } catch (error) {
      console.log('error: ', error)
      throw new Error(error.message)
    }
  }
}
