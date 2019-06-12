function deleteItem(e){
  e.target.parentNode.parentNode.remove(e.target.parentNode.parentNode)
  getTotalPrice()
}

function updatePriceByProduct(){
    let products = document.querySelectorAll('.product-name')
    let costNode = document.querySelectorAll('.product-price')

    products.forEach((product, i) => {
      let quantity = document.querySelectorAll('.input')[i].value;
      if (!quantity.length) quantity = 1;
      let cost = document.querySelectorAll('.product-cost')[i].textContent.split('$')[1] * quantity;
      costNode[i].innerHTML = `$${cost}`;
    })
}

function getTotalPrice() {
    updatePriceByProduct();

    let costNode = [...document.querySelectorAll('.product-price')]
    let totalCost = costNode.reduce((acc, val) => {
      return acc + parseFloat(val.textContent.split('$')[1])
    }, 0)
    
    document.querySelector('#total-price').innerHTML = `$${totalCost}`;
}

function createNewItem(){
  let newProductName = document.querySelectorAll('.new-item-container input')[0].value;
  let newProductPrice = document.querySelectorAll('.new-item-container input')[1].value;
  let productList = document.querySelectorAll('.product-entry')
  
  let duplicateNode = productList[0].cloneNode(true)

  document.querySelector('.container').insertBefore(duplicateNode, document.querySelector('.new-item-container'))

  let newNodeIndex = productList.length

  document.querySelectorAll('.product-entry .product-name')[newNodeIndex].innerHTML = `${newProductName}`
  document.querySelectorAll('.product-entry .product-cost')[newNodeIndex].innerHTML = `$${newProductPrice}`
  window.onload();
  getTotalPrice()
}

window.onload = function(){
  var calculatePriceButton = document.getElementById('calc-prices-button');
  var createItemButton = document.getElementById('new-item-create');
  var deleteButtons = document.getElementsByClassName('btn-delete');

  calculatePriceButton.onclick = getTotalPrice;
  createItemButton.onclick = createNewItem;
  getTotalPrice()

  for(var i = 0; i<deleteButtons.length ; i++){
    deleteButtons[i].onclick = deleteItem;
  }
};