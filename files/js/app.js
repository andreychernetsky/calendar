var date = new Date();
var showedYear = date.getFullYear();
var showedMonth = date.getMonth();

var calendar = document.querySelector('#calendar');
initCalendar(showedYear, showedMonth, calendar);//функция которую вызываем напрямую в нее будем передовать год,месяц и дом элемент








function initCalendar(year, month, calendar){ //эта функция будет отвечать за начальную  инициализацию календаря,и когда будем жать на стрелки
  var dates = calendar.querySelector('.dates'); //по нажатию на стрелку будет получится дом элемент
  // var info = calendar.querySelector('.info');
  
  drawDates(year, month, dates);
  // showInfo(year, month, info);//отрисовываем год над календарем
}

// function showInfo(year, month, elem) { //отрисовываем год над календаре
//   elem.innerHTML = getMonthName(month) + ' ' + year;
// }

// function getMonthName(num) {
//   var monthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
//   return monthes[num];
// }

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
  
  createTable(arr, dates);
}



function createTable(arr, parent){
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

function createArr(from,to) {
  var arr = [];
  
  for (var i = from; i <= to; i++) {
    arr.push(i);
  }
  
  return arr;
}

function unshiftElems(num, elem, arr) {
  for(var i = 0; i < num; i++){
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

// второй способ
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

function getRealDayOfWeekNum(jsNumOfDay){
  // если ноль,то возврашщаем воскресенье
  if (jsNumOfDay === 0){
    return 7;
  } else {
    return jsNumOfDay;
  }
}

function getFirstWeekDayOfMonthNum(year, month) { //получает первый день недели  месяца
  var date = new Date(year, month, 1);
  return date.getDay();
}


function getLastWeekDayOfMonthNum(year, month) {
  var date = new Date(year, month + 1, 0);
  return date.getDay();
}
