/*
приведенные ниже примеры при минимальных изменениях задачи переделать следующими способами:
  1)Переделать if на тернарный оператор
2)Каждую задачу решить различными методами forEach, map, reduce, filter, some, every
3)Немного изменив условие решить с применением таймеров
4)добавить в решение промиссы и классы
5)изменяем условие и используем this,call,apply
6)использование объектов
основная задача: Последовательно шаг за шагом проработать все перечисленные темы с целью закрепление технического материала и развитие понимание какими кирпичиками можно пользоваться в решении подобных задач.
*/
let arr1 = ["россия","беларусь","украина"];
let str = "беларусь";
arr1.forEach(elem => console.log(elem === str));
console.log(arr1.map(elem => elem === str));

arr1.forEach(elem => setTimeout(() => console.log(elem === str), 10));

const somePromise = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    arr1.forEach(elem => resolve((elem === str) + ' Promise'));
  }, 10);
  //reject('Woops some wrong');
});
somePromise()
  .then(response => console.log(response))
  .catch(err => console.error(err));

  

for(let i = 0; i < arr1.length; i++) {
  if (arr1[i] === str) {
    console.log("true");
  } else {
    console.log("false");
  }
}

for(let i = 0; i < arr1.length; i++) {
  (arr1[i] === str) ? console.log("true") : console.log("false");
}

for(let i = 0, someElse = 'some else'; i < arr1.length; i++) {
  console.log((arr1[i] === str), someElse);
}

arr1.forEach(elem => console.log(elem === str));
console.log(arr1.map(elem => elem === str));

arr1.forEach(elem => setTimeout(() => console.log(elem === str), 10));

const somePromise = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    arr1.forEach(elem => resolve((elem === str) + ' Promise'));
  }, 10);
  //reject('Woops some wrong');
});
somePromise()
  .then(response => console.log(response))
  .catch(err => console.error(err));




//еще пример
let arr2 = ["пн","вт","ср","чт","пт","сбб","вс"];

for (let i = 0; i < arr2.length; i++) {
  if(arr2[i] === 5 || arr2[i] === 6) {
    console.log('<b>'+ arr[i] + '</b>');
  } else {
    console.log(arr2[i]);
  }
}
//думаю это на несколько уроков.
