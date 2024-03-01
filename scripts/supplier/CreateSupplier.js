const URL = "http://127.0.0.1:8000/api";

const formCreateSupplier = document.querySelector('#formCreateSupplier')

formCreateSupplier.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
    }
    const data = getInfoSupplier()

    if(data != false){
      try {
        const response = await fetch(URL + '/createSupplier', {
          method: 'POST',
          body: JSON.stringify(data), 
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
    
    let isValid = VerifyFields(
      name_supplier, 
      email_supplier,
      phone_supplier,
      cep_supplier, 
      state_supplier, 
      city_supplier, 
      neighborhood_supplier, 
      address_supplier, 
      numberHouse
    )
    
    if(isValid == false)
      return false

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

function VerifyFields(name_supplier, 
  email_supplier,
  phone_supplier,
  cep_supplier, 
  state_supplier, 
  city_supplier, 
  neighborhood_supplier, 
  address_supplier, 
  numberHouse
){
  if (email_supplier === '') {
    alert('Por favor, preencha o campo email.');
    return false;
  }
  if (name_supplier === '') {
    alert('Por favor, preencha o campo nome.');
    return false;
  }
  if (phone_supplier === '') {
      alert('Por favor, preencha o campo telefone.');
      return false;
  }
  if (cep_supplier === '') {
      alert('Por favor, preencha o campo cep.');
      return false;
  }
  if (state_supplier === '') {
      alert('Por favor, preencha o campo estado.');
      return false;
  }
  if (city_supplier === '') {
      alert('Por favor, preencha o campo cidade.');
      return false;
  }
  if (neighborhood_supplier === '') {
      alert('Por favor, preencha o campo bairro.');
      return false;
  }
  if (numberHouse === '') {
      alert('Por favor, preencha o campo numero.');
      return false;
  }
  if (address_supplier === '') {
      alert('Por favor, preencha o campo endereço.');
      return false;
  }

  // Verificar se o preço e quantidade são números
  if (isNaN(phone_supplier)) {
    alert('Por favor, insira um valor numérico válido para o telefone.');
    return false;
  }
  if (isNaN(numberHouse)) {
    alert('Por favor, insira um valor numérico válido para o numero.');
    return false;
  }
  if (isNaN(cep_supplier)) {
    alert('Por favor, insira um valor numérico válido para o cep.');
    return false;
  }
}