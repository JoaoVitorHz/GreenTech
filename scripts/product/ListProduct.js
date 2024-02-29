function ListItens(data){
    const tbody = document.querySelector('#ListProduct tbody')

    data.forEach(element => {
        let row = document.createElement('tr')
    
        let rowItemId = document.createElement('td')
        rowItemId.innerHTML = element.id
        row.appendChild(rowItemId)
    
        let rowItemCode = document.createElement('td')
        rowItemCode.innerHTML = element.code
        row.appendChild(rowItemCode)
    
        let rowItemName = document.createElement('td')
        rowItemName .innerHTML = element.name 
        row.appendChild(rowItemName)
        
        let rowItemDescribe = document.createElement('td')
        rowItemDescribe.innerHTML = element.describe
        row.appendChild(rowItemDescribe)
        
        let rowItemPrice = document.createElement('td')
        rowItemPrice.innerHTML = element.price
        row.appendChild(rowItemPrice)
        
        let rowItemCategory = document.createElement('td')
        rowItemCategory.innerHTML = element.category
        row.appendChild(rowItemCategory)
        
        let rowItemQtd = document.createElement('td')
        rowItemQtd.innerHTML = element.qtd
        row.appendChild(rowItemQtd)
        
        let rowItemIdSupplier = document.createElement('td')
        rowItemIdSupplier.innerHTML = element.supplier
        row.appendChild(rowItemIdSupplier)

        let rowItemActionEdit = document.createElement('td')
        let updateAction = document.createElement('a')
        updateAction.innerHTML = "Editar Produto"
        updateAction.setAttribute('href',`updateProduct.html?id=${element.id}`)
        rowItemActionEdit.appendChild(updateAction)
        row.appendChild(rowItemActionEdit)

        let rowItemActionDelete = document.createElement('td')
        let deleteAction = document.createElement('a')
        deleteAction.innerHTML = "Deletar Produto"
        deleteAction.addEventListener('click', () => DeleteProduct(element.id))

        rowItemActionDelete.appendChild(deleteAction)
        row.appendChild(rowItemActionDelete)

        tbody.appendChild(row)
    });
}


async function GetData(){
  try {
    const response = await fetch('http://127.0.0.1:8000/api/getAll');
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

async function DeleteProduct(id){
  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json"
  }
    
  try {
    const response = await fetch('http://127.0.0.1:8000/api/delete', {
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