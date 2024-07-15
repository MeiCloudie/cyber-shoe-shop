function handleBackToTopEvent() {
  // Tạo alias cho document.querySelector để viết ngắn gọn hơn
  const $ = document.querySelector.bind(document)

  // Lưu trữ các class vào biến
  const backToTop = $(".backToTop")

  // ----XỬ LÝ NÚT BACK TO TOP----
  document.onscroll = function () {
    // Lấy vị trí scroll hiện tại của trang
    var scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop

    if (scrollTop >= 400) {
      backToTop.classList.add("active")
    } else {
      backToTop.classList.remove("active")
    }
  }
}

handleBackToTopEvent()
