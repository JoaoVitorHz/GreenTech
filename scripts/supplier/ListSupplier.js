function ListItens(data){
    const tbody = document.querySelector('#ListSupplier tbody')

    data.forEach(element => {
        let row = document.createElement('tr')
    
        let rowItemId = document.createElement('td')
        rowItemId.innerHTML = element.id
        row.appendChild(rowItemId)
    
        let rowItemName = document.createElement('td')
        rowItemName .innerHTML = element.name 
        row.appendChild(rowItemName)
        
        let rowItemEmail = document.createElement('td')
        rowItemEmail.innerHTML = element.email
        row.appendChild(rowItemEmail)
        
        let rowItemPhone = document.createElement('td')
        rowItemPhone.innerHTML = element.phone
        row.appendChild(rowItemPhone)
        
        let rowItemCep = document.createElement('td')
        rowItemCep.innerHTML = element.cep
        row.appendChild(rowItemCep)
        
        let rowItemState = document.createElement('td')
        rowItemState.innerHTML = element.state
        row.appendChild(rowItemState)
        
        let rowItemIdCity = document.createElement('td')
        rowItemIdCity.innerHTML = element.city
        row.appendChild(rowItemIdCity)

        let rowItemIdNeighborhood = document.createElement('td')
        rowItemIdNeighborhood.innerHTML = element.neighborhood
        row.appendChild(rowItemIdNeighborhood)
        
        let rowItemIdAddress = document.createElement('td')
        rowItemIdAddress.innerHTML = element.address
        row.appendChild(rowItemIdAddress)

        let rowItemIdNumber = document.createElement('td')
        rowItemIdNumber.innerHTML = element.number
        row.appendChild(rowItemIdNumber)

        let rowItemActionEdit = document.createElement('td')
        let updateAction = document.createElement('a')
        updateAction.innerHTML = "Editar Produto"
        updateAction.setAttribute('href',`updateSupplier.html?id=${element.id}`)
        rowItemActionEdit.appendChild(updateAction)
        row.appendChild(rowItemActionEdit)

        let rowItemActionDelete = document.createElement('td')
        let deleteAction = document.createElement('a')
        deleteAction.innerHTML = "Deletar Produto"
        deleteAction.addEventListener('click', () => DeleteSupplier(element.id))

        rowItemActionDelete.appendChild(deleteAction)
        row.appendChild(rowItemActionDelete)

        tbody.appendChild(row)
    });
}


async function GetData(){
  try {
    const response = await fetch('http://127.0.0.1:8000/api/getAllSupplier');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ocorreu um erro ao buscar os dados:', error);
    throw error; 
  }
}

async function fetchData() {
  try {
    const data = await GetData(); 
    ListItens(data)
  } catch (error) {
    console.error('Ocorreu um erro ao buscar os dados:', error);
  }
}

async function DeleteSupplier(id){
  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }
    
  try {
    const response = await fetch('http://127.0.0.1:8000/api/deleteSupplier', {
      method: 'Delete',
      body: JSON.stringify({id: id}), 
      headers: headersList
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar formulário');
    }

    const responseData = await response.json();
  } catch (error) {
    console.error('Erro:', error);
  }
}

fetchData()