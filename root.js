const { createApp, ref, reactive, computed, watch, onMounted, watchEffect, onBeforeUnmount } = Vue;
const { useQuasar, Loading, QSpinnerGears } = Quasar;

var vueObject = {
  name: "root",
  template:
  /*html*/
  `
  <!-- select payment method -->
  <div class="q-pa-md fit row justify-center">

    
    <div class="q-gutter-y-xs">
      <q-btn-toggle
        spread
        v-model = "paymentMethod.val"
        toggle-color = "primary"
        :options= "paymentMethodOptions"
      />

      <q-btn-toggle
        spread
        v-model = "paymentType.val"
        toggle-color = "positive"
        :options= "paymentTypeOptions"
      />

      <q-btn-toggle v-if="showplace"
        spread
        v-model = "place.val"
        toggle-color = "accent"
        :options= "placeOptions"
      />
    </div>

    <!-- address -->
    <div id="q-gutter-y-xs">

    </div>

    
  </div>

  <div v-show='show' class='text-caption'>
    model: {{model}}
  </div>
  `
  ,
  setup() {
    var paymentMethod = ref(model.paymentMethod)

    // watch(paymentMethod.value, (val) =>{
    //   console.log(val)
    //   val.val = 'vdnh' ? showplace=true : showplace=false 
    // })

    // var showplace = ref(toggelPaymentMethod(paymentMethod))

    // var showplace = ref(computed(() => { return toggelPaymentMethod(paymentMethod) }));
    var showplace = ref(computed(() => { return paymentMethod.value.val == 'cash' ? true : false }));

    return {
      show: false,
      // show: true,
      model: ref(model),
      paymentMethod,
      paymentMethodOptions: ref(model.paymentMethodOptions),
      paymentType: ref(model.paymentType),
      paymentTypeOptions: ref(model.paymentTypeOptions),
      place: ref(model.place),
      placeOptions: ref(model.placeOptions),
      showplace,
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