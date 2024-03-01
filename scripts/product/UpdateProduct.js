const URL = "http://127.0.0.1:8000/api";
const formEditProduct = document.querySelector('#formUpdateProduct')

formEditProduct.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }
    try {
      
      const response = await fetch(URL + '/updateProduct', {
        method: 'PUT',
        body: JSON.stringify(getInfoProduct()), 
        headers: headersList
      });
  
      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }
  
      const responseData = await response.json();
      window.location.href = "./index.html";
    } catch (error) {
      console.error('Erro:', error);
    }
});


function getInfoProduct(){
    let productCode = document.querySelector('#productCode').value
    let productName = document.querySelector('#productName').value
    let productDesc = document.querySelector('#productDesc').value
    let productPrice = document.querySelector('#productPrice').value
    let productCategory = document.querySelector('#productCategorie').value
    let productCustomer = document.querySelector('#productCustomer').value
    let productQtd = document.querySelector('#productQtd').value

    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const id = parametros.get('id');

    return {
      productId: id,
      productCode: parseInt(productCode),
      productName: productName,
      productDesc: productDesc,
      productPrice: productPrice,
      productCategory: productCategory,
      productQtd: parseInt(productQtd),
      name_supplier: productCustomer,
    }
}

async function InsertSupplier(){
  const response = await fetch(URL + '/getAllSupplier');
  const suppliers = await response.json();

  const SelectsName = document.querySelector('#productCustomer')

  suppliers.forEach((supplier) => {
            
    let supplierName = document.createElement('option')
    supplierName.innerHTML = supplier.name
    supplierName.setAttribute('value', supplier.name)
    SelectsName.appendChild(supplierName)
  })
}

async function GetDataProduct(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);

  const id = parametros.get('id');

  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }
  const response = await fetch(URL + '/getProduct', {
    method: 'POST',
    body: JSON.stringify({id: id}),
    headers: headersList
  });
  const product = await response.json();

 document.querySelector('#productCode').value = product.code
 document.querySelector('#productName').value = product.name
 document.querySelector('#productDesc').value = product.describe
 document.querySelector('#productPrice').value = product.price
 document.querySelector('#productCategorie').value = product.category
 document.querySelector('#productCustomer').value = product.supplier
 document.querySelector('#productQtd').value = product.qtd
}
GetDataProduct()
InsertSupplier()