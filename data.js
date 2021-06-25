var model = {
  paymentMethod: { 'val': "" },

  paymentMethodOptions: [
    { label: 'Нал', value: 'cash' },
    { label: 'Безнал', value: 'cashless' }
  ],

  paymentType: { 'val': "" },
  
  paymentTypeOptions: [
    { label: 'Приход', value: 'income' },
    { label: 'Расход', value: 'outcome' }
  ],

  place: { 'val': "" },
  
  placeOptions: [
    { label: 'ВДНХ', value: 'vdnh' },
    { label: 'ВП', value: 'vp' }
  ],

  address: {'val': ''},
  
  addressOptions:[
    "г.Москва, Волоколамское ш., д.71, корп.1, кв.548",
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

  comment: {'val':''},

  sum: {'val':0}

}