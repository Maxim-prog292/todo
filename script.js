'use strict';

const input = document.querySelector('#task'),
      add = document.querySelector('.add'),
      list = document.querySelector('.tasks');

let arr = [];

window.addEventListener('click', (e) => {
    if (e.target.getAttribute('data-del') == 'del') {
        e.target.parentElement.remove();

        const id = e.target.parentElement.id;

        if (id == localStorage.key(id)) {
            localStorage.removeItem(id)
        }

        console.log(localStorage.key(id), id)
    }
})


add.addEventListener('click', () => {
    addTask()
})
this.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        addTask()
    }
})

function addTask() {
    let task = input.value;
    arr.push(new Task(task));

    list.innerHTML = '';
    input.value = '';

    arr.forEach(({task}, i) => {
        createTask(i, task);
        localStorage.setItem(`task${i}`, JSON.stringify({'task': task}));
    })
}

for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem('task1') && localStorage.length == 1) {
        fromStorage(1)
    } else {
        fromStorage(i)
    }
    
}

function fromStorage(i) {
    let task = JSON.parse(localStorage.getItem(`task${i}`));
    arr.push(task);
    createTask(i, task.task);
}

class Task {
    constructor(task) {
        this.task = task;
    }
    render() {
        return (
            {
                'task': this.task,
            }
        )
    }
}

function createTask(i, task) {
    const item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('id', `task${i}`);
        item.innerHTML = `<span>${task}</span><span data-del='del'>&#215;</span>`;
        list.append(item);
}
