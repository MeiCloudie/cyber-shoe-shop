export default function renderDuLieuGiay(arrGiay, idTheCha) {
  let content = ""
  for (let giay of arrGiay) {
    let { image, name, price, id } = giay
    content += `
      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div class="card animate__animated wow animate__zoomIn">
          <img src=${image} class="p-2" alt="${name}">
          <div class="card-body">
            <div class="card-body-content">
              <h5 class="card-title">${name}</h5>
              <p class="card-price">$ ${price}</p>
            </div>
            <div class="card-body-action">
              <button class="btn-cart btn" data-id="${id}">
                <i class="fa-solid fa-cart-shopping fs-4"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `
  }
  document.getElementById(idTheCha).innerHTML = content
}
