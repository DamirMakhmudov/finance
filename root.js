const { getCurrentInstance, createApp, ref, reactive, computed, watch, onMounted, watchEffect, onBeforeUnmount } = Vue;
const { useQuasar, Loading, QSpinnerGears } = Quasar;

var vueObject = {
  name: "root",
  template:
  /*html*/
  `
  <comp :key='square'></comp>
  <q-btn color="primary" label="Добавить" class="fit" @click="forceUp()"/>
  `
  ,
  data(){
    return{
      square: 0
    }
  },
  methods:{
    forceUp(){
      console.log(model);
      this.square+=1;
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