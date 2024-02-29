const formCreateProduct = document.querySelector('#formCreateProduct')

formCreateProduct.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }
       
    try {
      const response = await fetch('http://127.0.0.1:8000/api/create', {
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

    let name_supplier = document.querySelector('#name_supplier').value
    let email_supplier = document.querySelector('#email_supplier').value
    let phone_supplier = document.querySelector('#phone_supplier').value
    let cep_supplier = document.querySelector('#cep_supplier').value
    let state_supplier = document.querySelector('#state_supplier').value
    let city_supplier = document.querySelector('#city_supplier').value
    let neighborhood_supplier = document.querySelector('#neighborhood_supplier').value
    let adrres_supplier = document.querySelector('#adrres_supplier').value
    let numero = document.querySelector('#numero').value


    
    const obj = {
        productCode: parseInt(productCode),
        productName: productName,
        productDesc: productDesc,
        productPrice: productPrice,
        productCategory: productCategory,
        productQtd: parseInt(productQtd),

        name_supplier: productCustomer ,
        email_supplier: email_supplier,
        phone_supplier: phone_supplier,
        cep_supplier: cep_supplier ,
        state_supplier: state_supplier,
        city_supplier: city_supplier,
        neighborhood_supplier: neighborhood_supplier,
        adrres_supplier: adrres_supplier,
        numero: numero,
    }

    return obj;
}
