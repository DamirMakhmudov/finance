var model = {
  user: { "val": "samrukov@gmail.com" },
  userOptions: [
    'Марина Дубицкая',
    'Марина Бареева',
    'Анастасия Устинова',
    'Анастасия Лупащенко',
    'Юлия Емельянова',
    'Елена Сумская',
    'Максим Джураев',
    'Евгения Светлекова',
    'Камилла Сохова',
    'Екатерина Семёнова',
    'Юлия Корнилаева',
    'Алиса Шарандак',
    'Юлия Бекренёва',
    'Ирина Журавлева',
    'Александра Осипова',
    'yand',
    'Сотрудник не работает'],
  paymentType: { "val": "" },
  paymentTypeOptions: [
    { label: 'Приход', value: 'Приход' },
    { label: 'Расход', value: 'Расход' },
    { label: 'Перенос', value: 'Перенос' },
    { label: 'Бонус', value: 'Бонус' }
  ],
  paymentMethod: { "val": "" },
  paymentMethodTo: { "val": "" },
  paymentMethodOptions:
    [
      'ООО',
      'Нал',
      'ИП',
      'Карта СБ',
      'Карта Тинькофф',
      'Робокасса'
    ],
  address: { "val": "" },
  addressOptions: [
    'г.Москва, ул.11-я Текстильщиков, д.12, кв.142',
    'Тест',
    'г.Москва, ул.Раевского, д.3, кв.199',
    'г.Москва, ул.Маломосковская, д.14, кв.38',
    'г.Москва, ул.Усачева, д.15А, кв.8Б',
    'г.Москва, Береговой пр-д, д.1А, кв.144',
    'г.Москва, ул.Удальцова, д.3, корп.13, кв.129',
    'г.Санкт-Петербург, Парадная ул., д.3, корп.2, литера А, кв.732',
    'ЛО, г.Кудрово, ул.Областная, д.1, кв.2039',
    'г.Санкт-Петербург, ул. Вёсельная, д.7/10, литера. А, кв.19',
    'г.Санкт-Петербург, ул.Верности, д.44, корп.3, кв.4',
    'г.Санкт-Петербург, пр-кт Энгельса, д.32, лит.Б, кв.4',
    'г.Всеволожск, ш.Колтушское, д.124, корп.2, кв.25',
    'г.Санкт-Петербург, пр.Тореза, д.35, к.2, кв.19',
    'г.Санкт-Петербург, пр.Художников, лит.А, д.15, корп.1, кв.130',
    'г.Санкт-Петербург, ул. Ключевая, д.27, лит.А, кв.31',
    'г.Санкт-Петербург, ул.Жукова, д.1, стр.1, кв. 284',
    'г.Санкт-Петербург, 5-ый Предпортовый пр-д, д.2, стр.1, кв.262',
    'г.Санкт-Петербург, ул.Плесецкая, д.21, стр.1, кв.246',
    'г.Санкт-Петербург, Московский пр., д.66, кв.48',
    'г.Санкт-Петербург, ул.Ярослава Гашека, д.8, корп.1, лит.А, кв.175',
    'г.Санкт-Петербург, ул.Марата, д.76, кв.29',
    'г.Санкт-Петербург, ул.Александра Матросова, д.1, стр.1, кв. 20',
    'г.Санкт-Петербург, пер.Ипподромный, д.3, корп.1, стр.1, кв.45',
    'г.Санкт-Петербург, пр. Ярославский, д.62, лит.А, кв.3',
    'г.Санкт-Петербург, Усть-Славянка, Советский пр-кт, д.18, стр.1, кв. 68'
  ]
  ,
  addressOptionsArchive: [],
  comment: { "val": "" },
  sum: { "val": "" },
  consumption: { "val": "" },
  managerApp: { "val": "" },
  consumptionOptions: [
    { 'label': 'Google Аккаунты', 'needaddress': false },
    { 'label': 'Битрикс Подписки', 'needaddress': false },
    { 'label': 'Телефония', 'needaddress': false },
    { 'label': 'Хостинг', 'needaddress': false },
    { 'label': 'Wazzup', 'needaddress': false },
    { 'label': 'Битрикс разработка', 'needaddress': false },
    { 'label': 'Веб разработка', 'needaddress': false },
    { 'label': 'Налоги на ФОТ', 'needaddress': false },
    { 'label': 'Страховые взносы ИП', 'needaddress': false },
    { 'label': 'Казначейство', 'needaddress': false },
    { 'label': 'Сквозная аналитика', 'needaddress': false },
    { 'label': 'СЕО продвижение', 'needaddress': false },
    { 'label': 'Пополнение рекламных кошельков', 'needaddress': false },
    { 'label': 'Другая реклама', 'needaddress': false },
    { 'label': 'Подбор персонала', 'needaddress': false },
    { 'label': 'Лицензия СРО', 'needaddress': false },
    { 'label': 'Праздники и корпоративы', 'needaddress': false },
    { 'label': 'Компенсация транспорта', 'needaddress': false },
    { 'label': 'Аренда офиса', 'needaddress': false },
    { 'label': 'Нужды офиса', 'needaddress': false },
    { 'label': 'Командировочные', 'needaddress': false },
    { 'label': 'ЗП Общий расход', 'needaddress': false },
    { 'label': 'ЗП МОП', 'needaddress': false },
    { 'label': 'ЗП ПМ', 'needaddress': false },
    { 'label': 'ЗП ИНЖ', 'needaddress': false },
    { 'label': 'ЗП СОГ', 'needaddress': false },
    { 'label': 'ЗП Приемщики', 'needaddress': false },
    { 'label': 'ЗП Административный', 'needaddress': false },
    { 'label': 'Подрядчики административные', 'needaddress': false },
    { 'label': 'Подрядчики комерческие', 'needaddress': true },
    { 'label': 'Подрядчики делопроизводства', 'needaddress': true },
    { 'label': 'Бонусы менеджеры', 'needaddress': false },
    { 'label': 'Бонусы ПМ', 'needaddress': false },
    { 'label': 'Дивиденды', 'needaddress': false },
    { 'label': 'Другие расходы Димы', 'needaddress': false },
    { 'label': 'Обучающие курсы', 'needaddress': false },
    { 'label': 'Комиссия за платежи', 'needaddress': false },
    { 'label': 'Покупка оборудования до 20к', 'needaddress': false },
    { 'label': 'Покупка оборудования дороже 20к', 'needaddress': false },
    { 'label': 'Ремонт оборудования', 'needaddress': false },
    { 'label': 'Для работы согласователей запланированный', 'needaddress': true },
    { 'label': 'Для работы согласователей внеплановый', 'needaddress': true },
    { 'label': 'Оплата телеграммы', 'needaddress': false },
    { 'label': 'Оплата посреднику', 'needaddress': true },
    { 'label': 'Бонус за отзыв', 'needaddress': false },
    { 'label': 'Получение документов по объекту', 'needaddress': true },
    { 'label': 'Выезд инженера', 'needaddress': true },
    { 'label': 'Обеспечение контракта', 'needaddress': true },
    { 'label': 'Реферальная программа', 'needaddress': true },
    { 'label': 'Возврат', 'needaddress': true }
  ],
  city: { "val": "" },
  cityOptions: [
    "МСК",
    "ПСБ",
    "Общий"
  ],
  sheet: { "val": "Master" },
  // sheets: ['Менеджер']
}