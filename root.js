const { createApp, ref, reactive, computed, watch, onMounted, watchEffect, onBeforeUnmount } = Vue;
const { useQuasar, Loading, QSpinnerGears } = Quasar;

var vueObject = {
  name: "root",
  template:
  /*html*/
  `
  <div class="q-pa-md fit column justify-center">
    <!-- first buttons -->
    <div class="q-gutter-y-xs" style="height:120px">
      <q-btn-toggle
        spread
        v-model = "mega.paymentType.val"
        toggle-color = "positive"
        :options= "mega.paymentTypeOptions"
        v-on:click="showaddressFn();showconsumptionFn();"
      >
      </q-btn-toggle>

      <q-btn-toggle
        spread
        v-model = "mega.paymentMethod.val"
        toggle-color = "primary"
        :options= "mega.paymentMethodOptions"
        v-on:click="showofficeFn();"
      >
      </q-btn-toggle>

      <q-btn-toggle v-if="mega.showoffice"
        spread
        v-model = "mega.office.val"
        toggle-color = "accent"
        :options= "mega.officeOptions"
      >
      </q-btn-toggle>
    </div>

    <!-- fields-->
    <div class="q-gutter-y-xs">
      <q-input
        v-model="mega.comment.val"
        label="Комментарий"
        autogrow
      >
        <template v-slot:prepend>
          <q-icon name="chat" />
        </template>
      </q-input>

      <q-input
        v-model.number="mega.sum.val"
        label='Сумма'
        type="number"
      >
        <template v-slot:prepend>
          <q-icon :name="mega.paymenticon"/>
        </template>
      </q-input>

      <q-select
        v-model="mega.consumption.val"
        use-input
        input-debounce="0"
        label="Тип расхода"
        :options="mega.consumptionOptions"
        @filter="filterconsumptionFn"
        behavior="menu"
        v-if="mega.showconsumption"
      >
        <template v-slot:prepend>
          <q-icon name="list" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Не нашел такого, ты уверен(а)?
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        v-model="mega.address.val"
        use-input
        input-debounce="0"
        label="Адрес"
        :options="mega.addressOptions"
        @filter="filteraddressFn"
        behavior="menu"
        v-if="mega.showaddress"
      >
        <template v-slot:prepend>
          <q-icon name="location_on" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Не нашел такого, ты уверен(а)?
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      
      <q-btn color="primary" label="Добавить" class="fit" @click="saveData()" v-if="mega.showbutton"></q-btn>

    </div>
  </div>
  `
  ,
  setup() {
    var mega = reactive ({
      paymentMethod : model.paymentMethod,
      paymentMethodOptions: model.paymentMethodOptions,
      paymentTypeOptions: model.paymentTypeOptions,
      paymentType : model.paymentType,
      office: model.office,
      officeOptions: model.officeOptions,
      showoffice : false,

      address: model.address,
      addressOptions: model.addressOptions,
      showaddress : false,
      
      paymenticon : 'payments',
      consumption : model.consumption,
      consumptionOptions : model.consumptionOptions.map(item => item.label),
      showconsumption : false,
      
      sum: model.sum,
      comment: model.comment,
      showbutton: computed(() => {return (mega.paymentMethod.val && mega.paymentType.val) ? true : false})
    });

    function filteraddressFn(val, update) {
      if (val === '') {
        update(() => {
          mega.addressOptions = model.addressOptions;
        })
        return;
      }
      update(() => {
        const needle = val.toLowerCase()
        mega.addressOptions = model.addressOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }

    function filterconsumptionFn(val, update) {
      if (val === '') {
        update(() => {
          mega.consumptionOptions = model.consumptionOptions
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase()
        mega.consumptionOptions = model.consumptionOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }

    function showofficeFn() {
      mega.showoffice = mega.paymentMethod.val == 'Нал' ? true : false;
      mega.paymenticon = mega.paymentMethod.val == 'Нал' ? 'payments' : 'payment';
    }

    function showaddressFn() {
      mega.showaddress= mega.paymentType.val == 'Приход' ? true : false;
    }

    function showconsumptionFn() {
      mega.showconsumption = mega.paymentType.val == 'Расход' ? true : false;
    }

    async function saveData(){
      model.mode = 'finance';
      const url = 'https://script.google.com/macros/s/AKfycbzUgwNF8Tqs3tmw7sV3ZxWKBDN5bUJ2mfr7mUR5MLrWeCMIvo3GSS4ZfKUbYZN5eXRY/exec';
      const requestOptions = {
        method: "POST",
        // mode: 'no-cors',
        headers: {
          // "Content-Type": "application/json",
          // "Content-Type": "undefined",
          "Content-Type": "application/x-www-form-urlencoded"
          // "Content-Type": "text/plain",
          // 'contentType': "application/json; charset=UTF-8",
          // 'accept': 'application/json'
          // 'accept': 'text/plain'
        },
        body: JSON.stringify(model)
      };
      let response = await fetch(url, requestOptions);
      // let data = await response.json();
      
      Object.keys(mega).forEach(key =>{
        if(mega[key].hasOwnProperty('val')){
          mega[key].val = ""
        }
      });
      showofficeFn();

      // fetch(url)
      // .then(response => {
      //   return response.json()
      // })
      // .then(data =>{
      //   console.log(data.status)
      // });

      // fetch(url, requestOptions)
      //   .then(response => {
      //     return response.json()
      //   })
      //   .then(data =>{
      //     console.log(data)
      // });
    }

    watch(() => mega.consumption.val,(newVal, prevVal) => {
      mega.showaddress = newVal.needaddress
    })

    return {
      mega,
      showaddressFn,
      filteraddressFn,
      showofficeFn,
      showconsumptionFn,
      filterconsumptionFn,
      saveData
    }
  }
}

const app = Vue.createApp(vueObject)

app.use(Quasar, {
  config: {
    notify: { /* look at QuasarConfOptions from the API card */ },
    loading: { /* look at QuasarConfOptions from the API card */ }
  }
});

Quasar.lang.set(Quasar.lang.ru);

// watch(paymentMethod.value, (val) =>{
//   console.log(val)
//   val.val = 'vdnh' ? showoffice=true : showoffice=false 
// })
// var showoffice = ref(toggelPaymentMethod(paymentMethod))
// var showoffice = ref(computed(() => { return toggelPaymentMethod(paymentMethod) }));
// const showoffice = ref(computed(() => { return paymentMethod.value.val == 'cash' ? true : false }));