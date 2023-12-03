const { createApp, ref, reactive, computed, watch, onMounted, watchEffect, onBeforeUnmount } = Vue;
const { useQuasar, Loading, QSpinnerGears } = Quasar;

var vueObject = {
  name: "root",
  template:
    /*html*/
    `
    {{mega}}
  <div class="q-pa-md fit column justify-center">

    <!-- first buttons -->
    <div class="q-gutter-y-xs" style="width:100%"> <!-- style="height:200px" -->
      <q-btn-toggle spread v-model="mega.paymentType.val" toggle-color="positive" :options="megaview.paymentTypeOptions" v-on:click="showaddressFn();showconsumptionFn();showPaymentMethodToFn();showManagerFn()" wrap>
      </q-btn-toggle>

      <!-- paymentMethod -->
      <q-select behavior="menu" v-model="mega.paymentMethod.val" :options="megaview.paymentMethodOptions" :label="showPaymentMethodTo ? 'Откуда' : 'Способ оплаты'" clearable></q-select>

      <!-- paymentMethodTo -->
      <q-select behavior="menu" v-model="mega.paymentMethodTo.val" :options="megaview.paymentMethodOptions" label="Куда" clearable v-if="showPaymentMethodTo"></q-select>

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
      <q-select v-model="mega.consumption.val" use-input input-debounce="0" label="Тип расхода" :options="megaview.consumptionOptions" @filter="filterconsumptionFn" behavior="menu" v-if="mega.showconsumption">

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
      <q-select v-model="mega.address.val" use-input input-debounce="0" label="Адрес" :options="megaview.addressOptions" @filter="filteraddressFn" @filter-abort="abortFilterFn" behavior="menu" v-if="mega.showaddress">
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
      <q-select v-model="mega.city.val" use-input input-debounce="0" label="Город" :options="megaview.cityOptions" @filter="filterCity" @filter-abort="abortFilterFn" behavior="menu" v-if="mega.showaddress">
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
       <q-select v-model="mega.manager.val" use-input input-debounce="0" label="Менеджер" :options="megaview.userOptions" behavior="menu" @filter="filterusersFn" v-if="mega.showmanager">
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
    var megaview = reactive({
      paymentMethodOptions: model.paymentMethodOptions,
      paymentTypeOptions: model.paymentTypeOptions,
      addressOptions: model.addressOptions,
      cityOptions: model.cityOptions,
      consumptionOptions: model.consumptionOptions.map(item => item.label),
      userOptions: model.userOptions
    });

    var mega = reactive({
      paymentMethod: model.paymentMethod,
      paymentMethodTo: model.paymentMethodTo,
      // paymentMethodOptions: model.paymentMethodOptions,

      paymentType: model.paymentType,
      // paymentTypeOptions: model.paymentTypeOptions,

      address: model.address,
      // addressOptions: model.addressOptions,
      showaddress: false,

      city: model.city,
      // cityOptions: model.cityOptions,

      paymenticon: 'payments',

      manager: model.managerApp,
      showmanager: false,

      consumption: model.consumption,
      // consumptionOptions: model.consumptionOptions.map(item => item.label),
      showconsumption: false,

      // userOptions: model.userOptions,

      sum: model.sum,
      comment: model.comment,

      // showbutton: computed(() => { return (mega.paymentMethod.val && mega.paymentType.val ) ? true : false }),
      showbutton: computed(() => {
        switch (mega.paymentType.val) {
          case 'Приход':
            return (mega.paymentMethod.val && mega.paymentType.val && mega.sum.val && mega.address.val && mega.city.val);
          case 'Расход':
            if (mega.consumption.val && mega.consumption.val.needaddress == true) {
              return (mega.paymentMethod.val && mega.paymentType.val && mega.sum.val && mega.address.val && mega.city.val);
            } else {
              return (mega.paymentMethod.val && mega.paymentType.val && mega.sum.val);
            }
          case 'Перенос':
            return (mega.paymentMethod.val && mega.paymentMethodTo.val && mega.sum.val);
          case 'Бонус':
            return (mega.paymentMethod.val && mega.sum.val && mega.manager.val);
          default:
            return false
        }

      }),

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
          megaview.addressOptions = model.addressOptions;
        })
        return;
      }
      update(() => {
        const needle = val.toLowerCase()
        megaview.addressOptions = model.addressOptions.filter(v => {
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
          megaview.cityOptions = model.cityOptions;
        })
        return;
      }
      update(() => {
        const needle = val.toLowerCase()
        megaview.cityOptions = model.cityOptions.filter(v => {
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
          megaview.consumptionOptions = model.consumptionOptions
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase()
        megaview.consumptionOptions = model.consumptionOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }

    function filterusersFn(val, update, abort) {
      if (val === '') {
        update(() => {
          megaview.userOptions = model.userOptions
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase()
        megaview.userOptions = model.userOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
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
      // model.mode = 'finance';
      // model.sum.val = +model.sum.val.replace(/ /g, '');
      // model.consumption.val = model.consumption.val.label;
      // model.address.val = model.address.val.label;

      // let model2 = JSON.parse(JSON.stringify(model));
      let m2 = JSON.parse(JSON.stringify(mega));

      Object.keys(mega).forEach(key => {
        if (mega[key].hasOwnProperty('val')) {
          mega[key].val = ""
        }
      });

      mega.sheet.val = 'Master';
      showconsumptionFn();
      showaddressFn();
      
      var url = 'https://script.google.com/macros/s/AKfycbzwN41qL0j_hwItg-NW_X_4V4K9MojySEUrOk8Nop0qfhE_3bNPZH5VQr7FeWQZL2lO/exec';

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
        body: JSON.stringify(m2)
      };
      let response = await fetch(url, requestOptions);
    }

    watch(() => mega.consumption.val, (newVal, prevVal) => {
      mega.showaddress = newVal.needaddress;
      mega.showmanager = mega.consumption.val.label == 'Бонусы менеджеры' || mega.consumption.val.label == 'Бонусы ПМ' ? true : false;
    })

    return {
      mega,
      showPaymentMethodTo,
      megaview,
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