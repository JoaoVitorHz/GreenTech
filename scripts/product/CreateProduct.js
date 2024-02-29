const formCreateProduct = document.querySelector('#formCreateProduct')

formCreateProduct.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }
       
    try {
      const response = await fetch('http://127.0.0.1:8000/api/createProduct', {
        method: 'POST',
        body: JSON.stringify(getInfoProduct()), // Envie os dados do formulário
        headers: headersList
      });
  
      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }
  
      const responseData = await response.json();
      console.log(responseData);
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
    
    const obj = {
      productCode: parseInt(productCode),
      productName: productName,
      productDesc: productDesc,
      productPrice: productPrice,
      productCategory: productCategory,
      productQtd: parseInt(productQtd),
      name_supplier: productCustomer,
    }

    return obj;
}

async function InsertSupplier(){
  const response = await fetch('http://127.0.0.1:8000/api/getAllSupplier');
  const suppliers = await response.json();

  const SelectsName = document.querySelector('#productCustomer')

  suppliers.forEach((supplier) => {
            
    let supplierName = document.createElement('option')
    supplierName.innerHTML = supplier.name
    supplierName.setAttribute('value', supplier.name)
    SelectsName.appendChild(supplierName)
  })
}

InsertSupplier()