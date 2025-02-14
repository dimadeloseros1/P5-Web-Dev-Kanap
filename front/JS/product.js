var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Request the articles from the API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Error from the API");
    })
}

//Main product tree function    
function getPost(article){

    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Inserting the colors
    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);
}

//Adding items to the cart + localStorage function
function addToCart(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");
    
    
    btn_envoyerPanier.addEventListener("click", (event) => {
        
        if (quantityPicked.value == 0) {
            alert("Please chose the quantity you wish to purchase")
        }
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

    
   
                
    
    let quantityChoice = quantityPicked.value;
    let colorChoice = colorPicked.value;       
    
    let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: colorChoice,
        quantiteProduit: Number(quantityChoice),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt
    };

    
    let productLocalStorage = JSON.parse(localStorage.getItem("productt"));

    
    const popupConfirmation = () => {
        if(window.confirm(`You are about to add ${quantityChoice} ${article.name} ${colorChoice} to your cart, please click OK to continue`)){
            window.location.href ="cart.html";
        }
    }

   
    if (productLocalStorage) {
    const resultFind = productLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === colorChoice);
        
        if (resultFind) {
            let newQuantity =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantity;
            localStorage.setItem("productt", JSON.stringify(productLocalStorage));
            console.table(productLocalStorage);
            popupConfirmation();
        
        } else {
            productLocalStorage.push(optionsProduit);
            localStorage.setItem("productt", JSON.stringify(productLocalStorage));
            console.table(productLocalStorage);
            popupConfirmation();
        }
    
    } else {
        productLocalStorage =[];
        productLocalStorage.push(optionsProduit);
        localStorage.setItem("productt", JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
        popupConfirmation();
    }}
    });
}