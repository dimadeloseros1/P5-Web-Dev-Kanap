const getAllProducts = () => {
	fetch("http://localhost:3000/api/products")
	.then(function (res) {
		return res.json();
	}).catch((error) => {
		let items = document.querySelector('.items');
		items.innerHTML = 
		alert('error has been produced!')
	})

	.then(async function (resultOfApi) {
		const articles = resultOfApi;
		console.log(articles);
		for (let article in articles) {
			let productLink = document.createElement("a");
			document.querySelector(".items").appendChild(productLink);
			productLink.href = `product.html?id=${resultOfApi[article]._id}`;

			let productArticle = document.createElement("article");
			productLink.appendChild(productArticle);

			let productImg = document.createElement('img');
			productArticle.appendChild(productImg);
			productImg.src = resultOfApi[article].imageUrl;
			productImg.alt = resultOfApi[article].altTxt;

			let productName = document.createElement('h3');
			productArticle.appendChild(productName);
			productName.classList.add('productName');
			productName.innerHTML = resultOfApi[article].name;

			let productDescritpion = document.createElement("p");
			productArticle.appendChild(productDescritpion);
			productDescritpion.classList.add("productName");
			productDescritpion.innerHTML = resultOfApi[article].description;
		}
	})
}
getAllProducts();