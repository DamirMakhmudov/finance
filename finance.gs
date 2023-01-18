function runPanelFinance() {
  let
    sp = SpreadsheetApp.getActiveSpreadsheet(),
    html = HtmlService.createTemplateFromFile('finance/index').evaluate().setTitle('Касса'),
    sheet = sp.getSheetByName('Касса');
  if (!sheet) {
    Browser.msgBox('Я не нашел лист "Касса"');
    return;
  }
  SpreadsheetApp.getUi().showSidebar(html);
}

function getModelFinance(userEmail) {
  limb.toast('Определяю пользователя...', '🔔');
  let
    dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('data'),
    users = pereplanlibrary.getData('users', dataSheet),
    user = users.names[users.emails.indexOf(userEmail)];

  if (!user) {
    Browser.msgBox('Тебя нет в "Справочнике", обратись к администратору');
    return;
  }

  limb.toast('Формирую список адресов', '🔔');
  let
    sp = SpreadsheetApp.getActiveSpreadsheet(),
    sheet = sp.getSheetByName('Менеджер'),
    addressVals = sheet.getRange(2, sheet.getRange('1:1').getValues()[0].indexOf('Адрес объекта') + 1, sheet.getLastRow(), 1).getValues().map(item => ({ "label": item[0], "sheet": "Менеджер" }));

  var model = {
    user: { "val": user },
    userOptions : users.names,

    paymentType: { "val": "" },

    paymentTypeOptions: [
      { label: 'Приход', value: 'Приход' },
      { label: 'Расход', value: 'Расход' }
    ],

    paymentMethod: { "val": "" },

    paymentMethodOptions: [
      { label: 'Нал', value: 'Нал' },
      { label: 'ООО', value: 'ООО' },
      { label: 'Карта', value: 'Карта' },
      { label: 'ИП', value: 'ИП' },
      { label: 'Карта Тинькофф', value: 'Карта Тинькофф' }
    ],

    office: { "val": "" },

    officeOptions: [
      { label: 'ВДНХ', value: 'ВДНХ' },
      { label: 'ВП', value: 'ВП' }
    ],

    address: { "val": "" },

    addressOptions: addressVals,

    addressOptionsArchive: [],

    comment: { "val": "" },

    sum: { "val": "" },

    consumption: { "val": "" },

    managerApp: { "val": "" },

    consumptionOptions: [
      { 'label': 'Автоматизация', 'needaddress': false },
      { 'label': 'Аналитика', 'needaddress': false },
      { 'label': 'Аренда офиса', 'needaddress': false },
      { 'label': 'Бонусы менеджеры', 'needaddress': false },
      { 'label': 'Дима', 'needaddress': false },
      { 'label': 'Для работы согласователей', 'needaddress': true },
      { 'label': 'Другая реклама', 'needaddress': false },
      { 'label': 'ЗП', 'needaddress': false },
      { 'label': 'Контекстная реклама', 'needaddress': false },
      { 'label': 'Курьеры', 'needaddress': true },
      { 'label': 'Налоги', 'needaddress': false },
      { 'label': 'Нужды офиса', 'needaddress': false },
      { 'label': 'Оплата посреднику', 'needaddress': true },
      { 'label': 'Отзывы', 'needaddress': true },
      { 'label': 'Подрядчики для работы организации', 'needaddress': false },
      { 'label': 'Работы по сайту', 'needaddress': false },
      { 'label': 'Рабочие расходы по объекту', 'needaddress': true },
      { 'label': 'СЕО продвижение', 'needaddress': false },
      { 'label': 'СПБ', 'needaddress': false },
      { 'label': 'Телефония', 'needaddress': false },
      { 'label': 'Удаленщики', 'needaddress': false }
    ],

    sheet: { "val": "Менеджер" },
    sheets: ['Менеджер', 'Менеджер.Архив']
  }
  return JSON.stringify(model);
}

function saveDataGSFinance(data) {
  let
    model = JSON.parse(data),
    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Касса'),
    header = sheet.getRange('2:2').getValues()[0],
    values = [];

  model.date = { "val": (new Date()).toLocaleDateString() };
  header.forEach(title => {
    if (model.hasOwnProperty(title)) {
      values.push(model[title].val)
    }
  });
  values[header.indexOf('Адрес')] = model.address.val.label;

  // if(model.paymentType.val == 'income'){
  //   values.push(model.sum);
  //   values.push(0);
  // }else{
  //   values.push(0);
  //   values.push(model.sum.val);
  // };
  // values.push(model.comment.val);
  // values.push((new Date()).toLocaleDateString());
  // values.push(model.place.val);
  // values.push(model.paymentMethod.val);
  values.push(Session.getActiveUser().getEmail())
  sheet.appendRow(values);
}