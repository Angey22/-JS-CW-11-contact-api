//! Реализация 'POST' запроса с помощью прямого использования метода "fetch()" и асинхронных функций.

// // Создаем переменную с "точкой входа".
// const BASE_URL = 'http://localhost:3000/contacts';

// // Создаем переменную-объект с набором параметров запроса для метода "fetch()".
// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: '',
// }

// // Пишем код функции для осуществления 'POST' запроса используя метод "fetch()".
// export async function saveData(payload) {

//     // Добавляем в сво-во "body" данные из аргумента "payload".
//     options.body = JSON.stringify(payload);

//     // Отправляем запрос на сервер, с нужными данными.
//     const response = await fetch(BASE_URL, options);

//     // Ждем ответ от сервера и возвращаем его в качестве результата работы функции.
//     return await response.json();
// }


//!==============================================================


//! Реализация 'POST' запроса с помощью библиотеки "axios".

// // Подключаем библиотеку "axios" к скрипту
// import axios from 'axios';

// // Задаем дефолтный параметр для точки входа для библиотеки "axios".
// axios.defaults.baseURL = 'http://localhost:3000/contacts';

// // Пишем код функции для осуществления 'POST' запроса используя библиотеку "axios".
// export async function saveData(payload) {
//     const response = await axios.post('', payload);

//     return response.data;
// }

//!==============================================================


//! Реализация 'POST' запроса с помощью класса "XMLHttpRequest".

// Важной особенностью класса "XMLHttpRequest" для осуществления запросов на сервер, является то, что данный класс НЕ возвращает промис. Поэтому, при использовании его в коде запроса - необходимо выполнять "промисофикацию" функции (Это когда мы берём функцию, которая принимает колбек и меняем её, чтобы она вместо этого возвращала промис).

// Создаем переменную с "точкой входа".
const BASE_URL = 'http://localhost:3000/contacts';

// Создаем новый экземпляр "XMLHttpRequest()" класса.
const req = new XMLHttpRequest();

// Пишем код функции для осуществления 'POST' запроса используя экземпляр "XMLHttpRequest()" класса.
export async function saveData(payload) {

    // Выполняем "промисификацию" функции.
    return new Promise((resolve, reject) => {

        // 1. Используя метод "open([тип запроса], [точка входа])", задаем тип запроса и точку входа для нашего запроса через класс "XMLHttpRequest()".
        req.open('POST', BASE_URL);

        // 2. С помощью свойства класса "responseType" задаем параметры типа данных принимаемых в ответе от сервера.
        req.responseType = 'json';

        // 3. Используя свойство класса "setRequestHeader" задаем тип заголовка запроса.
        req.setRequestHeader('Content-Type', 'application/json');

        // 4. Используя метод класса "send([отправляемые на сервер данные])" задаем данные для отправки на сервер в формате JSON.
        req.send(JSON.stringify(payload));

        // 5. Применяя метод класса "onload" создаем ананимную функцию для получения ответа от сервера, т.е. для обработки "resolve" промиса ("onload" - это аналог "then" в методе "fetch()").
        req.onload = function () {
            resolve(req.response);
        }

        // 6. Применяя метод класса "onerror" создаем ананимную функцию для получения ответа от сервера, т.е. для обработки "resolve" промиса ("onerror" - это аналог "then" в методе "catch()").
        req.onerror = function () { 
            reject(req.console.error());
        }
    });
}

//! Последовательность использования методов и вызовов соответствующих свойств класса "XMLHttpRequest()" - играет роль!!!

//!==============================================================


//! Реализация 'GET' запроса с помощью прямого использования метода "fetch()" и асинхронных функций.

// // Создаем переменную с "точкой входа".
// const BASE_UR2 = 'http://localhost:3000/contacts';

// export const getData = () => {
//     return fetch(BASE_UR2)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.statusText);
//             }

//             return response.json();
//         });
// }

//!==============================================================

//! Реализация 'GET' запроса с помощью библиотеки "axios".

// // Подключаем библиотеку "axios" к скрипту.
// import axios from 'axios';

// // Задаем дефолтный параметр точки входа для библиотеки "axios".
// axios.defaults.baseURL = 'http://localhost:3000/contacts';

// // Пишем код функции для осуществления 'GET' запроса используя библиотеку "axios".
// export const getData = async () => {
//     const response = await axios.get('')
//     // console.log(response.data)

//     return response.data;
// }

//!==============================================================

//! Реализация 'GET' запроса с помощью класса "XMLHttpRequest".
// Экземпляр "XMLHttpRequest" класса был создан ранее (см. код - Реализация 'POST' запроса с помощью класса "XMLHttpRequest").

// Создаем переменную с "точкой входа".
const BASE_URL2 = 'http://localhost:3000/contacts';

// Пишем код функции для осуществления 'GET' запроса используя экземпляр "XMLHttpRequest()" класса.
export const getData = async () => {
    return new Promise((resolve, reject) => {
        req.open('GET', BASE_URL2);

        req.responseType = 'json';

        req.send();

        req.onload = function () {
            resolve(req.response);
        }

        req.onerror = function () {
            reject(req.console.error());
        }
    });
}

//!==============================================================

//! Реализация 'DELETE' запроса с помощью прямого использования метода "fetch()" и асинхронных функций.

// Создаем переменную с "точкой входа".
const BASE_URL3 = 'http://localhost:3000/contacts';

// Пишем код функции для осуществления 'DELETE' запроса используя метод "fetch()".
export const deleteData = id => {
    const response = fetch(BASE_URL3 + '/' + id, { method: 'DELETE' }).then(res => {
        if (!res.ok) {
            throw new Error(response.statusText);
        }

        return res.json();
    });

    return response;
}

//!==============================================================

//! Реализация 'PATCH' запроса с помощью прямого использования метода "fetch()" и асинхронных функций.

export const updateData = (id, item) => {
    const response = fetch(BASE_URL3 + '/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    }).then(res => {
        if (!res.ok) {
            throw new Error(response.statusText);
        }

        return res.json();
    });

    return response;
}