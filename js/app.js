const submitButton = document.getElementById('task-submit')
const taskList = document.getElementById('tasks-list')
const taskInput = document.getElementById('task-input')

function loadData() {
    const data = sessionStorage.getItem('tasks')
    const completedTask = sessionStorage.getItem('completedTasks')
    if (data) {
        const tasks = JSON.parse(data)
        tasks.forEach(task => {
            taskList.innerHTML += `<li><input type="checkbox" name="checkbox" class="checkbox" onclick="complteTask(this)"><label for="checkbox">${task}</label><button onclick="deleteTask(this)">Delete</button></li>`
        })
    }
    if (completedTask) {
        const completedTasks = JSON.parse(completedTask)
        completedTasks.forEach(task => {
            taskList.innerHTML += `<li style="text-decoration:line-through;"><input type="checkbox" name="checkbox" class="checkbox" checked onclick="completeTask(this)"><label for="checkbox">${task}</label><button onclick="deleteTask(this)">Delete</button></li>`
        })
    }
}

loadData()

submitButton.addEventListener('click', function (e) {
    e.preventDefault()
    console.log(taskInput.value)
    const task = taskInput.value
    sessionStorage.setItem('tasks', JSON.stringify([...JSON.parse(sessionStorage.getItem('tasks') || '[]'), task]))

    taskList.innerHTML += `<li><input type="checkbox" name="checkbox"
        class="checkbox" onclick="completedTask(this)"><label for="checkbox">${task}</label> <button onclick="deleteTask(this)">Delete</buuton></li>`
    taskInput.value = ''
    

})

function completedTask(e) {
    const tasks = JSON.parse(sessionStorage.getItem('tasks'))
    const completedTasks = JSON.parse(sessionStorage.getItem('completedTasks'))
    const newTasks = tasks.filter(task => task !== e.parentElement.children[1].
        textContent)
    sessionStorage.setItem('tasks', JSON.stringify(newTasks))

    if (e.checked) {

        e.parentElement.style.textDecoration = 'line-through'
        sessionStorage.setItem('completedTasks', JSON.stringify([...JSON.parse(sessionStorage.getItem('completedTasks') || '[]'), e.parentElement.children[1].textContent]))
    } else {
        e.parentElement.style.textDecoration = 'non';
        const newCompletedTasks = completedTasks.filter(task => task !== e.parentElement.children[1].textContent)
        sessionStorage.setItem('completedTasks', JSON.stringify(newCompletedTasks))
        sessionStorage.setItem('task', JSON.stringify([...JSON.parse(sessionStorage.getItem('task') || '[]'), e.parentElement.children[1].textContent]))

    }

}

function deleteTask(e) {
    e.parentElement.remove()
    const tasks = JSON.parse(sessionStorage.getItem('tasks'))
    const newTasks = tasks.filter(task=>task !== e.parentElement.children[1].textContent)
    sessionStorage.setItem('tasks', JSON.stringify(newTasks))
    const completedTasks = JSON.parse(sessionStorage.getItem('completedTasks'))
    const newCompletedTask = completedTasks.filter(task => task !== e.parentElement.children[1].textContent)
    sessionStorage.setItem('completedTasks', JSON.stringify(newCompletedTask))
}