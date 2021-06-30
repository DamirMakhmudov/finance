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
        v-model = "paymentType.val"
        toggle-color = "positive"
        :options= "paymentTypeOptions"
        v-on:click="showaddressFn();showconsumptionFn()"
      />

      <q-btn-toggle
        spread
        v-model = "paymentMethod.val"
        toggle-color = "primary"
        :options= "paymentMethodOptions"
        v-on:click="showplaceFn()"
      />

      <q-btn-toggle v-if="showplace"
        spread
        v-model = "place.val"
        toggle-color = "accent"
        :options= "placeOptions"
      />
    </div>

    <div class="q-gutter-y-xs">
      <!-- comment -->
      <q-input
        v-model="comment.val"
        label="Комментарий"
        autogrow
      >
        <template v-slot:prepend>
          <q-icon name="chat" />
        </template>
      </q-input>
    
      <!-- sum -->
      <q-input
        v-model.number="sum.val"
        label='Сумма'
        type="number"
      >
        <template v-slot:prepend>
          <q-icon :name="paymenticon"/>
        </template>
      </q-input>

      <!-- consumption -->
      <q-select
        v-model="consumption.val"
        use-input
        input-debounce="0"
        label="Тип расхода"
        :options="consumptionOptions"
        @filter="filterconsumptionFn"
        behavior="menu"
        v-if="showconsumption"
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

      <!-- address -->
      <q-select
        v-model="address.val"
        use-input
        input-debounce="0"
        label="Адрес"
        :options="addressOptions"
        @filter="filteraddressFn"
        behavior="menu"
        v-if="showaddress"
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
      
      <!-- save --> 
      <q-btn color="primary" label="Добавить" class="fit" @click="appendRow()"/>
    </div>
  </div>
  `
  ,
  setup() {
    const paymentMethod = ref(model.val.paymentMethod);
    const paymentType = ref(model.val.paymentType);
    const showplace = ref(false);
    const showaddress = ref(false);
    const addressOptions = ref(model.val.addressOptions);
    const paymenticon = ref('payments');
    const consumption = ref(model.val.consumption);
    const consumptionOptions = ref(model.val.consumptionOptions.map(item => item.label));
    const showconsumption = ref(false);
    
    function filteraddressFn(val, update) {
      if (val === '') {
        update(() => {
          addressOptions.value = model.val.addressOptions;
        })
        return;
      }
      update(() => {
        const needle = val.toLowerCase()
        addressOptions.value = model.val.addressOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }

    function filterconsumptionFn(val, update) {
      if (val === '') {
        update(() => {
          consumptionOptions.value = model.val.consumptionOptions
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase()
        consumptionOptions.value = model.val.consumptionOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }

    function showplaceFn() {
      showplace.value = paymentMethod.value.val == 'cash' ? true : false;
      paymenticon.value = paymentMethod.value.val == 'cash' ? 'payments' : 'payment';
    }

    function showaddressFn() {
      showaddress.value = paymentType.value.val == 'income' ? true : false;
    }

    function showconsumptionFn() {
      showconsumption.value = paymentType.value.val == 'outcome' ? true : false;
    }

    function appendRow() {
      console.log('appendRow');
      // model.val = 'origin.val';
      model.val.paymentMethod.val = 'cashlessпше '
      // Object.keys(model.val).forEach((item, idx)=>{
      //   if(model.val[item].hasOwnProperty('val')){
      //     model.val[item].val = origin.val[item].val
      //   }
      // })
      // vm.$forceUpdate();
      // vm.$nextTick(() => {
        // this.renderComponent = true;
      // });
      // location.reload();
    }

    watch(consumption.value, (val) => {
      if (val.val) {
        showaddress.value = val.val.needaddress ? true : false
      }
    })

    return {
      paymentMethod,
      paymentMethodOptions: ref(model.val.paymentMethodOptions),
      paymentType,
      paymentTypeOptions: ref(model.val.paymentTypeOptions),
      place: ref(model.val.place),
      placeOptions: ref(model.val.placeOptions),
      showplace,
      showplaceFn,
      address: ref(model.val.address),
      addressOptions,
      showaddress,
      showaddressFn,
      filteraddressFn,
      comment: ref(model.val.comment),
      sum: ref(model.val.sum),
      paymenticon,
      consumption,
      consumptionOptions,
      showconsumption,
      showconsumptionFn,
      filterconsumptionFn,
      appendRow
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