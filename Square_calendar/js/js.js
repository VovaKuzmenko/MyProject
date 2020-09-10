/* Переменные */
let year = prompt( "Please, enter a year", "");
let month = prompt( "Please, enter the month as a number", "");

month--;

let date = new Date (year, month);
let showedYear = date.getFullYear();   // получаем отображаемый год
let showedMonth = date.getMonth();     // получаем отоброжаемый месяц

/* Получаем элементы разметки*/
let calendar = document.querySelector('#calendar');
let dates = calendar.querySelector('.dates'); 
let info = calendar.querySelector('.info');
let prev = calendar.querySelector('.prev');
let next = calendar.querySelector('.next');

initCalendar(date.getFullYear(), date.getMonth(), calendar);

/**
 * Глобальная функция вызывающая все остальные
 * @docs multiplyMaker - Global function calling all the others  
 * @param {*} year 
 * @param {*} month 
 * @param {*} calendar 
*/
function initCalendar(year, month, calendar) {   
   
   drawDates(year, month, dates);
   showInfo(year, month, info);
   showCurrentDate(dates);
}

//---------------------------------------------------------------
/** 
 * Изменения по клику
 * @docs multiplyMaker - Click Change
 */
prev.addEventListener('click', function() {   
   showedYear = getPrevYear(showedYear, showedMonth);
   showedMonth = getPrevMonth(showedMonth);
   initCalendar(showedYear, showedMonth, calendar);
   });
   
 /**
 * Показать предыдущий год
 * @docs multiplyMaker -Show previous year
 * @param {*} month 
 */  
function getPrevYear(year, month) {
   if (month == 0) {

      return year - 1;

   } else {

      return year

   }
}

/**
 * Показать предыдущий месяц
 * @docs multiplyMaker - Show previous month
 * @param {*} month 
 */
function getPrevMonth(month) {
   if (month == 0) {

      return 11;

   } else {

      return month - 1;

   }
}
//---------------------------------------------------------

/**
 * Изменение по клику
 * @docs multiplyMaker - Click Change
 */
next.addEventListener('click', function() {   
   showedYear = getNextYear(showedYear, showedMonth);
   showedMonth = getNextMonth(showedMonth);
   initCalendar(showedYear, showedMonth, calendar);
   });

 /**
 * Показать следующий год
 * @docs multiplyMaker -Show next year
 * @param {*} month 
 */  
function getNextYear(year, month) {
   if (month == 11) {

      return year + 1;

   } else {

      return year

   }
}

/**
 * Показать следующий месяц
 * @docs multiplyMaker -Show next month
 * @param {*} month 
 */
function getNextMonth(month) {
   if (month == 11) {

      return 0;

   } else {

      return month + 1;

   }
}

//--------------------------------------------------
/**
 * Получение элементов
 * @docs multiplyMaker - Getting items
 */
   CurrentYear = showedYear;
   CurrentMonth = showedMonth;
   CurrentDate = date.getDate();

/**
 *  Отображаемое значение даты
 * @docs multiplyMaker - Date show
 * @param {*} date 
 */
   function showCurrentDate(date) {
      CurrentDate = getCurrentDate();
   }
   
   /**
    * Получаем текущую дату
    * @docs multiplyMaker - Get the current date
    * @param {*} dates 
    */
   function getCurrentDate(dates) {

      return date.getDate();

   }

   /**
    * Выводит текст текущего года и месяца
    * @docs multiplyMaker - Text of the current year and month
    * @param {*} year 
    * @param {*} month 
    * @param {*} elem 
    */  
   function showInfo(year, month, elem) {
      elem.innerHTML = getMonthName(month) + ' ' + year;
   }
  
   //---------------------------------------------------
   /**
    * Выводит по числу название месяца
    * @docs multiplyMaker - Month name by number
    * @param {*} num 
    */
   function getMonthName(num) {

      let monthes = ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь',
       'Июль', 'Авг', 'Сен', 'Окт','Нояб','Дек',];

      return monthes[num];
   }
   //-----------------------------------------------------
/**
* Отрисовывание нашего календаря (месяца)
* @docs multiplyMaker - Rendering our calendar(Month)
*/
function drawDates(year, month, dates) {
   
   let arr = [];                                              
   
   let firstDateOfMonth = 1;
   let lastDayOfMonth = getLastDayOfMonthNum(year, month); 
   let NumOfDay  = getFirstWeekDayOfMonthNum(year, month);
   let realDayNum = getLastWeekDayOfMonthNum(year, month);
   let unshiftElemsNum = getRealDayOfWeekNum(NumOfDay);  
   let pushElemsNum = getPushElemsNum(realDayNum);
   
   arr = createArr(firstDateOfMonth, lastDayOfMonth); // получаем массив с числами месяца
   arr = unshiftElems(unshiftElemsNum, '', arr);      // добавляем пустые дни в начало
   arr = pushElems(pushElemsNum, '', arr);            // добавляем пустые дни в конец   
   arr = chunkArr(7, arr);                            // делаем 2-х мерный массив под календарь
   
   createTable(arr, dates);                           // отрисовывает массив
};

/**
 * Принимает числа и возвр массив с этими числами
 * @docs multiplyMaker - Returns an array with these numbers
 * @param {*} from 
 * @param {*} to 
 */
function createArr (from, to) {
   let arr = [];
   for (let i = from; i <= to; i++) {
      arr.push(i);
   }

   return arr;

}
 
/**
 * Добавляются пустые эл-ты в начало
 * @docs multiplyMaker - Empty elements are added to the beginning
 * @param {*} num 
 * @param {*} elems 
 * @param {*} arr 
 */
function unshiftElems(num, elems, arr) {
   for (let i = 0; i < num; i++) {
      arr.unshift(elems)
   }

   return arr;

}

/**
 * Добавляются пустые эл-ты в конец
 * @docs multiplyMaker - Empty elements are added to the end
 * @param {*} num 
 * @param {*} elems 
 * @param {*} arr 
 */
function pushElems(num, elem, arr) {
   for (let i = 0; i < num; i++) {
      arr.push(elem);
   } 

   return arr;

}

/**
 * Определяет кол-во пустых дней вконце,
 * @docs multiplyMaker - Number of empty days at the end
 * @param {*} realDayNum 
 */
function getPushElemsNum(realDayNum) {
   if (realDayNum == 0) {

      return realDayNum;

   } else {

      return (7 - realDayNum)

   }
}

/**
 * Разбиваем на 2-х мерный массив в зависимости от переданного числа
 * @docs multiplyMaker - We break into a 2-dimensional array, depending on the transmitted number
 * @param {*} num 
 * @param {*} arr 
 */
function chunkArr(num, arr) {
   let result = [];
   let chunk = [];
   let iterCount = arr.length / num;

  for (let i = 0; i < iterCount; i++) {
     chunk = arr.splice(0, num);
     result.push(chunk);
   }

   return result;
}

/**
 * Возвращает пустые дни перед началом отсчета месяца
 * @docs multiplyMaker - Returns empty days before the start of the month
 * @param {*} NumOfDay 
 */
function getRealDayOfWeekNum(NumOfDay) {
   let  n;
   if (NumOfDay == 0) {
    let  n = 6

      return n;
      
   }   else {
      
       n = NumOfDay - 1;      
      }
      
      return n
}

/**
 * Возвращает номер первого дня месяца
 * @docs multiplyMaker - Returns the number of the first day of the month
 * @param {*} year 
 * @param {*} month 
 */
function getFirstWeekDayOfMonthNum(year, month) {
   let date = new Date (year, month, 1);

   return date.getDay();
}

/**
 * Возвращает номер последнего дня месяца
 * @docs multiplyMaker - Returns the number of the last day of the month
 * @param {*} year 
 * @param {*} month 
 */
function getLastWeekDayOfMonthNum(year, month) {
   let date = new Date (year, month + 1 , 0);

   return date.getDay();
};

/**
 * Возвращает кол-во дней в месяце
 * @docs multiplyMaker - Returns the number of days in a month
 * @param {*} year 
 * @param {*} month 
 */
function getLastDayOfMonthNum(year, month) {

   return new Date(year, month + 1, 0).getDate();   
}

/**
 * Отрисовывание таблицы
 * @docs multiplyMaker - Table rendering
 * @param {*} arr 
 * @param {*} parent 
 */
function createTable(arr, parent) {

   parent.innerHTML = '';

   for ( let i = 0; i < arr.length; i++) {
      let tr = document.createElement ('tr');
      
      for (let j =0; j < arr[i].length; j++) {
         let td = document.createElement ('td');
         td.innerHTML = arr[i][j];
         tr.appendChild(td);
      }   
      parent.appendChild(tr);
   }
};