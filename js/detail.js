import renderDuLieuGiay from "./util.js"

// Hàm để lấy giá trị 'id' từ URL
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&")
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

// Lấy 'id' từ URL
const id = getParameterByName("id")

// Lấy dữ liệu chi tiết
function getDetailShoe(id) {
  let promise = axios({
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
    method: "GET",
  })
  promise
    .then((res) => {
      renderDetailGiay(res.data.content)

      addEventListeners()
    })
    .catch((err) => {
      console.log(err)
    })
}

// Gọi hàm lấy chi tiết giày với id từ URL
if (id) {
  getDetailShoe(id)
}

function renderDetailGiay(giay, idTheCha = "detailsData") {
  console.log(giay)
  let { image, name, description, size, price, relatedProducts } = giay
  let content = `
        <div class="col-lg-5 col-md-12 shoeimg">
          <img src="${image}" alt="" />
        </div>
        <div class="col-lg-7 col-md-12 shoeinfo">
          <h3>${name}</h3>
          <span><i class="fa-solid fa-fire me-2"></i>22 Items sold in last 14 hours</span>
          <p><b>Description:</b> ${description}</p>
          <!-- số size giày  -->
          <div class="size">
            <p>Size: </p>
            ${renderSizeGiay(size)}
          </div>
          <!-- giá tiền  -->
          <h5><b>Price:</b> $ ${price}</h5>
          <hr class="my-4" />
          <div class="action">
            <h3><i class="fa-solid fa-heart me-2"></i>Add to wishlist</h3>
            <h3><i class="fa-solid fa-arrows-rotate me-2"></i>Add to compare</h3>
            <h3><i class="fa-solid fa-share-nodes me-2"></i>Share</h3>
          </div>
          <div class="cart-buttons">
            <button class="btn btn-addToCart"><i class="fa-solid fa-cart-shopping me-2"></i>Add To Cart</button>
            <button class="btn btn-buyItNow"><i class="fa-solid fa-credit-card me-2"></i>Buy It Now</button>
          </div>
        </div>  
      `
  document.getElementById(idTheCha).innerHTML = content
  renderDuLieuGiay(relatedProducts, "relatedProductsData")
}

function renderSizeGiay(arrSize) {
  let content = ""
  for (let size of arrSize) {
    content += `<button class="btn btn-size me-3">${size}</button>`
  }
  // thực hiện trả về chuỗi html chứa các nút button được tạo ra từ mảng size
  return content
}

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
