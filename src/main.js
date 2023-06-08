import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

import { formRef, jsContainerRef } from './refs/index';
import { saveData, getData, deleteData, updateData } from './api';
import { createCard } from './markup/index';

formRef.addEventListener('submit', handleFormValue);

// Вспомогательная переменная - объект для сбора данных из формы.
// let formData = {}; //!!! к 1-у варианту получения данных из формы.

async function handleFormValue(event) {
    // Блокируем перезагрузку страницы по умолчанию.
    event.preventDefault();

    //! 1-й вариант получения данных из формы
    // // Создаем переменную для получения данных с формы.
    // const form = event.currentTarget.elements;

    // // Создаем переменные для получения данных с инпутов по их атребуту "name".
    // const name = form.name.value.trim();
    // const number = form.number.value.trim();
    // const email = form.email.value.trim();

    // // Заполняем промежуточную переменную данными.
    // formData = {
    //     name,
    //     number,
    //     email,
    // };
    
    // // Выводим в лог полученные из формы данные
    // console.log(formData);

    //!==========================================================

    //! 2-й вариант получения данных из формы
    // // Создаем вспомогательную переменную и задаем ей в качестве значения служебный класс "FormData", а ему параметр - "event.currentTarget".
    // const formData = new FormData(event.currentTarget);

    //!----------------------------------------------------------

    // Выводим в лог данные из формы, перебирая их с помощью встроенного в стандартный класс "FormData" метода - "forEach".
    // formData.forEach((value, key) => {
    //     console.log(key, value);
    // });

    //!----------------------------------------------------------

    // // Cоздаем вспомогательную переменную - объект, и заполняем ее данными из класса "FormData", используя метод - "forEach".
    // const dataFromFormData = {};
    

    // formData.forEach((value, key) => {
    //     dataFromFormData[key] = value;
    // });

    // // Выводим в лог - "dataFromFormData".
    // console.log(dataFromFormData);

    //!==========================================================

    //! 3-й вариант получения данных из формы
    const dataFromFormData2 = Object.fromEntries(new FormData(event.currentTarget));

    // console.log(dataFromFormData2); //!!!

    //! Обрати внимание на то, что метод "Object.fromEntries()" - вытащил в формате объекта всю информацию, из итерируемой стандартной сущности "FormData".

    // Создаем новое свойство с данными в виде текущей даты создания запроса.
    dataFromFormData2.createdAt = Date.now();

    const response = await saveData(dataFromFormData2);

    // console.log(response);

    // Добавляем код для автоматического обновления страницы при вводе новых данных в форму.
    const markup = createCard([response]);

    addMarkup(markup);
};


// Создаем функцию, которая получает существующие в базе данных данные, преобразовывает их в разметку и вставляет в DOM.
async function init() {
    // Получаем данные.
    const response = await getData();

    // console.log(response);

    // Создаем разметку.
    const markup = createCard(response);

    // console.log(markup);

    // Вставляем разметку в DOM.
    addMarkup(markup);
}

// Запускаем функцию "init()" для первоначального заполнения страницы данными, которые на момент запуска есть в БД.
init();

// Код функции для вставки разметки в DOM.
function addMarkup(markupData) {
    jsContainerRef.insertAdjacentHTML('beforeend', markupData);
}

// Вешаем слушателя на "jsContainerRef" для регистрации события 'click' на кнопке "Х" карточек, и запуске соответствующей функции "deleteCard".
jsContainerRef.addEventListener('click', deleteCard);

// Функция удаления карточки из базы данных.
async function deleteCard(evt) {
    // Выполняем проверку "try...catch".
    try {
        // Пишем код проверки - если кликнули НЕ в кнопку, то выходим из функции - "return".
        if (evt.target.nodeName !== 'BUTTON') {
            return;
        }

        // console.log(evt.target);

        // Создаем ссылку-привязку на тег-<div> врапера карточки, в атрибуты которого записывается "id" из базы данных для каждой отдельной карточки (см. разметку карточек).
        const cardWrapRef = evt.target.closest('.js-wrap-card');

        // console.log(cardWraRef);
        
        // "Вынимаем" в переменную значение "id" соответствующей карточки.
        const id = cardWrapRef.dataset.cardid;

        // console.log(id)

        // Удаляем данные о соответствующей карточке из базы данных.
        const response = await deleteData(id);
        
        // Удаляем соответствующую карточку из разметки страницы.
        cardWrapRef.remove();
    } catch (err) { 
        console.log(err.message);
    }
}


//! Обрабатываем событие интерактивного изменения имени на странице сайта. Организованный благодаря использованию атрибута (contenteditable="true") в загаловке (см. код разметки карточек, тег-<h2>).

// Вешаем слушателя на "jsContainerRef" для регистрации события 'input' на тегах-<h2> карточек, и запуске соответствующей функции "jsContainerInput".
jsContainerRef.addEventListener('input', jsContainerInput);

async function jsContainerInput(evt) {
    try {
        // Получаем данные которые пользователь вводит в соответствующий инпут и задаем их переменной.
        const value = evt.target.textContent;

        // console.log(value)

        // Создаем ссылку-привязку на тег-<div> врапера карточки, в атрибуты которого записывается "id" из базы данных для каждой отдельной карточки (см. разметку карточек).
        const cardWrapRef = evt.target.closest('.js-wrap-card');

        // "Вынимаем" в переменную значение "id" соответствующей карточки.
        const id = cardWrapRef.dataset.cardid;

        const response = await updateData(id, { name: value });
    
        // console.log(response);
    } catch (err) { 
        console.log(err.message);
    }
}