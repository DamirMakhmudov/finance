const { createApp, ref, reactive, computed, watch, onMounted, watchEffect, onBeforeUnmount } = Vue;
const { useQuasar, Loading, QSpinnerGears } = Quasar;

var vueObject = {
  name: "root",
  template:
  /*html*/
  `
  <div class="q-pa-md fit column justify-center">

    <!-- first buttons -->
    <div class="q-gutter-y-xs">

      <q-btn-toggle
        spread
        v-model = "paymentType.val"
        toggle-color = "positive"
        :options= "paymentTypeOptions"
        v-on:click="showaddressFn()"
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

    <!-- address -->
    <q-select
      v-model="address.val"
      use-input
      input-debounce="0"
      label="Адрес"
      :options="addressOptions"
      @filter="filterFn"
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

    <!-- comment -->
    <q-input
      v-model="comment.val"
      label="Комментарий"
    >
      <template v-slot:prepend>
        <q-icon name="chat" />
      </template>
    </q-input>
    
    <!-- sum -->
    <q-input
      v-model.number="sum.val"
      label="Сумма"
      type="number"
    >
      <template v-slot:prepend>
        <q-icon name="price" />
      </template>
    </q-input>

  </div>

  <!-- model -->
  <div v-show='show' class='text-caption'>
    <hr>
    model: {{model}}
  </div>
  `
  ,
  setup() {
    const paymentMethod = ref(model.paymentMethod);
    const paymentType = ref(model.paymentType);
    const showplace = ref(false);
    const showaddress = ref(false);
    const addressOptions = ref(model.addressOptions);

    function filterFn (val, update) {
      if (val === '') {
        update(() => {
          addressOptions.value = model.addressOptions
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        addressOptions.value = model.addressOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }

    function showplaceFn(){
      showplace.value = paymentMethod.value.val == 'cash' ? true : false;
    }

    function showaddressFn(){
      showaddress.value = paymentType.value.val == 'income' ? true : false;
    }

    return {
      show: false,
      // show: true,
      model: ref(model),

      paymentMethod,
      paymentMethodOptions: ref(model.paymentMethodOptions),
      paymentType,
      paymentTypeOptions: ref(model.paymentTypeOptions),
      place: ref(model.place),
      placeOptions: ref(model.placeOptions),
      showplace,
      showplaceFn,
      address: ref(model.address),
      addressOptions,
      showaddress,
      comment: ref(model.comment),
      sum: ref(model.sum),
      showaddressFn,
      filterFn
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