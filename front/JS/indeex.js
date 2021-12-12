//Main tree from the homepage
const apiData = async () => {
	fetch("http://localhost:3000/api/products")
	.then(res => res.json())
	.then(apiResult => {
		const articles = apiResult;
		console.log(articles);
		for (let article in articles) {
			let productLink = document.createElement("a");
			document.querySelector(".items").appendChild(productLink);
			productLink.href = `product.html?id=${apiResult[article]._id}`;

			let productArticle = document.createElement("article");
			productLink.appendChild(productArticle);

			let productImg = document.createElement('img');
			productArticle.appendChild(productImg);
			productImg.src = apiResult[article].imageUrl;
			productImg.alt = apiResult[article].altTxt;

			let productName = document.createElement("h3");
			productArticle.appendChild(productName);
			productName.classList.add("productName");
			productName.innerHTML = apiResult[article].name;

			let productP = document.createElement('p');
			productArticle.appendChild(productP);
			productP.classList.add('ProductP');
			productP.innerHTML = apiResult[article].description;
		}
	})
}
apiData();
