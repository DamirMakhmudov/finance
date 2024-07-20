const {
  createApp,
  ref,
  reactive,
  computed,
  watch,
  onBeforeMount,
  onMounted,
  watchEffect,
  onBeforeUnmount,
} = Vue;
const { useQuasar, Loading, QSpinnerGears } = Quasar;

var vueObject = {
  name: "root",
  template:
    /*html*/
    `
  {{mega.user.val}}

  <div class="q-pa-md fit column justify-center">

    <!-- first buttons -->
    <div class="q-gutter-y-xs" style="width:100%"> <!-- style="height:200px" -->
      <!-- <q-btn-toggle
      spread v-model="mega.paymentType.val" toggle-color="positive" 
      :options="megaview.paymentTypeOptions" 
      v-on:click="showaddressFn();showconsumptionFn();showPaymentMethodToFn();showManagerFn()" wrap
      >
      </q-btn-toggle> -->

<button @click="addval()">dd</button>

      <!-- paymentMethod -->
      <q-select behavior="menu" v-model="mega.paymentMethod.val" @filter="filterpaymentMethod" :options="megaview.paymentMethodOptions" :label="showPaymentMethodTo ? 'Откуда' : 'Способ оплаты2'" clearable></q-select>

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
      <!-- v-if="mega.showaddress" -->
      <q-select v-model="mega.address.val" use-input input-debounce="0" label="Адрес" :options="megaview.addressOptions" @filter="filteraddressFn" @filter-abort="abortFilterFn" behavior="menu" >
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
      <q-select v-model="mega.city.val" use-input input-debounce="0" label="Город" :options="megaview.cityOptions" @filter="filterCity" @filter-abort="abortFilterFn" behavior="menu" >
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
  `,
  setup() {
    const $q = useQuasar();
    var showPaymentMethodTo = ref(false);
    var megaview = reactive(view);
    // var megaview = reactive({
    //   paymentMethodOptions: view.paymentMethodOptions,
    //   paymentTypeOptions: view.paymentTypeOptions,
    //   addressOptions: view.addressOptions,
    //   cityOptions: view.cityOptions,
    //   consumptionOptions: view.consumptionOptions.map(item => item.label),
    //   userOptions: view.userOptions
    // });
    var WEB_URL =
      "https://script.google.com/macros/s/AKfycbzbrg3TqpoBGvO_UETLBTiYV4mROjCYw0ehqmNMekC-ZD41BvCHiQqJ8DsN5PJkWwVx1w/exec";

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
      paymenticon: "payments",
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
          case "Приход":
            return (
              mega.paymentMethod.val &&
              mega.paymentType.val &&
              mega.sum.val &&
              mega.address.val &&
              mega.city.val
            );
          case "Расход":
            if (
              mega.consumption.val &&
              mega.consumption.val.needaddress == true
            ) {
              return (
                mega.paymentMethod.val &&
                mega.paymentType.val &&
                mega.sum.val &&
                mega.address.val &&
                mega.city.val
              );
            } else {
              return (
                mega.paymentMethod.val && mega.paymentType.val && mega.sum.val
              );
            }
          case "Перенос":
            return (
              mega.paymentMethod.val && mega.paymentMethodTo.val && mega.sum.val
            );
          case "Бонус":
            return mega.paymentMethod.val && mega.sum.val && mega.manager.val;
          default:
            return false;
        }
      }),
      sheet: model.sheet,
      user: model.user,
      // sheets: model.sheets
      // sheetselected: computed(() => {return (mega.sheet.val != 'Менеджер.Архив') ? view.addressOptions : view.addressOptionsArchive}),
    });

    onBeforeMount(() => {
      l("onBeforeMount");
      getView();
    });

    function l(text) {
      console.log(text);
    }

    function addval() {
      console.log(megaview.value.paymentMethodOptions);
      // megaview.value.paymentMethodOptions = view.paymentMethodOptions
    }

    async function getView() {
      l("getView");
      $q.loading.show({
        message: "Загрузка...",
      });
      // try {
      // google.script.run.withSuccessHandler(getView_callback).getViewGS();
      // } catch (err) {
      getView_server();
      // }
    }

    function getView_callback(responseO) {
      view = JSON.parse(responseO);
    }

    async function getView_server() {
      l("getView_server");
      let url = WEB_URL + "?mode=getview";
      let response = await fetch(url, {
        method: "GET",
        muteHttpExceptions: false,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((resp) => resp.json());
      view = response;
      l(view)
      //megaview.value = response;
      // l(megaview.value.paymentMethodOptions)
      $q.loading.hide();
    }

    function filteraddressFn(val, update) {
      if (val === "") {
        update(() => {
          megaview.addressOptions = view.addressOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        megaview.addressOptions = view.addressOptions.filter((v) => {
          let arneed = needle.split(" ");
          if (arneed.every((ar) => v.toLowerCase().includes(ar))) {
            return v;
          }
        });
      });
    }

    function filterCity(val, update) {
      if (val === "") {
        update(() => {
          megaview.cityOptions = view.cityOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        megaview.cityOptions = view.cityOptions.filter((v) => {
          let arneed = needle.split(" ");
          if (arneed.every((ar) => v.toLowerCase().includes(ar))) {
            return v;
          }
        });
      });
    }

    function filterpaymentMethod(val, update, abort) {
      if (val === "") {
        update(() => {
          megaview.paymentMethodOptions = view.paymentMethodOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        megaview.paymentMethodOptions = view.paymentMethodOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    }

    function filterconsumptionFn(val, update, abort) {
      if (val === "") {
        update(() => {
          megaview.consumptionOptions = view.consumptionOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        megaview.consumptionOptions = view.consumptionOptions.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    }

    function filterusersFn(val, update, abort) {
      if (val === "") {
        update(() => {
          megaview.userOptions = view.userOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        megaview.userOptions = view.userOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    }

    function abortFilterFn() {
      console.log("delayed filter aborted");
    }

    async function getArchiveAddress() {
      const url =
        "https://script.google.com/macros/s/AKfycbzUgwNF8Tqs3tmw7sV3ZxWKBDN5bUJ2mfr7mUR5MLrWeCMIvo3GSS4ZfKUbYZN5eXRY/exec?key=financeaddress&sheet=Менеджер.Архив";
      const requestOptions = {
        method: "GET",
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      let response = await fetch(url, requestOptions);
      let data = await response.json();
      view.addressOptionsArchive = data.address;
    }

    function showaddressFn() {
      mega.showaddress = mega.paymentType.val == "Приход" ? true : false;
    }

    function showconsumptionFn() {
      mega.showconsumption = mega.paymentType.val == "Расход" ? true : false;
    }

    function showPaymentMethodToFn() {
      showPaymentMethodTo.value =
        mega.paymentType.val == "Перенос" ? true : false;
    }

    function showManagerFn() {
      mega.showmanager = mega.paymentType.val == "Бонус" ? true : false;
    }

    async function saveData() {
      // model.mode = 'finance';
      model.sum.val = +model.sum.val.replace(/ /g, ""); //раскоментил
      // model.consumption.val = model.consumption.val.label;
      // model.address.val = model.address.val.label;
      // let model2 = JSON.parse(JSON.stringify(model));

      let m2 = JSON.parse(JSON.stringify(mega));

      Object.keys(mega).forEach((key) => {
        if (mega[key].hasOwnProperty("val")) {
          mega[key].val = "";
        }
      });

      m2.mode = "finance";

      mega.sheet.val = "Master";
      showconsumptionFn();
      showaddressFn();

      var url =
        "https://script.google.com/macros/s/AKfycbzbrg3TqpoBGvO_UETLBTiYV4mROjCYw0ehqmNMekC-ZD41BvCHiQqJ8DsN5PJkWwVx1w/exec";

      const requestOptions = {
        method: "POST",
        // mode: 'no-cors',
        headers: {
          // "Content-Type": "application/json",
          // "Content-Type": "undefined",
          "Content-Type": "application/x-www-form-urlencoded",
          // "Content-Type": "text/plain",
          // 'contentType': "application/json; charset=UTF-8",
          // 'accept': 'application/json'
          // 'accept': 'text/plain'
        },
        body: JSON.stringify(m2),
      };
      console.log(m2);
      let response = await fetch(url, requestOptions);
    }

    watch(
      () => mega.consumption.val,
      (newVal, prevVal) => {
        mega.showaddress = newVal.needaddress;
        mega.showmanager =
          mega.consumption.val.label == "Бонусы менеджеры" ||
            mega.consumption.val.label == "Бонусы ПМ"
            ? true
            : false;
      }
    );

    return {
      mega,
      showPaymentMethodTo,
      megaview,
      getView,
      l,
      showManagerFn,
      showaddressFn,
      filteraddressFn,
      filterusersFn,
      filterpaymentMethod,
      filterCity,
      filterconsumptionFn,
      showconsumptionFn,
      showPaymentMethodToFn,
      abortFilterFn,
      saveData,
      addval
    };
  },
};

const app = Vue.createApp(vueObject);

app.use(Quasar, {
  config: {
    notify: {
      /* look at QuasarConfOptions from the API card */
    },
    loading: {
      /* look at QuasarConfOptions from the API card */
    },
  },
});

Quasar.lang.set(Quasar.lang.ru);

// watch(paymentMethod.value, (val) =>{
//   console.log(val)
//   val.val = 'vdnh' ? showoffice=true : showoffice=false
// })
// var showoffice = ref(toggelPaymentMethod(paymentMethod))
// var showoffice = ref(computed(() => { return toggelPaymentMethod(paymentMethod) }));
// const showoffice = ref(computed(() => { return paymentMethod.value.val == 'cash' ? true : false }));
