

// 1) текущий день недели
// 2)текущий год 
// 3) текущимй месяц года
// 4) обращаемся к нашему календарю 
// 5) по заходу на страницу календаря он должен отрисоваться за текущий год
//   у нас должна отрисоваться таблица
//   6) функция которая будет отрисовывать таблицу.
// параметром передадим массив arr это наши числа при этом будут 
// учитываться пробелы в начале если 1 число будет начинаться не с понедельника 
// и пробелы в конце календаря если месяц закончится не на воскресекнье
// эта функция function createTable(){} параметром примет parent это и будет наша таблица

// 7) напишим функцию function createArr(from,to){} она будет отрисовывать в таблице числа от 1до 30
// и в нашем массиве будет заполнение от 1до 30

// 8) теперь нам нужно написать функцию,которая будет добовлять пучтые значение если 1 число не поподает
// на понедельник function pushElems(num, elem, arr) 
// параметр num говорит сколько нужно пустых элементов поместить до первого числа
// параметр arr принимает количестиво пустых ячеек до первого числа

// 9)эта функция function pushElems(num, elem, arr) добовляет пустые элементы в конец календаря 
//  если 30 или 31 или весокосный год попадают не на воскресенье

//  10) пишим функцию function drawDates(year, month, dates){}
// a)она принимает массив в котором будут находиться дни месяца
// b) затем переменную которая будет начинать месяц с 1
// g) и последний день месяца 

// 11) функция function getLastDayOfMonth(year, month) {}
// выводит помледний день месяца

// 12) function getUnshiftElemsNum(year, month) {} эта функция показвает количество пустых ячеект в начале
// календаря

// 13) function getPushElemsNum(year, month) {} эта функция показвает кол пустых ячеек после завершения месяца

// 14) теперь нам нужна функция function chunkArr(num, arr) {} которая наш массив разобьет по семь ячеек
// первый  параметр num  указывает на сколько элементов разбивать массив
// второй параметр arr в котором находятся наши ячейки

// начинаем работать над заполнением каждой функции.Начнем с последлнего дня месяца это функция
// 15)function getLastDayOfMonth(year, month) {}

// 16 теперь начнем заполнять функцию
// мы должны узнать на какой день попадет первое число текущего месяца
// нам нужна дополнительная функция которая бы определяла каждый день по счету
// пон 1 вт 2 ср 3 чт 4 пт 5 сб 6 вс 7 т.е текущий день недели 
// function getRealDayOfWeekNum(jsNumOfDay){}

// 17 теперь нам нужно написать дополнительную функцию которая будет определять 
// первый день недели текущего месяца и последнийдень текущего месяца
// function getFirstWeekDayOfMonthNum(year, month) {}

// теперь нам нужно написать дополнительную функцию которая будет определять последний день недели месяца
// 18) function getLastWeekDayOfMonthNum(year, month) 

// 19)заполняем функцию 7

// 20) заполняем функцию 8
// 21) заполняем функцию function chunkArr(num, arr) { }//14 
// 22) заполняем функцию  function createTable(arr, parent){  //6 отрисовываем таблицу
//23) заполняем функцию initCalendar(showedYear, showedMonth, calendar)
// 24) отрисовываем даду над календарем
// 25) пишем функцию  function getMonthName(num) {}
// 26 пишем функцию при нажатии на кнопку менялся год

 var arr = []; //a)создаем пустой массив 
  var firstDateOfMonth = 1; //b
  var LastDateOfMonth = getLastDayOfMonth(year, month); //g



var date = new Date(); //1
var showedYear = date.getFullYear(); //2
var showedMonth = date.getMonth(); //3

var calendar = document.querySelector('#calendar'); //5
initCalendar(showedYear, showedMonth, calendar);//функция которую вызываем напрямую в нее будем передовать год,месяц и дом элемент

// делаем смещение даты по стрелкам
var prev = calendar.querySelector('.prev');
var next = calendar.querySelector('.next');

// вешаем по клику функцию
// a)по нажатию на стрелку назад срабатывает ананимная функция

prev.addEventListener('click', function(event) {
  event.preventDefault();

  // b)ананимная фун текущее заначение года уменьшает на 1
  //g) текущее значение месяца уменьшает на 1
  // и вызывает функцию  initCalendar(showedYear, showedMonth, calendar);
   // initCalendar вызывается в самом начале

  showedYear = getPrevYear(showedYear, showedMonth); //получаем предыдущий год
  showedMonth = getPrevMonth(showedMonth); // получаем предыдущий месяц
  
  initCalendar(showedYear, showedMonth, calendar);
});


function getPrevYear(year,month) { //24
  if(month === 0) { //если у нас январь то минус 1
    return year - 1;
  } else {
    return year;
  }
}

function getPrevMonth(month) {
  if(month === 0) { 
    return  11;
  } else {
    return month - 1;
  }
}

next.addEventListener('click', function(event) {
  event.preventDefault();
  
  showedYear = getNextYear(showedYear, showedMonth); //получаем предыдущий год
  showedMonth = getNextMonth(showedMonth); // получаем предыдущий месяц
  
  initCalendar(showedYear, showedMonth, calendar);
});

function getNextYear(year,month) {
  if (month === 11) {
    return year + 1;
  } else {
    return year;
  }
}

function getNextMonth(month) {
  if(month === 11) {
    return  0;
  } else {
    return month +1;
  }
}



// эта функция будет отвечать за отрисовку таблицы
function initCalendar(year, month, calendar){ //23)эта функция будет отвечать за начальную  инициализацию календаря,и когда будем жать на стрелки
  var dates = calendar.querySelector('.dates'); //по нажатию на стрелку будет получится дом элемент
  var info = calendar.querySelector('.info');//
  
  drawDates(year, month, dates);
  showInfo(year, month, info);//отрисовываем год над календарем
}

function showInfo(year, month, elem) { //отрисовываем год над календаре
  elem.innerHTML = getMonthName(month) + ' ' + year;
}

function getMonthName(num) { //25
  var monthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  return monthes[num];
}

function drawDates(year, month, dates) { //10)отрисовываем даты внутри функции initCalendar()
  var arr = []; //1)создаем пустой массив 
  var firstDateOfMonth = 1; //первый день месяца
  var LastDateOfMonth = getLastDayOfMonth(year, month); // параметр month принимает последний день месяца
  // текущего года параметра year
  
  var unshiftElemsNum =  getUnshiftElemsNum(year, month); //количество пустые ячейки до первого числа
  // параметры указывают на какой день недели попадет первое число

  var pushElemsNum = getPushElemsNum(year, month);// количиство пустые ячейки если последний день месяца не заканчивается на 
  // воскресенье
  
  arr = createArr(firstDateOfMonth, LastDateOfMonth); //получаем в массив первый и последний день
  arr = unshiftElems(unshiftElemsNum, '', arr); // получаем в массив отрисовка пустых ячеек в массиве
  arr = pushElems(pushElemsNum, '', arr); // получаем в массив отрисовка пустых ячеек в конце массива
  arr = chunkArr(7, arr); // получаем в массив отрисовка в массиве 7 дней .
  
  createTable(arr, dates);
}



function createTable(arr, parent){  //6 отрисовываем таблицу
  parent.innerHTML = ''; //очищает календарь
  
  for(var i = 0; i < arr.length; i++){
    var tr = document.createElement('tr');
    
    for(var j = 0; j < arr[i].length; j++){
      var td = document.createElement('td');
      td.innerHTML = arr[i][j];
      tr.appendChild(td);
    }
    
    parent.appendChild(tr);
  }
}
 // пишем функцию которая параметром принимает число и число 
 // и заполняет массив
function createArr(from,to) { //7
  var arr = [];
  
  for (var i = from; i <= to; i++) {
    arr.push(i);
  }
  
  return arr;
}

function unshiftElems(num, elem, arr) { //8 добовляет в начало пустые элементы
  for(var i = 0; i < num; i++){
    arr.unshift(elem);
  }
  
  return arr;
}

function pushElems(num, elem, arr) { //9
  for(var i = 0; i < num; i++){
    arr.push(elem);
  }
  
  return arr;
}

// // второй способ
// 1) пишем переменную и в нее помещаем ноовый объект new Date
// параметр manth +1 следующий месяц,0  день следующего месяца
// проверяем я нварь +1 это февраль 0  день это 31 января

function getLastDayOfMonth(year, month) { //выводит последний день месяца
  var date = new Date(year, month + 1 , 0); //15)c этой функции трепачов начал заполнения написать 
  // первый вариант нахождения весокосного года
     return date.getDate(); // getDate() -это день недели
}


function getUnshiftElemsNum(year, month) { //12
  var jsDayNum = getFirstWeekDayOfMonthNum(year,month);
  var realDayNum = getRealDayOfWeekNum(jsDayNum);
  
  return realDayNum - 1; //от реального дня отнимаем 1 и получаем количество пустых ячеек
  // в начале массива
}

function getPushElemsNum(year, month) { //13
  var jsDayNum = getLastWeekDayOfMonthNum(year, month);
  var realDayNum = getRealDayOfWeekNum(jsDayNum);
  
  return 7 - realDayNum; //от семи отнимаем реальный день и получаем количество
  // пустых ячеек в конце массива
}

function chunkArr(num, arr) { //14 
  var result = []; //массив после обрезки
  var chunk = [];
  var iterCount = arr.length / num; //находим количество итераций
  
  for (var i = 0; i < iterCount; i++) {
    chunk = arr.splice(0, num); //обрезаем массив
    result.push(chunk);// помещаем вырезанную часть в result
  }
  
  return result;
}

function getRealDayOfWeekNum(jsNumOfDay){ //16
  // если ноль,то возврашщаем воскресенье
  if (jsNumOfDay === 0){ 
    return 7; //весь рад заполниться 7 значениями
  } else {
    return jsNumOfDay;
  }
}


// эта функция возвращает номер первого дня месяца
function getFirstWeekDayOfMonthNum(year, month) { //17)получает первый день недели  месяца
  var date = new Date(year, month, 1);
  return date.getDay();
}


function getLastWeekDayOfMonthNum(year, month) { //18
  var date = new Date(year, month + 1, 0);
  return date.getDay();
}
