import bookingsApi from '../../apis/models/bookingsApi'
import { formatDate, generateDate } from '../../utilities'

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

  async addBooking2(payload) {
    let { id, month, year, session, teacher, quantity } = payload
    let bookingItem = this.bookingList.find((item) => item.id === id)
    let slotEmpty = 4

    if (bookingItem) {
      const slotHad = bookingItem[session]?.length || 0
      slotEmpty -= slotHad

      if (slotEmpty < quantity) {
        const error = new Error(
          `Chỉ còn trống ${slotEmpty} mà bạn đặt tới ${quantity} máy, vui lòng tính toán lại nhé!`
        )
        throw error
      }

      if (!bookingItem[session]) {
        bookingItem[session] = []
      }

      for (let i = 0; i < quantity; i++) {
        bookingItem[session].push(teacher)
      }

      const response = await bookingsApi.update(bookingItem)

      if (response.status !== 200) {
        const error = new Error(response.message || 'Đặt lịch không thành công!')
        throw error
      }
    }

    if (!bookingItem) {
      const day = id.split('-')[0]
      month = month < 10 ? `0${month}` : month
      console.log(month)

      const generateId = generateDate(day, month, year)
      bookingItem = {
        id: generateId,
        date: generateId,
        [session]: []
      }

      for (let i = 0; i < quantity; i++) {
        bookingItem[session].push(teacher)
      }

      this.bookingList.push(bookingItem)

      const response = await bookingsApi.update(bookingItem)

      if (response.status !== 200) {
        const error = new Error(response.message || 'Thêm không thành công!')
        throw error
      }
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
  },

  async deleteOne(payload) {
    const { id, session, pos } = payload

    const index = this.bookingList.findIndex((booking) => booking.id === id)

    this.bookingList[index][session].splice(pos, 1)

    const response = await bookingsApi.update({ id, [session]: this.bookingList[index][session] })

    if (response.status !== 200) {
      console.log(response.message)
    }
  }
}
