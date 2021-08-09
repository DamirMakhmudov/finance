var model = {
  paymentType: {"val":""},
  
  paymentTypeOptions: [
    { label: 'Приход', value: 'Приход' },
    { label: 'Расход', value: 'Расход' }
  ],

  paymentMethod: {"val":""},

  paymentMethodOptions: [
    { label: 'Нал', value: 'Нал' },
    { label: 'Безнал', value: 'Безнал' },
    { label: 'Карта', value: 'Карта' }
  ],

  office: {"val":""},
  
  officeOptions: [
    { label: 'ВДНХ', value: 'ВДНХ' },
    { label: 'ВП', value: 'ВП' }
  ],

  address: {"val": ''},
  
  addressOptions:[
    {"label": "г.Москва, ул. Олонецкая, д. 4, кв. 835","sheet":"Менеджер"},
    {"label": "г.Москва, ул.Старокачаловская, д.1, к.1, кв.100","sheet":"Менеджер"},
    {"label": "г.Москва, ул.Вешняковская, д.10, кв.39","sheet":"Менеджер"},
    {"label": "г.Москва, ул.Абельмановская, д.11, кв.99","sheet":"Менеджер"},
    {"label": "г.Москва, ул.Донская, д. 25, стр. 1, кв. 34","sheet":"Менеджер"},
    {"label": "г.Москва, ул.Амурская, вл.3","sheet":"Менеджер"},
    {"label": "г.Москва, ул.Мантулинская, д.9, корп.6, кв. 59","sheet":"Менеджер"}
  ],

  addressOptionsArchive:[],

  // addressOptionsArchive:[
  //   {"label": "г.Москва, Шарикоподшипниковская ул., д.13, стр.24","sheet":"Менеджер.Архив"},
  //   {"label": "г.Москва, ул.Арбат, д.10, кв.39","sheet":"Менеджер.Архив"},
  //   {"label": "г.Москва, ул.Академика Янгеля, д.1, корп.1, кв.145","sheet":"Менеджер.Архив"},
  //   {"label": "г.Москва, ул.Библиотечная, д.27, кв. 110","sheet":"Менеджер.Архив"}
  // ],

  comment: {"val":""},

  sum: {"val":''},

  consumption: {"val":""},

  consumptionOptions: [
    {'label':'Автоматизация','needaddress':false},
    {'label':'Аналитика','needaddress':false},
    {'label':'Аренда офиса','needaddress':false},
    {'label':'Бонусы менеджеры','needaddress':false},
    {'label':'Дима','needaddress':false},
    {'label':'Для работы согласователей','needaddress':true},
    {'label':'Другая реклама','needaddress':false},
    {'label':'ЗП','needaddress':false},
    {'label':'Контекстная реклама','needaddress':false},
    {'label':'Курьеры','needaddress':true},
    {'label':'Налоги','needaddress':false},
    {'label':'Нужды офиса','needaddress':false},
    {'label':'Оплата посреднику','needaddress':true},
    {'label':'Отзывы','needaddress':true},
    {'label':'Подрядчики для работы организации','needaddress':false},
    {'label':'Работы по сайту','needaddress':false},
    {'label':'Рабочие расходы по объекту','needaddress':true},
    {'label':'СЕО продвижение','needaddress':false},
    {'label':'Телефония','needaddress':false}
  ],

  sheets: ['Менеджер', 'Менеджер.Архив'],

  sheet: {"val": ""}
}

// test();
function test(){
  // let model2 = Object.assign({}, model);
  // let model2 = JSON.parse(JSON.stringify(model));
  // model.comment.val = '123';
  // console.log(model2.comment.val);
  let r = '12 345';
  let p = +r.replace(/ /g, '')
  console.log(p);
}