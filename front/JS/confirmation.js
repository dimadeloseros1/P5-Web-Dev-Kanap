const urlConfirmation = new URL(window.location.href);

const getId = () => {
  console.log(urlConfirmation);
  const getConfirmationId = urlConfirmation.searchParams.get("id");
  console.log(getConfirmationId);
  document.getElementById("orderId").innerHTML = getConfirmationId;
};
getId();

localStorage.removeItem("products");
localStorage.removeItem("orderId");