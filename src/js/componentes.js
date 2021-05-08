import { Todo } from '../classes';
import { todoList } from '../index'

const divTodoList = document.querySelector('.todo-list');
const footer = document.querySelector('.footer');
const btnBorrar = document.querySelector('.clear-completed');
const txtInput = document.querySelector('.new-todo');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const contador = document.querySelector('.todo-count');

footer.setAttribute('hidden', '');

export const crearTodoHtml = (todo) => {
    footer.removeAttribute('hidden');
    const htmlTodo = `
            <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
                <div class="view">
                    <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                    <label>${todo.tarea}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li>
            `;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    contador.innerHTML=`<strong>${divTodoList.children.length-todoList.cargarCompletados()}</strong> pendiente(s)</span>`
    return div.firstElementChild;
}

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.trim().length > 0) {
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
        if (divTodoList.children.length === 0) footer.setAttribute('hidden', '')
    }
    contador.innerHTML=`<strong>${divTodoList.children.length-todoList.cargarCompletados()}</strong> pendiente(s)</span>`
});

btnBorrar.addEventListener('click', () => {
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }

    if (divTodoList.children.length === 0) footer.setAttribute('hidden', '')
    todoList.eliminarCompletados();
    contador.innerHTML=`<strong>${divTodoList.children.length-todoList.cargarCompletados()}</strong> pendiente(s)</span>`
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;
    if (!filtro) { return; };
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        event.target.classList.add('selected');
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});