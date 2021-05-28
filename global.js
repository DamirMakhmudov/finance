const { createApp, ref, reactive, computed, watch, onMounted, watchEffect, onBeforeUnmount } = Vue;
const { useQuasar, Loading, QSpinnerGears } = Quasar;

var vueObject = {
  name: "global",
  template:
  /*html*/
  `
  <p>{{first}}</p>
  <input v-model='first'>

  <div class="q-pa-md q-gutter-sm">
    <div>
      <q-toggle
        v-model="first"
        icon="alarm"
      />
      <q-toggle
        v-model="second"
        color="pink"
        icon="mail"
        label="Same Icon for each state"
      />
    </div>

    <div>
      <q-toggle
        v-model="third"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
      />
      <q-toggle
        v-model="fourth"
        checked-icon="check"
        color="red"
        unchecked-color="green"
        label="Different icon for each state"
        unchecked-icon="clear"
        size="lg"
      />
    </div>
  </div>
  `
  ,
 
  setup(){
    return{
      first: ref(true),
      second: ref(true),
      third: ref(false),
      fourth: ref(true)
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