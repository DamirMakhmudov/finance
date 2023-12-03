const { createApp, ref, reactive, computed, watch, onMounted, watchEffect, onBeforeUnmount } = Vue;
const { useQuasar, Loading, QSpinnerGears } = Quasar;

var vueObject = {
  name: "root",
  template:
    /*html*/
    `
    {{mega.user}}

  <div class="q-pa-md fit column justify-center">

    <!-- first buttons -->
    <div class="q-gutter-y-xs" style="width:100%"> <!-- style="height:200px" -->
      <q-btn-toggle spread v-model="mega.paymentType.val" toggle-color="positive" :options="mega.paymentTypeOptions" v-on:click="showaddressFn();showconsumptionFn();showPaymentMethodToFn();showManagerFn()" wrap>
      </q-btn-toggle>

      <!-- paymentMethod -->
      <q-select behavior="menu" v-model="mega.paymentMethod.val" :options="mega.paymentMethodOptions" :label="showPaymentMethodTo ? 'Откуда' : 'Способ оплаты'" clearable></q-select>

      <!-- paymentMethodTo -->
      <q-select behavior="menu" v-model="mega.paymentMethodTo.val" :options="mega.paymentMethodOptions" label="Куда" clearable v-if="showPaymentMethodTo"></q-select>

      <!-- comment -->
      <q-input v-model="mega.comment.val" label="Комментарий" autogrow clearable>
        <template v-slot:prepend="">
          <q-icon name="chat">
        </q-icon></template>
      </q-input>

      <!-- sum -->
      <q-input v-model="mega.sum.val" label="Сумма" mask="# ### ### ###" reverse-fill-mask clearable>
        <template v-slot:prepend="">
          <q-icon :name="mega.paymenticon">
        </q-icon></template>
      </q-input>

      <!-- consumption -->
      <q-select v-model="mega.consumption.val" use-input input-debounce="0" label="Тип расхода" :options="mega.consumptionOptions" @filter="filterconsumptionFn" behavior="menu" v-if="mega.showconsumption">

        <template v-slot:prepend="">
          <q-icon name="list">
        </q-icon></template>
        <template v-slot:no-option="">
          <q-item>
            <q-item-section class="text-grey">
              Не нашел такого, ты уверен(а)?
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      
      <!-- sheets-->
      <!--
        <q-select
          v-model="mega.sheet.val"
          use-input
          input-debounce="0"
          label="Лист"
          :options="mega.sheets"
          behavior="menu"
          v-if="mega.showaddress"
        >
          <template v-slot:prepend>
            <q-icon name="dynamic_feed" />
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Не нашел такого, ты уверен(а)?
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      -->

      <!-- address-->
      <q-select v-model="mega.address.val" use-input input-debounce="0" label="Адрес" :options="mega.addressOptions" @filter="filteraddressFn" @filter-abort="abortFilterFn" behavior="menu" v-if="mega.showaddress">
        <template v-slot:prepend="">
          <q-icon name="location_on">
        </q-icon></template>
        <template v-slot:no-option="">
          <q-item>
            <q-item-section class="text-grey">
              Не нашел такого, ты уверен(а)?
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- city-->
      <q-select v-model="mega.city.val" use-input input-debounce="0" label="Город" :options="mega.cityOptions" @filter="filterCity" @filter-abort="abortFilterFn" behavior="menu" v-if="mega.showaddress">
        <template v-slot:prepend="">
          <q-icon name="location_city">
        </q-icon></template>
        <template v-slot:no-option="">
          <q-item>
            <q-item-section class="text-grey">
              Не нашел такого, ты уверен(а)?
            </q-item-section>
          </q-item>
        </template>
      </q-select>


       <!-- manager -->
       <q-select v-model="mega.manager.val" use-input input-debounce="0" label="Менеджер" :options="mega.userOptions" behavior="menu" @filter="filterusersFn" v-if="mega.showmanager">
       <template v-slot:prepend="">
         <q-icon name="list">
       </q-icon></template>
       <template v-slot:no-option="">
         <q-item>
           <q-item-section class="text-grey">
             Не нашел такого, ты уверен(а)?
           </q-item-section>
         </q-item>
       </template>
     </q-select>
      
      <!-- button -->
      <q-btn class="fit" color="primary" label="Добавить" @click="saveData()" v-if="mega.showbutton"></q-btn>

    </div>
  </div>
  `
  ,
  setup() {
    var showPaymentMethodTo = ref(false);
    var mega = reactive({
      paymentMethod: model.paymentMethod,
      paymentMethodTo: model.paymentMethodTo,

      paymentMethodOptions: model.paymentMethodOptions,
      paymentTypeOptions: model.paymentTypeOptions,
      paymentType: model.paymentType,

      address: model.address,
      addressOptions: model.addressOptions,
      showaddress: false,

      city: model.city,
      cityOptions: model.cityOptions,

      paymenticon: 'payments',
      consumption: model.consumption,
      manager: model.managerApp,

      consumptionOptions: model.consumptionOptions.map(item => item.label),
      userOptions: model.userOptions,

      showconsumption: false,
      showmanager: false,

      sum: model.sum,
      comment: model.comment,
      showbutton: computed(() => { return (mega.paymentMethod.val && mega.paymentType.val ) ? true : false }),

      sheet: model.sheet,
      user: model.user
      // sheets: model.sheets
      // sheetselected: computed(() => {return (mega.sheet.val != 'Менеджер.Архив') ? model.addressOptions : model.addressOptionsArchive}),
    });

    // function filteraddressFn(val, update) {
    //   if (val === '') {
    //     update(() => {
    //       mega.addressOptions = mega.sheet.val != 'Менеджер.Архив' ? model.addressOptions : model.addressOptionsArchive;
    //     })
    //     return;
    //   }
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     mega.addressOptions = (mega.sheet.val != 'Менеджер.Архив' ? model.addressOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1) : model.addressOptionsArchive.filter(v => v.label.toLowerCase().indexOf(needle) > -1));
    //   })
    // }

    function filteraddressFn(val, update) {
      if (val === '') {
        update(() => {
          mega.addressOptions = model.addressOptions;
        })
        return;
      }
      update(() => {
        const needle = val.toLowerCase()
        mega.addressOptions = model.addressOptions.filter(v => {
          let arneed = needle.split(' ');
          if (arneed.every(ar => v.label.toLowerCase().includes(ar))) {
            return v
          }
        });

      })
    }

    function filterCity(val, update) {
      if (val === '') {
        update(() => {
          mega.cityOptions = model.cityOptions;
        })
        return;
      }
      update(() => {
        const needle = val.toLowerCase()
        mega.cityOptions = model.cityOptions.filter(v => {
          let arneed = needle.split(' ');
          if (arneed.every(ar => v.label.toLowerCase().includes(ar))) {
            return v
          }
        });

      })
    }

    function filterconsumptionFn(val, update, abort) {
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

    function filterusersFn(val, update, abort) {
      if (val === '') {
        update(() => {
          mega.userOptions = model.userOptions
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase()
        mega.userOptions = model.userOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }

    function abortFilterFn() {
      console.log('delayed filter aborted')
    }

    async function getArchiveAddress() {
      const url = 'https://script.google.com/macros/s/AKfycbzUgwNF8Tqs3tmw7sV3ZxWKBDN5bUJ2mfr7mUR5MLrWeCMIvo3GSS4ZfKUbYZN5eXRY/exec?key=financeaddress&sheet=Менеджер.Архив';
      const requestOptions = {
        method: "GET",
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      model.addressOptionsArchive = data.address;
    }

    function showaddressFn() {
      mega.showaddress = mega.paymentType.val == 'Приход' ? true : false;
    }

    function showconsumptionFn() {
      mega.showconsumption = mega.paymentType.val == 'Расход' ? true : false;
    }

    function showPaymentMethodToFn() {
      showPaymentMethodTo.value = mega.paymentType.val == 'Перенос' ? true : false;
    }

    function showManagerFn() {
      mega.showmanager = mega.paymentType.val == 'Бонус' ? true : false;
    }

    async function saveData() {
      model.mode = 'finance';
      model.sum.val = +model.sum.val.replace(/ /g, '');
      model.consumption.val = model.consumption.val.label;
      model.address.val = model.address.val.label;

      let model2 = JSON.parse(JSON.stringify(model));

      Object.keys(mega).forEach(key => {
        if (mega[key].hasOwnProperty('val')) {
          mega[key].val = ""
        }
      });

      mega.sheet.val = 'Master';
      showconsumptionFn();
      showaddressFn();

      var url = 'https://script.google.com/macros/s/AKfycbxUdyBL0BjJwEGkEJPke5moCMh1NhY661CfUQCWT2KGc0PllVNTwumQ5Kiiuo-3ykrV/exec';

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
        body: JSON.stringify(model2)
      };
      let response = await fetch(url, requestOptions);

      // let data = await response.json();

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

    watch(() => mega.consumption.val, (newVal, prevVal) => {
      mega.showaddress = newVal.needaddress;
      mega.showmanager = mega.consumption.val.label == 'Бонусы менеджеры' || mega.consumption.val.label == 'Бонусы ПМ' ? true : false;
    })

    return {
      mega,
      showPaymentMethodTo,
      showManagerFn,
      showaddressFn,
      filteraddressFn,
      filterusersFn,
      filterCity,
      filterconsumptionFn,
      showconsumptionFn,
      showPaymentMethodToFn,
      abortFilterFn,
      saveData
    }
  }
}

const app = Vue.createApp(vueObject);

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