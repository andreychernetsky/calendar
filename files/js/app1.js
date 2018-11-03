var date = new Date();
var showedYear = date.getFullYear();
var showedMonth = date.getMonth();

var calendar = document.getElementById('calendar');
// делаем смещение даты по стрелкам
var prev = calendar.getElementsByClassName('prev')[0];
var next = calendar.getElementsByClassName('next')[0];

function getPrevYear(year,month) {
  return (month === 0) ? year - 1 : year;
}

function getPrevMonth(month) {
  return (month === 0) ? 11 : month - 1;
}

function getNextYear(year,month) {
  return (month === 11) ? year + 1 : year;
}

function getNextMonth(month) {
  return (month === 11) ? 0 : month + 1;
}

prev.addEventListener('click', function(event) {
  event.preventDefault();
  
  showedYear = getPrevYear(showedYear, showedMonth); //получаем предыдущий год
  showedMonth = getPrevMonth(showedMonth); // получаем предыдущий месяц
  
  initCalendar(showedYear, showedMonth, calendar);
});

next.addEventListener('click', function(event) {
  event.preventDefault();
  
  showedYear = getNextYear(showedYear, showedMonth); //получаем предыдущий год
  showedMonth = getNextMonth(showedMonth); // получаем предыдущий месяц
  
  initCalendar(showedYear, showedMonth, calendar);
});

function getRealDayOfWeekNum(jsNumOfDay){
  return (jsNumOfDay === 0) ? 7 : jsNumOfDay; // если ноль,то возврашщаем воскресенье
}

function getFirstWeekDayOfMonthNum(year, month) { //получает первый день недели  месяца
  var date = new Date(year, month, 1);
  return date.getDay();
}

function getLastWeekDayOfMonthNum(year, month) {
  var date = new Date(year, month + 1, 0);
  return date.getDay();
}

function getLastDayOfMonth(year, month) {
  var date = new Date(year, month + 1 , 0);
  
  return date.getDate(); // getDate() -это день недели
}

function getUnshiftElemsNum(year, month) {
  var jsDayNum = getFirstWeekDayOfMonthNum(year,month);
  var realDayNum = getRealDayOfWeekNum(jsDayNum);
  
  return realDayNum - 1;
}

function getPushElemsNum(year, month) {
  var jsDayNum = getLastWeekDayOfMonthNum(year, month);
  var realDayNum = getRealDayOfWeekNum(jsDayNum);
  
  return 7 - realDayNum;
}

/********************************/

function createArr(from,to) {
  var arr = [];
  
  for (var i = from; i <= to; i++) {
    arr.push(i);
  }
  
  return arr;
}

function unshiftElems(num, elem, arr) {
  for(var i = 0; i < num; i++) {
    arr.unshift(elem);
  }
  
  return arr;
}

function pushElems(num, elem, arr) {
  for(var i = 0; i < num; i++){
    arr.push(elem);
  }
  
  return arr;
}

function chunkArr(num, arr) {
  var result = [];
  var chunk = [];
  var iterCount = arr.length / num;
  
  for (var i = 0; i < iterCount; i++) {
    chunk = arr.splice(0, num);
    result.push(chunk);
  }
  
  return result;
}

/*****************************/

function drawDates(year, month, dates) { //отрисовываем даты внутри функции initCalendar()
  var arr = [];
  var firstDateOfMonth = 1;
  var LastDateOfMonth = getLastDayOfMonth(year, month);
  
  var unshiftElemsNum =  getUnshiftElemsNum(year, month);
  var pushElemsNum = getPushElemsNum(year, month);
  
  arr = createArr(firstDateOfMonth, LastDateOfMonth);
  arr = unshiftElems(unshiftElemsNum, '', arr);
  arr = pushElems(pushElemsNum, '', arr);
  arr = chunkArr(7, arr);
  
  function createTable(arr, parent) {
    parent.innerHTML = '';
    
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
  
  createTable(arr, dates);
}

function initCalendar(year, month, calendar){ //эта функция будет отвечать за начальную  инициализацию календаря,и когда будем жать на стрелки
  var dates = calendar.getElementsByClassName('dates')[0]; //по нажатию на стрелку будет получится дом элемент
  var info = calendar.getElementsByClassName('info')[0];
  
  function showInfo(year, month, elem) { //отрисовываем год над календаре
    var monthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    
    elem.innerHTML = monthes[month] + ' ' + year;
  }
  
  drawDates(year, month, dates);
  showInfo(year, month, info);//отрисовываем год над календарем
}

initCalendar(showedYear, showedMonth, calendar);//функция которую вызываем напрямую в нее будем передовать год,месяц и дом элемент
