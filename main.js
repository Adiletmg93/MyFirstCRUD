// TODO ================================== ClassWork ============================== date 14.02.2023

// Создать 4 инпута(name, email, imageUrl, phone)

// -Реализовать весь функционал CRUD:

// ---Create (Создание контакта)

// ---Read (Вывести список контактов)

// ---Update (Сделать редактирование)

// ---Delete (Сделать удаление)

// (данные должны храниться в localStorage)
// сдать необходимо ссылку на GitHub!
// zip файл не будет проверяться

//! ================ Достаем элементы из HTML

let btn = document.querySelector(".btn-sozdat");

let inpname = document.querySelector(".name-input");
let inpemail = document.querySelector(".email-input");
let inpimage = document.querySelector(".imageurl-input");
let inpphone = document.querySelector(".phone-input");

let list = document.querySelector(".task-list");

//! ======================== CREATE =========================== создаем ==============================

btn.addEventListener("click", () => {
  //проверка на заполненность инпута
  if (
    !inpname.value.trim() ||
    !inpemail.value.trim() ||
    !inpimage.value.trim() ||
    !inpphone.value.trim()
  ) {
    alert("Заполните поле");
    return; //для того чтобы весь код ниже не работал
  }

  //помещаем значения  инпута в обьект под ключами
  let obj = {
    name: inpname.value,
    email: inpemail.value,
    image: inpimage.value,
    phone: inpphone.value,
  };

  console.log(obj); //проверили что есть в OBJ

  toStorage(obj); //вызов функции, добавления в LocalStorage

  createElem();

  inpname.value = "";
  inpemail.value = "";
  inpimage.value = "";
  inpphone.value = ""; // помогает очиститься инпуту // очищаем инпут
});

// !================ Функция  ложит CRUD  в локальное хранилище ==================================

function toStorage(crud) {
  //проверка на то , что есть ли в LocalStorage что нибудь под ключом tsaks-data
  if (!localStorage.getItem("mycrud")) {
    //если нет, то добавляем по данным ключом пустой массив
    localStorage.setItem("mycrud", "[]");
  }

  //мы стягиваем из LocalStorage данные и приводим их к JS формату
  let data = JSON.parse(localStorage.getItem("mycrud"));

  data.push(crud); // добавляем новый обьект в массив

  //уже обновленный массив преобразовываем в JSON формат и отправляем в LocalStorage, чтобы то что прописали в инпутах сохранялись (отправлялись) в хранилище
  localStorage.setItem("mycrud", JSON.stringify(data));
}

// ! =================== READ ============== функция выводит на экран ================================

createElem();
//  отображение данных
function createElem(crud) {
  //  если нет данныех по данным ключом добавляем пустой массив чтобы не было ошибок
  if (!localStorage.getItem("mycrud")) {
    //? если нет, то добавляем по данным ключом пустой массив
    localStorage.setItem("mycrud", "[]");
  }

  //  стягиваем данные из LocalStorage И преобразовываем в JS формат
  let newData = JSON.parse(localStorage.getItem("mycrud"));

  list.innerHTML = ""; // очищаем содержимое списка , для того чтобы не было дублирования

  console.log(newData); //посмотрели достаются ли данные

  newData.forEach((item, index) => {
    // перебираем массив данных и для каждого элемента этого массива , создаем тег Li c 2мя кнопками
    let newUl = document.createElement("ul"); // создаем новую ul
    newUl.classList.add("myNewUl"); // задали класс новому элементу (тегу)чтобы потом в css задавать стили

    // let img = document.createElement("img");// в начале создавал но в принципе не нужен был
    let btnDelete = document.createElement("button"); // создаем кнопку
    let btnEdit = document.createElement("button");

    newUl.innerHTML += `<li class="nli1">${item.name}</li> <li>${item.email}</li><img class="myimage" src=${item.image}><li>${item.phone}</li>`; //будет все в столбик
    btnDelete.innerText = "Удалить"; // добавили текст в саму кнопку
    btnEdit.innerText = "Изменить";
    newUl.append(btnDelete); // с помощью этого добавляем кнопку в li
    newUl.append(btnEdit);
    list.append(newUl); // добавляем в тег ul , новый созданный тег ul
    // list.append(img); // не нужен

    //! ==================== Стилизуем ====================
    btnEdit.style = `background-image: linear-gradient(to bottom, #4d8dec, #6f81f5, #996ff6, #c353eb, #eb12d5); border-radius: 5px; width:70px;height:30px;`;

    btnDelete.style = `background-image: linear-gradient(to bottom, #4d8dec, #6f81f5, #996ff6, #c353eb, #eb12d5); border-radius: 5px; width:70px;height:30px;`;

    // img.style = `width:200px;height:200px;`;
    //! =============================

    // добавили слушатели событий на кнопке dekete и edit
    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });

    btnEdit.addEventListener("click", () => {
      editElement(index);
    });
  });
}

// ========================= когда здесь прописали стили то он не сработал поэтому его перенесли за слушателей событий

// btnEdit.style.cssText = `background-color:red`;

// ! ============ UPDATE (edit) ========================== изменение ===============================

// получаем элементы модального окна
let mainModal = document.querySelector(".main-modal");

let inp1Edit = document.querySelector(".inp1-edit");
let inp2Edit = document.querySelector(".inp2-edit");
let inp3Edit = document.querySelector(".inp3-edit");
let inp4Edit = document.querySelector(".inp4-edit");

let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");
// console.log(mainModal, inpEdit, btnCloser);

// ================= добавление стиля

// btnSave.style.cssText = `background-color:red`;
// ! ================================== edit =======================================
// функция редактирования
function editElement(index) {
  // который в первую очередь отображаем модальное окно
  mainModal.style.display = "block"; // меняем дисплей ноне на дисплей блок чтобы он отображался

  //  тут мы получаем данные из хранилища
  let editData = JSON.parse(localStorage.getItem("mycrud")); // вытаскивем содержимое хранилища
  //  заполняем инпут
  // console.log(data[index].task);

  inp1Edit.value = editData[index].name;
  inp2Edit.value = editData[index].email;
  inp3Edit.value = editData[index].image;
  inp4Edit.value = editData[index].phone; // тут в занчение InpEdit заносим дата индекс, мы написали так чтобы обратиться именно к занчению

  //   задаем атрибут Id  для  последующего сохранения
  inp1Edit.setAttribute("id", index); // а этот оставляем обьязательно
  inp2Edit.setAttribute("id", index); // их можно удалить
  inp3Edit.setAttribute("id", index); // можно удалить
  inp4Edit.setAttribute("id", index); // Добавляет Id при каждом клике на EDit
}
// !==================================== переход обратно к главному , закрываем
// ? ============ вызвали х чтобы обратно вернутся назад. можно сразу прописать в слушатель событий , а можно отдельно функцию создать туда задать то что мы хотим и эту функцию закинуть в слушатель событий клик
// слущатель событий для закрытия модального окна

btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});

// //! ======================================== save =============================
//  слушатель событий для сохранения элемента , кторый был отредактирован
btnSave.addEventListener("click", () => {
  //  получаем данные из хранилища
  let saveData = JSON.parse(localStorage.getItem("mycrud"));

  //  получаем индекс редактируемого элемента
  let index = `${inp1Edit.id}`;

  //    проверка на заполненность , заполнен ли инпут , если не заполнен то выйдет Заполните поле
  if (
    !inp1Edit.value.trim() ||
    !inp2Edit.value.trim() ||
    !inp3Edit.value.trim() ||
    !inp4Edit.value.trim()
  ) {
    alert("Заполните полеж");
    return;
  }
  //    формируем новый , уже отредактированный обьект
  let editedCrud = {
    name: inp1Edit.value,
    email: inp2Edit.value,
    image: inp3Edit.value,
    phone: inp4Edit.value,
  };
  console.log(editedCrud); // проверили что содержит editedTask
  //    далее при помощи Splice заменяем старый обьект на новый (который отредактировали)
  saveData.splice(index, 1, editedCrud);

  //   отправляем  обновленный массив в хранилище
  localStorage.setItem("mycrud", JSON.stringify(saveData));
  //    закрываем модальное окно
  mainModal.style.display = "none";
  //    вызываем функцию для отображения обновленных данных, отображаем обновленные данные
  createElem();
});

// ! ================= DELETE  ======================== функция удаления ============================

//  функция для удалиения таска
function deleteElement(index) {
  //  плучаем данные их хранилища(массив)
  let deleteData = JSON.parse(localStorage.getItem("mycrud"));

  deleteData.splice(index, 1); // удаляем 1 элемент по индексу

  localStorage.setItem("mycrud", JSON.stringify(deleteData)); // отправляем обновленный массив в хранилище

  createElem(); // отображаем изменненный массив из хранилища
  //   console.log(data);
}
