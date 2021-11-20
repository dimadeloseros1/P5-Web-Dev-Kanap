
const str = window.location.href;
const url = new URL(str);
const idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorChoice = document.querySelector("#colors");
const quantityNumber = document.querySelector("#quantity");


getArticle();
function getArticle() {
        fetch(`http://localhost:3000/api/products/${idProduct}`)
        .then((res) => {
            return res.json();
        })
    .then(async function (resultOfApi) {
        article = await resultOfApi;
        console.log(article);
        if (article) {
            getPost(article);
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

function getPost(article) {
    let productImg = document.createElement('img');
    document.querySelector('.item__img').appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    let productName = document.getElementById('title');
    productName.innerHTML = article.name;


    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    let productDescription = document.getElementById("description");
    productDescription.innerHTML = article.description;

    // colors loop
    for (let colors of article.colors) {
        console.log(colors);
        let productColors = document.createElement("option");
        document.getElementById("colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    
}
addToCart(article);
// Adding to the cart
function addToCart(article) {
    const addCart = document.querySelector("#addToCart");

    //Event Listener
    addCart.addEventListener("click", (event) => {
        if (quantityNumber.value > 0 && quantityNumber.value <= 100 && quantityNumber.value != 0) {

            //Quantity & color
            let colorChange = colorChoice.value;
            let quantityChange = quantityNumber.value;

            //All the products
            let productOption = {
                productId: idProduct,
                productColor: colorChange,
                productQuantity: Number(quantityChange),
                productName: article.name,
                productPrice: article.price,
                productDescription: article.description,
                productImg: article.imageUrl,
                productAltImg: article.altTxt
            };
            // local storage
            let productLocalStorage = JSON.parse(localStorage.getItem("product"));

            // Alerting the message from the browser
            const confirmationAlert = () => {
                if (window.confirm(`You are about to add ${quantityChange} ${article.name} ${colorChange} to your basket`)) {
                    window.location.href = "cart.html";
                }
            };

            // Import to the local storage if there is already +1 product
            if (productLocalStorage) {
                const resultFind = productLocalStorage.find(
                    (el) => el.productId === idProduct && el.productColor === colorChange);

                if (resultFind) {
                    let storageQUantity = parseInt(productOption.productQuantity) + parseInt(resultFind.productQuantity);
                    resultFind.productQuantity = storageQUantity;
                    localStorage.setItem("product", JSON.stringify(productLocalStorage));
                    console.log(productLocalStorage);
                    confirmationAlert();
                } else {
                    productLocalStorage.push(productOption);
                    localStorage.setItem("product", JSON.stringify(productLocalStorage));
                    console.log(productLocalStorage);
                    confirmationAlert();
                }
            } else {
                productLocalStorage = [];
                productLocalStorage.push(productOption);
                localStorage.setItem("product", JSON.stringify(productLocalStorage));
                console.log(productLocalStorage);
                confirmationAlert();
            }

        }
    });
}

