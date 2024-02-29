const formEditSupplier = document.querySelector('#formUpdateSupplier')

formEditSupplier.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }
    try {
        const response = await fetch('http://127.0.0.1:8000/api/updateSupplier', {
            method: 'PUT',
            body: JSON.stringify(getInfoSupplier()),
            headers: headersList
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar formulário');
        }
  
        const responseData = await response.json();
        console.log(responseData);
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

    const queryString = window.location.search;
    const parametros = new URLSearchParams(queryString);
    const id = parametros.get('id');

    return obj = {
        id_supplier: id,
        name_supplier: name_supplier ,
        email_supplier: email_supplier,
        phone_supplier: phone_supplier,
        cep_supplier:  parseInt(cep_supplier) ,
        state_supplier: state_supplier,
        city_supplier: city_supplier,
        neighborhood_supplier: neighborhood_supplier,
        address_supplier: address_supplier,
        number_house_supplier: numberHouse,
    }
}
