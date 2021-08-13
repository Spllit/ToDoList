const input = document.getElementById('inp')
const button = document.querySelector('.add__btn')
const activeCardHolder = document.querySelector('.complete__body')
const tasks = document.getElementsByClassName('task')
const btnDelete = document.getElementsByClassName('task__delete')
const checkbox = document.getElementsByClassName('checkbox__input')
let activeTasks = []

window.onload = fillTaskCard(activeCardHolder, 'activeTasks')

button.addEventListener('click', () => {
    if(input.value.length > 0){
        activeTasks.push(new Task(input.value, false))
        updateLocalStorage('activeTasks', activeTasks) 
        fillTaskCard(activeCardHolder, 'activeTasks')
        input.value = ''
    }
})

function updateLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))    
    
}

function getLocalData(key) {
    if(!(localStorage.key)){
        key = []
    }
        return key = JSON.parse(localStorage.getItem(key))
}


function completeChecker() {
    for(let i = 0; i < checkbox.length; i++){
        checkbox[i].addEventListener('click', () => {
            activeTasks[i].completed = !activeTasks[i].completed
            updateLocalStorage('activeTasks', activeTasks) 
            getComplete(i)
        })
    }
}

function fillTaskCard(cardHolder, key) {
    cardHolder.innerHTML = ''
    getLocalData(key).forEach((item, index) => {
        cardHolder.innerHTML += createTemplate(item)
        if(getLocalData(key)[index].completed){
            tasks[index].classList.add('task__checked')
            checkbox[index].setAttribute('checked', 'checked')
            tasks[index].children[1].style.textDecoration = 'line-through'
        }
        else{
            tasks[index].classList.remove('task__checked')
            checkbox[index].removeAttribute('checked', 'checked')
            tasks[index].children[1].style.textDecoration = 'none'
        }
    }); 
    completeChecker()
    deleteListener()
}

function getComplete(index) {

    if(activeTasks[index].completed){   
        tasks[index].classList.add('task__checked')
        tasks[index].setAttribute('checked', 'checked')
        tasks[index].children[1].style.textDecoration = 'line-through'
    }
    else{
        tasks[index].classList.remove('task__checked')
        tasks[index].removeAttribute('checked', 'checked')
        tasks[index].children[1].style.textDecoration = 'none'
    }
}
function deleteListener() {
    for(let i = 0; i < btnDelete.length; i++){
        btnDelete[i].addEventListener('click', () => {
            deleteTask(i)
        })
    }
}
function deleteTask(index) {
    activeTasks.splice(index, 1)
    updateLocalStorage('activeTasks', activeTasks)
    fillTaskCard(activeCardHolder, 'activeTasks')
}

function createTemplate(task) {
    return `
    <div class="task">
        <div class="task__checkbox-wrapper">
            <label class="task__checkbox checkbox">
                <input type="checkbox" class="checkbox__input">
                <span class="checkbox__span"></span>
            </label>
        </div>
        <div class="task__description">
        ${task.description}
        </div>
        <button class="task__delete btn ">                            
        </button>
    </div>
    `
}