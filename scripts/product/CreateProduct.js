const URL = "http://127.0.0.1:8000/api";
const formCreateProduct = document.querySelector('#formCreateProduct')

formCreateProduct.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }
      
    let data = getInfoProduct()

    if(data != false){
      try {
        const response = await fetch(URL + '/createProduct', {
          method: 'POST',
          body: JSON.stringify(data),
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
    

    let isValid = VerifyField(
      productCode,
      productName,
      productDesc, 
      productPrice, 
      productCategory,
      productCustomer,
      productQtd
    ) 
    
    if(isValid == false)
      return false;

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

InsertSupplier()

function VerifyField(
  productCode,
  productName,
  productDesc, 
  productPrice, 
  productCategory,
  productCustomer,
  productQtd
){
  if (productCode === '') {
    alert('Por favor, preencha o campo código.');
    return false;
  }
  if (productName === '') {
      alert('Por favor, preencha o campo nome.');
      return false;
  }
  if (productDesc === '') {
      alert('Por favor, preencha o campo descrição.');
      return false;
  }
  if (productPrice === '') {
      alert('Por favor, preencha o campo preço.');
      return false;
  }
  if (productCategory === '') {
      alert('Por favor, preencha o campo categoria.');
      return false;
  }
  if (productCustomer === '') {
      alert('Por favor, preencha o campo fornecedor.');
      return false;
  }
  if (productQtd === '') {
      alert('Por favor, preencha o campo quantidade.');
      return false;
  }
  if (isNaN(productPrice)) {
      alert('Por favor, insira um valor numérico válido para o preço.');
      return false;
  }
  if (isNaN(productQtd)) {
      alert('Por favor, insira um valor numérico válido para a quantidade.');
      return false;
  }
}