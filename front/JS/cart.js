

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

//Total quantity and price function
const getTotals = () => {

    // Imputs the total amount of the items which the user wishes to purchase
    let itemQtt = document.querySelectorAll(".itemQuantity");
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
        totalPrice += (itemQtt[i].value * productLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById("totalPrice");
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();

// Modify quantity Function
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");
    let qttModifLength = qttModif.length;

    for (let k = 0; k < qttModifLength; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();
            
            let quantityModif = productLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].value;
            
            const resultFind = productLocalStorage.find((el)  => {
               console.log(el.qttModifValue) 
               console.log(quantityModif)
                return el.qttModifValue !== quantityModif 
                    
                })
            
            resultFind.quantiteProduit = qttModifValue;
            productLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("productt", JSON.stringify(productLocalStorage));
            
            
            
            location.reload();
            
        })
    }
}
modifyQtt();

// Delete item function
const deleteProduct = () => {
    let btn_delete = document.getElementsByClassName("deleteItem");

    for (let a = 0; a < btn_delete.length; a++) {
        btn_delete[a].addEventListener('click', (event) => {
            event.preventDefault();

            let idDelete = productLocalStorage[a].idProduit;
            let colorDelete = productLocalStorage[a].couleurProduit;

            productLocalStorage = productLocalStorage.filter(el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete);
            localStorage.setItem("productt", JSON.stringify(productLocalStorage));
            location.reload();
        })
    }

}
deleteProduct();

// Form - User details

const form = document.getElementsByClassName("cart__order__form")[0];

form.firstName.addEventListener("change", function () {
  validName(this);
});
form.lastName.addEventListener("change", function () {
  validName(this);
});

const validName = function (inputName) {
  let nameRegExp = new RegExp("^[^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$", "g");
  let testName = nameRegExp.test(inputName.value);
  if (testName) {
    inputName.nextElementSibling.innerHTML = "Valid";
    inputName.nextElementSibling.style.color = "green";
    return true;
  } else {
    inputName.nextElementSibling.innerHTML = "Invalid";
    inputName.nextElementSibling.style.color = "red";
    return false;
  }
};

//Address
form.address.addEventListener("change", function () {
  validAddress(this);
});

const validAddress = function (inputAdress) {
  let addressRegExp = new RegExp("^[0-9]{1,4} [^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$", "g");
  let testAdress = addressRegExp.test(inputAdress.value);
  if (testAdress) {
    inputAdress.nextElementSibling.innerHTML = "Valid";
    inputAdress.nextElementSibling.style.color = "green";
    return true;
  } else {
    inputAdress.nextElementSibling.innerHTML = "Invalid";
    inputAdress.nextElementSibling.style.color = "red";
    return false;
  }
};

//City
form.city.addEventListener("change", function () {
  validCity(this);
});

const validCity = function (inputCity) {
  let cityRegExp = new RegExp("^[^- ][a-zA-Z '-àâäéèêëïîôöùûü]*[^- ]$", "g");
  let testCity = cityRegExp.test(inputCity.value);
  if (testCity) {
    inputCity.nextElementSibling.innerHTML = "Valid";
    inputCity.nextElementSibling.style.color = "green";
    return true;
  } else {
    inputCity.nextElementSibling.innerHTML = "Invalid";
    inputCity.nextElementSibling.style.color = "red";
    return false;
  }
};

//Email
form.email.addEventListener("change", function () {
  validEmail(this);
});

const validEmail = function (inputEmail) {
  let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$","g");
  // let emailRegExp = new RegExp("^.+@.+$","g");
  let testEmail = emailRegExp.test(inputEmail.value);
  if (testEmail) {
    inputEmail.nextElementSibling.innerHTML = "Valid";
    inputEmail.nextElementSibling.style.color = "green";
    return true;
  } else {
    inputEmail.nextElementSibling.innerHTML ="Invalid";
    inputEmail.nextElementSibling.style.color = "red";
    return false;
  }
};

form.addEventListener("submit", function (e) {
    console.log("submit ok");
    e.preventDefault();
    if (
      validName(form.firstName) &&
      validName(form.lastName) &&
      validAddress(form.address) &&
      validCity(form.city) &&
      validEmail(form.email)
    ) {
      //form.submit()
      makeOrder();
      console.log("Form is ok");
    } else {
      e.preventDefault();
      alert("something went wrong!");
    }
  });

  // Sending data back to the back end function
  const sendOrderToBackEnd = (theOrder) => {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(theOrder),
      headers: { "Content-type": "application/JSON" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("back end " + data);
        console.log(data.orderId);
        //const orderId = data.orderId;
        localStorage.setItem("orderId", data.orderId);
  
        
        window.location.href = "confirmation.html" + "?" + "id" + "=" + data.orderId;
        
      });
  };
  
  //Making an order function
  function makeOrder() {
    const products = [];
    for (product of productLocalStorage) {
      let productId = product.idProduit;
      products.push(productId);
    }
    const contact = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value,
    };
  
    let theOrder = {
      contact,
      products,
    };
    console.log("make order ok");
    //localStorage.setItem("products", JSON.stringify(theOrder))
    sendOrderToBackEnd(theOrder);
  }
  
  