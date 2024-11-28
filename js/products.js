async function loadProducts() {
  const response = await fetch("https://fakestoreapi.com/products")
  const products = await response.json()
  displayProducts(products)
}

function displayProducts(products) {
  // 상품들이 표시될 컨테이너 찾기
  const container = document.querySelector("#all-products .container")

  // 각 상품을 순회하면서 안전하게 HTML 구조 생성
  products.forEach((product) => {
    // 메인 상품 div 생성
    const productElement = document.createElement("div")
    productElement.classList.add("product")

    // 상품 이미지 div 생성
    const pictureDiv = document.createElement("div")
    pictureDiv.classList.add("product-picture")
    const img = document.createElement("img")
    img.src = product.image
    img.alt = `product: ${product.title}`
    img.loading = "lazy" // 지연 로딩
    img.width = 250
    img.srcset = `${product.image}?size=250 250w, ${product.image}?size=500 500w`
    img.sizes = "(max-width: 500px) 250px, 500px"
    img.onerror = () => {
      img.src = "path/to/fallback-image.jpg"
    }
    pictureDiv.appendChild(img)

    // 상품 정보 div 생성
    const infoDiv = document.createElement("div")
    infoDiv.classList.add("product-info")

    const category = document.createElement("h5")
    category.classList.add("categories")
    category.textContent = product.category

    const title = document.createElement("h4")
    title.classList.add("title")
    title.textContent = product.title

    const price = document.createElement("h3")
    price.classList.add("price")
    const priceSpan = document.createElement("span")
    priceSpan.textContent = `US$ ${product.price}`
    price.appendChild(priceSpan)

    const button = document.createElement("button")
    button.textContent = "Add to bag"

    // Append elements to the product info div
    infoDiv.appendChild(category)
    infoDiv.appendChild(title)
    infoDiv.appendChild(price)
    infoDiv.appendChild(button)

    // Append picture and info divs to the main product element
    productElement.appendChild(pictureDiv)
    productElement.appendChild(infoDiv)

    // Append the new product element to the container
    container.appendChild(productElement)
  })
}

window.onload = () => {
  let status = "idle"

  let productSection = document.querySelector("#all-products")

  window.onscroll = () => {
    let position = productSection.getBoundingClientRect().top - (window.scrollY + window.innerHeight)

    if (status == "idle" && position <= 0) {
      loadProducts()

      // 무거운 작업 시뮬레이션. 복잡한 가격 계산이 될 수 있음
      // 이는 UI를 멈추게 하는 차단 작업임
      // 개선 방법: https://ko.javascript.info/event-loop <-- 이벤트 루프 사용
      for (let i = 0; i < 10000000; i++) {
        const temp = Math.sqrt(i) * Math.sqrt(i)
      }
    }
  }
}
