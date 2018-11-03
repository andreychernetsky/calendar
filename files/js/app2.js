const doc = document;
const calendar = doc.getElementById('calendar');
const prev = calendar.getElementsByClassName('prev')[0];
const next = calendar.getElementsByClassName('next')[0];

const date = new Date();
let showedYear = date.getFullYear();
let showedMonth = date.getMonth();


const nextPrevData = {
  getPrevYear: (year, month) => (month === 0) ? year - 1 : year,
  getPrevMonth: (month) => (month === 0) ? 11 : month - 1,
  getNextYear: (year, month) => (month === 11) ? year + 1 : year,
  getNextMonth: (month) => (month === 11) ? 0 : month + 1
};

prev.addEventListener('click', function(event) {
  event.preventDefault();
  
  showedYear = nextPrevData.getPrevYear(showedYear, showedMonth); //получаем предыдущий год
  showedMonth = nextPrevData.getPrevMonth(showedMonth); // получаем предыдущий месяц
  
  initCalendar(showedYear, showedMonth, calendar);
});

next.addEventListener('click', function(event) {
  event.preventDefault();
  
  showedYear = nextPrevData.getNextYear(showedYear, showedMonth); //получаем предыдущий год
  showedMonth = nextPrevData.getNextMonth(showedMonth); // получаем предыдущий месяц
  
  initCalendar(showedYear, showedMonth, calendar);
});

/**************************************************/

const monthOrWeak = {
  getRealDayOfWeekNum: (jsNumOfDay) => (jsNumOfDay === 0) ? 7 : jsNumOfDay, // если ноль,то возврашщаем воскресенье
  getFirstWeekDayOfMonthNum: (year, month) => new Date(year, month, 1).getDay(), //получает первый день недели  месяца
  getLastWeekDayOfMonthNum: (year, month) => new Date(year, month + 1, 0).getDay(),
  getLastDayOfMonth: (year, month) => new Date(year, month + 1, 0).getDate(), // getDate() -это день недели
  getUnshiftElemsNum: (year, month) => {
    const jsDayNum = monthOrWeak.getFirstWeekDayOfMonthNum(year, month);
    return monthOrWeak.getRealDayOfWeekNum(jsDayNum) - 1;
  },
  getPushElemsNum: (year, month) => {
    const jsDayNum = monthOrWeak.getLastWeekDayOfMonthNum(year, month);
    return 7 - monthOrWeak.getRealDayOfWeekNum(jsDayNum);
  }
};

/**************************************************/

const changeArr = {
  createArr: (from, to) => {
    const arr = [];
    
    for (let i = from; i <= to; i++) {
      arr.push(i);
    }
    
    return arr;
  },
  unshiftElems: (num, elem, arr) => {
    for (let i = 0; i < num; i++) {
      arr.unshift(elem);
    }
    
    return arr;
  },
  pushElems: (num, elem, arr) => {
    for (let i = 0; i < num; i++) {
      arr.push(elem);
    }
    
    return arr;
  },
  chunkArr: (num, arr) => {
    const result = [];
    let chunk = [];
    const iterCount = arr.length / num;
    
    for (let i = 0; i < iterCount; i++) {
      chunk = arr.splice(0, num);
      result.push(chunk);
    }
    
    return result;
  }
};

/**************************************************/

function drawDates(year, month, dates) { //отрисовываем даты внутри функции initCalendar()
  let arr = [];
  const firstDateOfMonth = 1;
  const LastDateOfMonth = monthOrWeak.getLastDayOfMonth(year, month);
  
  const unshiftElemsNum =  monthOrWeak.getUnshiftElemsNum(year, month);
  const pushElemsNum = monthOrWeak.getPushElemsNum(year, month);
  
  arr = changeArr.createArr(firstDateOfMonth, LastDateOfMonth);
  arr = changeArr.unshiftElems(unshiftElemsNum, '', arr);
  arr = changeArr.pushElems(pushElemsNum, '', arr);
  arr = changeArr.chunkArr(7, arr);
  
  const currentDate = { //получаем текущую дату
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
  };
  const checkDate = (day) => (year === currentDate.year && month === currentDate.month && day === currentDate.day); //проверка соответстует ли выводимая дата при отрисове,- текущей
  
  const createTable = (arr, parent) => {
    parent.innerHTML = '';
    
    for(let i = 0; i < arr.length; i++){
      const tr = doc.createElement('tr');
      
      for(let j = 0; j < arr[i].length; j++){
        const td = doc.createElement('td');
        const day = arr[i][j];
  
        if (checkDate(day)) { //если дата при отрисовке совпала с текущей
          td.className = 'currentDate'; //присвоить этой ячейке класс
        }
        td.innerHTML = day;
        tr.appendChild(td);
      }
      
      parent.appendChild(tr);
    }
  };
  
  createTable(arr, dates);
}

function initCalendar(year, month, calendar){ //эта функция будет отвечать за начальную  инициализацию календаря,и когда будем жать на стрелки
  const dates = calendar.getElementsByClassName('dates')[0]; //по нажатию на стрелку будет получится дом элемент
  const info = calendar.getElementsByClassName('info')[0];
  
  const showInfo = (year, month, elem) => { //отрисовываем год над календаре
    const monthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    
    elem.innerHTML = monthes[month] + ' ' + year;
  };
  
  drawDates(year, month, dates);
  showInfo(year, month, info); //отрисовываем год над календарем
}

initCalendar(showedYear, showedMonth, calendar); //функция которую вызываем напрямую в нее будем передовать год,месяц и дом элемент
