const formEditProduct = document.querySelector('#formUpdateProduct')

formEditProduct.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }
    try {
      
      const response = await fetch('http://127.0.0.1:8000/api/update', {
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
    }
}
