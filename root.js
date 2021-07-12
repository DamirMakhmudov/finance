const { getCurrentInstance, createApp, ref, reactive, computed, watch, onMounted, watchEffect, onBeforeUnmount } = Vue;
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
        v-on:click="showaddressFn();showconsumptionFn()"
      >
      </q-btn-toggle>

      <q-btn-toggle
          spread
          v-model = "mega.paymentMethod.val"
          toggle-color = "primary"
          :options= "mega.paymentMethodOptions"
          v-on:click="showplaceFn()"
      >
      </q-btn-toggle>

      <q-btn-toggle v-if="mega.showplace"
        spread
        v-model = "mega.place.val"
        toggle-color = "accent"
        :options= "mega.placeOptions"
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
      
      <q-btn color="primary" label="Добавить" class="fit" @click="refreshApp()"/>
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
      place: model.placeOptions,
      placeOptions: model.placeOptions,
      showplace : false,

      address: model.address,
      addressOptions: model.addressOptions,
      showaddress : false,
      
      paymenticon : 'payments',
      consumption : model.consumption,
      consumptionOptions : model.consumptionOptions.map(item => item.label),
      showconsumption : false,
      
      sum: model.sum,
      comment: model.comment
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

    function showplaceFn() {
      mega.showplace = mega.paymentMethod.val == 'cash' ? true : false;
      mega.paymenticon = mega.paymentMethod.val == 'cash' ? 'payments' : 'payment';
    }

    function showaddressFn() {
      mega.showaddress= mega.paymentType.val == 'income' ? true : false;
    }

    function showconsumptionFn() {
      mega.showconsumption = mega.paymentType.val == 'outcome' ? true : false;
    }

    function refreshApp() {
      Object.keys(mega).forEach(key =>{
        if(mega[key].hasOwnProperty('val')){
          console.log(key);
          mega[key].val = ""
        }
      });
      
    }

    watch(() => mega.consumption.val,(newVal, prevVal) => {
      mega.showaddress = newVal.needaddress
    })

    return {
      mega,
      showaddressFn,
      filteraddressFn,
      showplaceFn,
      showconsumptionFn,
      filterconsumptionFn,
      refreshApp
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
//   val.val = 'vdnh' ? showplace=true : showplace=false 
// })

// var showplace = ref(toggelPaymentMethod(paymentMethod))
// var showplace = ref(computed(() => { return toggelPaymentMethod(paymentMethod) }));
// const showplace = ref(computed(() => { return paymentMethod.value.val == 'cash' ? true : false }));