const URL = "http://127.0.0.1:8000/api";

const formCreateSupplier = document.querySelector('#formCreateSupplier')

formCreateSupplier.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }
       
    try {
      const response = await fetch(URL + '/createSupplier', {
        method: 'POST',
        body: JSON.stringify(getInfoSupplier()), 
        headers: headersList
      });
  
      if (!response.ok) {
        throw new Error('Erro ao enviar formulário');
      }
      const responseData = await response.json();
      window.location.href = "./listSupplier.html";

    } catch (error) {
      console.error('Erro:', error);
    }
});

function getInfoSupplier(){
    let name_supplier = document.querySelector('#name_supplier').value
    let email_supplier = document.querySelector('#email_supplier').value
    let phone_supplier = document.querySelector('#phone_supplier').value
    let cep_supplier = document.querySelector('#cep_supplier').value
    let state_supplier = document.querySelector('#state_supplier').value
    let city_supplier = document.querySelector('#city_supplier').value
    let neighborhood_supplier = document.querySelector('#neighborhood_supplier').value
    let address_supplier = document.querySelector('#address_supplier').value
    let numberHouse = document.querySelector('#numberHouse').value
    
    return{
      name_supplier: name_supplier,
      email_supplier: email_supplier,
      phone_supplier: phone_supplier,
      cep_supplier: parseInt(cep_supplier),
      state_supplier: state_supplier,
      city_supplier: city_supplier,
      neighborhood_supplier: neighborhood_supplier,
      address_supplier: address_supplier,
      number_house_supplier: numberHouse,
    }
}

function setAddresInput(dataAddress){
  document.querySelector('#state_supplier').value = dataAddress.uf
  document.querySelector('#city_supplier').value = dataAddress.localidade
  document.querySelector('#neighborhood_supplier').value = dataAddress.bairro
  document.querySelector('#address_supplier').value = dataAddress.logradouro
}

document.querySelector('#cep_supplier').addEventListener('input', (async (e)  =>{
  if(e.target.value.length == 8){

    const response = await fetch(`https://viacep.com.br/ws/${e.target.value}/json/`);
    const data = await response.json();
    console.log(data)
    setAddresInput(data)
  }
}))
