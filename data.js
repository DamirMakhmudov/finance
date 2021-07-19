var model = {
  paymentType: {"val":""},
  
  paymentTypeOptions: [
    { label: 'Приход', value: 'Приход' },
    { label: 'Расход', value: 'Расход' }
  ],

  paymentMethod: {"val":""},

  paymentMethodOptions: [
    { label: 'Нал', value: 'Нал' },
    { label: 'Безнал', value: 'Безнал' }
  ],

  office: {"val":""},
  
  officeOptions: [
    { label: 'ВДНХ', value: 'ВДНХ' },
    { label: 'ВП', value: 'ВП' }
  ],

  address: {"val": "г. Москва, ул. Олонецкая, д. 4, кв. 835"},
  
  addressOptions:[
    "г. Москва, ул. Олонецкая, д. 4, кв. 835",
    "г.Москва, ул.Старокачаловская, д.1, к.1, кв.100",
    "г.Москва, ул.Вешняковская, д.10, кв.39",
    "г.Москва, Шарикоподшипниковская ул., д.13, стр.24",
    "г.Москва, ул.Арбат, д.10, кв.39",
    "г.Москва, ул.Абельмановская, д.11, кв.99",
    "г.Москва, ул.Донская, д. 25, стр. 1, кв. 34",
    "г.Москва, ул.Амурская, вл.3",
    "г.Москва, ул.Академика Янгеля, д.1, корп.1, кв.145",
    "г.Москва, ул.Мантулинская, д.9, корп.6, кв. 59",
    "г.Москва, ул.Библиотечная, д.27, кв. 110"
  ],

  comment: {"val":""},

  sum: {"val":0},

  consumption: {"val":""},

  consumptionOptions: [
    {'label':'Бонусы менеджеры','needaddress':false},
    {'label':'Отзывы','needaddress':true},
    {'label':'ЗП','needaddress':false},
    {'label':'Налоги','needaddress':false},
    {'label':'Контекстная реклама','needaddress':false},
    {'label':'Нужды офиса','needaddress':false},
    {'label':'Дима','needaddress':false},
    {'label':'Подрядчики для работы организации','needaddress':false},
    {'label':'Другая реклама','needaddress':false},
    {'label':'Аренда офиса','needaddress':false},
    {'label':'Курьеры','needaddress':true},
    {'label':'Для работы согласователей','needaddress':true},
    {'label':'Телефония','needaddress':false},
    {'label':'Оплата посреднику','needaddress':true},
    {'label':'Рабочие расходы по объекту','needaddress':true}
  ]
}

// test();
function test(){
  // let model2 = Object.assign({}, model);
  let model2 = JSON.parse(JSON.stringify(model));
  model.comment.val = '123';
  console.log(model2.comment.val);
}