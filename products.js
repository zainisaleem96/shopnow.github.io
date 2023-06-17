  // Create a new product
async function getAllProducts() {

    let cards = [];
    let products = [];

 await fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(data => products = data)
    //.then(json=>console.log(json))
    for (const index in products) {
        let product = products[index];
            let productID = product.id;
            let productName = product.title;
            let productPrice = product.price;
            let productCategory = product.category;
            let productDescription = product.description;
            let productImageURL = product.image;
            let card = `
            <div class="col-sm" id=${productID}>
            <div class="card bg-dark" style="width: 18rem;">
                <img class="card-img-top" src=${productImageURL} alt="Product Image">
                <div class="card-body text-white">
                    <h5 class="card-title">${productName}</h5>
                    <p><strong>Price: $</strong> ${productPrice}</p>
                    <p><strong>Category:</strong> ${productCategory}</p>
                    <p class="card-text">${productDescription}</p>
                    <br />
                </div>
            </div>
        </div>
        `;
        cards.push(card);
    }
    return cards;
    }
   

    // Create a new product
async function createNewProduct(product) {
    var result = false;

    await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(_ => result = true)
    .catch(_ => result = false);

    return result;
}

$("#card-container").ready(async function() {
    let cards = await getAllProducts();

    for (const index in cards) {
        let card = cards[index];
        $("#card-container").append(card);
    }
});

$("#product-form").submit(async function(form) {
    form.preventDefault();

    const name = $("#productNameInput").val();
    const price = $("#productPriceInput").val();
    const category = $("#productCategoryInput").val();
    const description = $("#productDescriptionInput").val();
    const url = $("#productImageURLInput").val();
    

    const product = {
        "name": name,
        "price": price,
        "category": category,
        "description": description,
        "imageURL": url
    };

    let result = await createNewProduct(product);
   if(result){
    document.getElementById("p").innerHTML = "Added Product is:"
    document.getElementById("p1").innerHTML = name;
    document.getElementById("p2").innerHTML = price;
    document.getElementById("p3").innerHTML = category;
    document.getElementById("p4").innerHTML = description;
    document.getElementById("p5").src = url;
   }
}); 
   


