var model = {
  paymentMethod: { val: "" },

  paymentMethodOptions: [
    { label: 'Нал', value: 'cash' },
    { label: 'Безнал', value: 'cashless' }
  ],

  paymentType: { val: "" },
  
  paymentTypeOptions: [
    { label: 'Приход', value: 'income' },
    { label: 'Расход', value: 'outcome' }
  ],

  place: { val: "" },
  
  placeOptions: [
    { label: 'ВДНХ', value: 'vdnh' },
    { label: 'ВП', value: 'vp' }
  ]
}