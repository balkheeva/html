const tabel = document.querySelector('.tableBody-js');
const addStoreBtn = document.querySelector('.addStoreBtn-js');
const inputDomain = document.querySelector('.input__createStore')
const modalEl = document.querySelector('#createStoreModal')
const openModal = document.querySelector('.create-store-js')
const selectTemplate = document.querySelector('.template-js')
const selectTheme = document.querySelector('.theme-js')

let stores = []

openModal.addEventListener('click', () => {
    addStoreBtn.removeAttribute("data-bs-dismiss")
    inputDomain.value = ''
    selectTemplate.value = 'Стандартный'
    selectTheme.value = 'Классическая'
    modalEl.classList.add('modal__creating')
    modalEl.classList.remove('modal__editing')
})

const form = document.querySelector('form')

form.addEventListener('input', (e) => {
    if (e.target.value && e.target.checkValidity()) {
        addStoreBtn.dataset.bsDismiss = 'modal'
    } else addStoreBtn.removeAttribute("data-bs-dismiss")
})

form.addEventListener('submit', (e) => {

        const data = {name: 'default', domain: inputDomain.value, template: selectTemplate.value, theme: selectTheme.value}
        if (modalEl.classList.contains('modal__editing')) {
            const itemId = modalEl.dataset.itemId
            stores = stores.map(store => store.id === itemId ? ({...store, ...data }) : store)
            tabel.innerHTML = ''
            stores.forEach(createStore)
        } else {
            data.id = String(stores.length + 1)
            stores.push(data)
            createStore(data)
        }


    e.preventDefault()
})

function createStore(data) {
    const storeItem = document.querySelector('.store-item-template').content.firstElementChild.cloneNode(true);
    const storeItemId = storeItem.querySelector('.store-item-id')
    const storeItemName = storeItem.querySelector('.store-item-name')
    const storeItemDomain = storeItem.querySelector('.store-item-domain')
    const storeItemEditBtn = storeItem.querySelector('.btn-edit')
    const storeItemDeleteBtn = storeItem.querySelector('.btn-delete')

    storeItemId.textContent = data.id
    storeItemName.textContent = 'default'
    storeItemDomain.textContent = `http://www.${data.domain}.work5.ru`

    storeItemEditBtn.addEventListener('click', () => {
        modalEl.classList.add('modal__editing')
        modalEl.classList.remove('modal__creating')
        addStoreBtn.dataset.bsDismiss = 'modal'
        modalEl.dataset.itemId = data.id
        inputDomain.value = data.domain
        selectTemplate.value = data.template
        selectTheme.value = data.theme
    })
    storeItemDeleteBtn.addEventListener('click', () => {
        stores = stores.filter(store => store.id !== data.id)
        tabel.removeChild(storeItem)

    })
    tabel.appendChild(storeItem)
}

