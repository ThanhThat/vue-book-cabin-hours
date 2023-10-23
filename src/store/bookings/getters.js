export default {
  allBookings: (state) => state.bookingList,
  hasBooking: (state) => state.bookingList && state.bookingList.length > 0
}
