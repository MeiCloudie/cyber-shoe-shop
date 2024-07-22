import renderDuLieuGiay from "./util.js"

function layDanhSachGiay() {
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "GET",
  })

  promise
    .then((res) => {
      console.log(res.data.content)

      // Phân loại sản phẩm theo danh mục
      const arrGiayAdidas = res.data.content.filter((giay) => {
        const categories = JSON.parse(giay.categories)
        return categories.some((category) => category.category === "ADIDAS")
      })

      const arrGiayVansConverse = res.data.content.filter((giay) => {
        const categories = JSON.parse(giay.categories)
        return categories.some(
          (category) => category.category === "VANS_CONVERSE"
        )
      })

      const arrGiayNike = res.data.content.filter((giay) => {
        const categories = JSON.parse(giay.categories)
        return categories.some((category) => category.category === "NIKE")
      })

      // Hiển thị dữ liệu theo danh mục
      renderDuLieuGiay(arrGiayAdidas, "duLieuGiayAdidas")
      renderDuLieuGiay(arrGiayVansConverse, "duLieuGiayVansConverse")
      renderDuLieuGiay(arrGiayNike, "duLieuGiayNike")

      // Thêm sự kiện cho các nút bấm sau khi nội dung đã được thêm vào DOM
      addEventListeners()
    })
    .catch((err) => {
      console.log(err)
    })
}

layDanhSachGiay()

function xemChiTiet(id) {
  window.location.href = `http://127.0.0.1:5500/detail.html?id=${id}`
}

function addEventListeners() {
  const buttons = document.querySelectorAll(".btn-cart")
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id")
      xemChiTiet(id)
    })
  })
}
