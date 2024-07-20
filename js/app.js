console.log('hello world')
const submitButton = document.getElementById('task-submit')
const taskList = document.getElementById('tasks-list')
const taskInput = document.getElementById('task-input')

submitButton.addEventListener('click', function (e) {
    e.preventDefault()
    console.log(taskInput.value)
    const task = taskInput.value
    taskList.innerHTML += `<li><input type="checkbox"
        class="checkbox" class="checkbox"><label for="checkbox">${task}</label></li>`
    taskInput.value = ''

})