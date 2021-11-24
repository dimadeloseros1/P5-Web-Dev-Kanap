

let productLocalStorage = JSON.parse(localStorage.getItem("productt"));
console.table(productLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

//Main tree from the page 
function getCart(){
if (productLocalStorage === null || productLocalStorage == 0) {
    const emptyCart = `<p>Your cart is empty!</p>`;
    positionEmptyCart.innerHTML = emptyCart;
} else {
for (let productt in productLocalStorage){
   
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', productLocalStorage[productt].idProduit);

    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = productLocalStorage[productt].imgProduit;
    productImg.alt = productLocalStorage[productt].altImgProduit;

    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    let cartItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(cartItemContentTitlePrice);
    cartItemContentTitlePrice.className = "cart__item__content__titlePrice";

    let productItemName = document.createElement("h2");
    cartItemContentTitlePrice.appendChild(productItemName);
    productItemName.innerHTML = productLocalStorage[productt].nomProduit;

    let productColor = document.createElement("p");
    productItemName.appendChild(productColor);
    productColor.innerHTML = productLocalStorage[productt].couleurProduit;
    productColor.style.fontSize = "22px";

    let productPrice = document.createElement("p");
    cartItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = productLocalStorage[productt].prixProduit + "€";

    let cartItemContentSettings = document.createElement("div");
    productItemContent.appendChild(cartItemContentSettings);
    cartItemContentSettings.className = "cart__item__content__settings";

    let cartItemContentSettingsQUantity = document.createElement("div");
    cartItemContentSettings.appendChild(cartItemContentSettingsQUantity);
    cartItemContentSettingsQUantity.className = "cart__item__content__settings__quantity";

    let productQte = document.createElement("p");
    cartItemContentSettingsQUantity.appendChild(productQte);
    productQte.innerHTML = "Qté";

    let ProductQuantity = document.createElement("input");
    cartItemContentSettingsQUantity.appendChild(ProductQuantity);
    ProductQuantity.value = productLocalStorage[productt].quantiteProduit;
    ProductQuantity.className = "itemQuantity";
    ProductQuantity.setAttribute("type", "number");
    ProductQuantity.setAttribute("min", "1");
    ProductQuantity.setAttribute("max", "100");
    ProductQuantity.setAttribute("name", "itemQuantity");

    let productItemContentSettingsDelete = document.createElement('div');
    cartItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    let productDelete = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productDelete);
    productDelete.className = "deleteItem";
    productDelete.innerHTML = "Delete";


        }
    }
}
getCart();

const getTotals = () => {

    let itemQtt = document.getElementsByClassName("itemQuantity");
    let itemLength = itemQtt.length;
    totalQtt = 0;

    for (let i = 0; i < itemLength; i++) {
        totalQtt += itemQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    //Whole amount of price / combined
    totalPrice = 0;

    for (let i = 0; i < itemLength; i++) {
        totalPrice += (itemQtt[i].valueAsNumber * productLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById("totalPrice");
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();

function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = productLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const resultFind = productLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.quantiteProduit = qttModifValue;
            productLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("productt", JSON.stringify(productLocalStorage));
        
            // refresh rapide
            location.reload();
        })
    }
}
modifyQtt();
