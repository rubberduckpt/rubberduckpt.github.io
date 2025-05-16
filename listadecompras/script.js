// JavaScript para a lógica da WebApp
const mainScreen = document.getElementById('main-screen');
const editScreen = document.getElementById('edit-screen');
const goToEditButton = document.getElementById('go-to-edit');
const goToMainButton = document.getElementById('go-to-main');
const viewList = document.getElementById('view-list');
const editList = document.getElementById('edit-list');
const newItemInput = document.getElementById('new-item');
const addItemButton = document.getElementById('add-item-button');
const clearListButton = document.getElementById('clear-list-button');

let shoppingList = []; // Array para armazenar os itens da lista

// Carregar a lista do Local Storage
function loadList() {
    const storedList = localStorage.getItem('shoppingList');
    if (storedList) {
        shoppingList = JSON.parse(storedList);
    }
    renderLists(); // Renderiza as listas após carregar
}

// Guardar a lista no Local Storage
function saveList() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Renderizar a lista nas duas telas
function renderLists() {
    renderViewList();
    renderEditList();
}

// Renderizar a lista na tela principal (apenas visualização)
function renderViewList() {
    viewList.innerHTML = ''; // Limpa a lista atual
    if (shoppingList.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'A lista está vazia.';
        viewList.appendChild(li);
    } else {
        shoppingList.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            viewList.appendChild(li);
        });
    }
}

// Renderizar a lista na tela de edição (com botões de remover)
function renderEditList() {
    editList.innerHTML = ''; // Limpa a lista atual
     if (shoppingList.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'A lista está vazia.';
        editList.appendChild(li);
    } else {
        shoppingList.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remover';
            deleteButton.addEventListener('click', () => {
                deleteItem(index);
            });

            li.appendChild(deleteButton);
            editList.appendChild(li);
        });
    }
}

// Adicionar um novo item
function addItem() {
    const newItem = newItemInput.value.trim(); // Remove espaços em branco no início e fim
    if (newItem) { // Verifica se o input não está vazio
        shoppingList.push(newItem);
        newItemInput.value = ''; // Limpa o input
        saveList();
        renderLists(); // Atualiza as listas nas duas telas
    }
}

// Eliminar um item pelo índice
function deleteItem(index) {
    shoppingList.splice(index, 1); // Remove o item no índice especificado
    saveList();
    renderLists(); // Atualiza as listas nas duas telas
}

// Limpar a lista completa
function clearList() {
    if (confirm('Tem a certeza que quer limpar a lista completa?')) {
        shoppingList = []; // Define a lista como vazia
        saveList();
        renderLists(); // Atualiza as listas nas duas telas
    }
}

// Mudar para a tela de edição
goToEditButton.addEventListener('click', () => {
    mainScreen.classList.remove('active');
    editScreen.classList.add('active');
    renderEditList(); // Renderiza a lista de edição ao mudar de tela
});

// Mudar para a tela principal
goToMainButton.addEventListener('click', () => {
    editScreen.classList.remove('active');
    mainScreen.classList.add('active');
    renderViewList(); // Renderiza a lista de visualização ao mudar de tela
});

// Adicionar item ao clicar no botão
addItemButton.addEventListener('click', addItem);

// Adicionar item ao pressionar Enter no input
newItemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addItem();
    }
});

// Limpar a lista completa ao clicar no botão
clearListButton.addEventListener('click', clearList);

// Carregar a lista quando a página carregar
window.onload = loadList;