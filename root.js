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
const { useQuasar, Loading, QSpinnerGears, copyToClipboard } = Quasar;

var vueObject = {
  name: "root",
  template:
    /*html*/
    `
  <div class="q-pa-md fit column justify-center">

    <div class="q-gutter-y-xs" style="width:100%"> <!-- style="height:200px" -->
      
      <!-- paymentType -->
      <q-btn-toggle spread v-model="mega.paymentType.val" toggle-color="positive" :options="megaview.paymentTypeOptions" clearable wrap></q-btn-toggle>

      <!-- comment -->
      <q-input label="Комментарий" use-input clearable v-model="mega.comment.val" type="textarea">
        <template v-slot:prepend>
          <q-icon name="chat" @click="clip(mega.comment.val)" />
        </template>
      </q-input>

      <!-- sum -->
      <q-input v-model="mega.sum.val" label="Сумма" mask="#" reverse-fill-mask clearable>
        <template v-slot:prepend="">
          <q-icon :name="mega.paymenticon">
        </q-icon></template>
      </q-input>

       <!-- paymentMethod -->
      <q-select behavior="menu" v-model="mega.paymentMethod.val" v-if="showcommon" @filter="filterpaymentMethod" :options="megaview.paymentMethodOptions" label="Способ оплаты" clearable></q-select>

      <!-- consumption -->
      <q-select v-model="mega.consumption.val" use-input input-debounce="0" label="Тип расхода" :options="megaview.consumptionOptions" clearable @filter="filterconsumption" behavior="menu" v-if="mega.paymentType.val=='Расход'">
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
      
      <!-- income -->
      <q-select v-model="mega.consumption.val" use-input input-debounce="0" label="Тип прихода" :options="megaview.incomeOptions" clearable @filter="filterincome" behavior="menu" v-if="mega.paymentType.val=='Приход'">
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

      <!-- Этап оплат -->
      <q-select v-model="mega.payment_stage.val" v-if="showcommon"  use-input input-debounce="0" label="Этап оплат" :options="megaview.payment_stageOptions" clearable behavior="menu" >
        <template v-slot:prepend="">
          <q-icon name="123">
        </q-icon></template>
        <template v-slot:no-option="">
          <q-item>
            <q-item-section class="text-grey">
              Не нашел такого, ты уверен(а)?
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- address-->
      <q-select v-model="mega.address.val" clearable use-input input-debounce="0" @update:model-value="val => changeAddress(val)" label="Адрес" :options="megaview.addressOptions" @filter="filteraddress" @filter-abort="abortFilterFn" v-if="showaddress" behavior="menu">
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
      <q-select v-model="mega.city.val" use-input input-debounce="0" label="Направление" :options="megaview.cityOptions" @filter="filterCity" clearable @filter-abort="abortFilterFn" behavior="menu" >
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
      <q-select v-model="mega.manager.val" use-input v-if="(mega.address.val != '' || mega.paymentType.val=='Бонус')" input-debounce="0" label="Менеджер" :options="megaview['managerOptions']" behavior="menu" clearable @filter="filtermanager">
        <template v-slot:prepend="">
          <q-icon name="person"></q-icon>
        </template>
        <template v-slot:no-option="">
          <q-item>
            <q-item-section class="text-grey">
              Не нашел такого, ты уверен(а)?
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      
      <!-- manager_per -->
      <q-input v-model="mega.manager_per.val" v-if="mega.address.val" label="Процент Менеджера" mask="#" reverse-fill-mask clearable>
        <template v-slot:prepend="">
          <q-icon name="percent">
        </q-icon></template>
      </q-input>

      <!-- projectmanager -->
      <q-select v-model="mega.projectmanager.val"  v-if="mega.address.val" use-input @filter="filterprojectmanager" input-debounce="0"  label="Проектный менеджер" :options="megaview['projectmanagerOptions']" behavior="menu" clearable>
        <template v-slot:prepend="">
          <q-icon name="person">
        </q-icon></template>
        <template v-slot:no-option="">
          <q-item>
            <q-item-section class="text-grey">
              Не нашел такого, ты уверен(а)?
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- projectmanager_per -->
      <q-input v-model="mega.projectmanager_per.val" v-if="mega.address.val" label="Процент Проектного менеджера" mask="#" reverse-fill-mask clearable>
        <template v-slot:prepend="">
          <q-icon name="percent">
        </q-icon></template>
      </q-input>

      <!-- button -->
      <q-btn class="fit" color="primary" label="Добавить" @click="saveData()" v-if="showbutton"></q-btn>

    </div>
  </div>
  `,
  setup() {
    const $q = useQuasar();
    // var WEB_URL = "https://script.google.com/macros/s/AKfycbzbrg3TqpoBGvO_UETLBTiYV4mROjCYw0ehqmNMekC-ZD41BvCHiQqJ8DsN5PJkWwVx1w/exec";

    const WEB_URL =
      "https://script.google.com/macros/s/AKfycbzw6LbjuL-c4mb9SS_461GFSi6UAljyqYdP_suD7tq32dRL1WYxTd-7AMMyNk_sSpyEWQ/exec";

    var mega = reactive({
      paymentMethod: model.paymentMethod,
      paymentMethodTo: model.paymentMethodTo,
      paymentType: model.paymentType,
      address: model.address,
      city: model.city,
      paymenticon: "payments",
      manager: model.manager,
      manager_per: model.manager_per,
      projectmanager: model.projectmanager,
      projectmanager_per: model.projectmanager_per,
      consumption: model.consumption,
      sum: model.sum,
      comment: model.comment,
      sheet: model.sheet,
      user: model.user,
      payment_stage: model.payment_stage,
      lead_create_date: model.lead_create_date,
      contract_number: model.contract_number,
      id: model.id
    });

    var megaview = reactive(JSON.parse(JSON.stringify(view)));

    const showaddress = computed(() => {
      return mega.paymentType.val != "Бонус" && (mega.consumption.val && mega.consumption.val.needaddress == true)
    })

    const showcommon = computed(() => {
      return mega.paymentType.val != "Бонус" && mega.paymentType.val != ""
    })

    const isaddressfilled = computed(() => {
      return mega.paymentType.val != "Бонус" && mega.paymentType.val != ""
    })

    var showbutton = computed(() => {
      switch (mega.paymentType.val) {
        case "Приход":
        case "Расход":
          if (
            mega.consumption.val &&
            mega.consumption.val.needaddress == true
          ) {
            return !!(
              mega.paymentMethod.val &&
              mega.paymentType.val &&
              mega.sum.val &&
              mega.address.val &&
              mega.city.val
            );
          } else {
            return !!(
              mega.paymentMethod.val &&
              mega.paymentType.val &&
              mega.sum.val &&
              mega.city.val
            );
          }
        case "Бонус":
          return mega.paymentMethod.val && mega.sum.val && mega.manager.val;
        default:
          return false;
      }
    });

    function changeAddress(val) {
      if (val === "" || val === null) {
        mega.projectmanager.val = "";
        mega.projectmanager_per.val = "";
        mega.manager.val = "";
        mega.manager_per.val = "";
        mega.contract_number.val = "";
        mega.lead_create_date.val = "";
        mega.id.val = "";
        return
      }

      let idx = view.addressOptions.indexOf(val);

      let projectmanager = view["Проектный менеджер"][idx];
      if (projectmanager != undefined) {
        mega.projectmanager.val = projectmanager;
      }

      let projectmanager_per = view["%П"][idx];
      if (projectmanager_per != undefined) {
        mega.projectmanager_per.val = projectmanager_per;
      }

      let manager = view["Менеджер"][idx];
      if (manager != undefined) {
        mega.manager.val = manager;
      }

      let manager_per = view["%М"][idx];
      if (manager_per != undefined) {
        mega.manager_per.val = manager_per;
      }

      let id = view["id"][idx];
      if (id != undefined) {
        mega.id.val = id;
      }

      let lead_create_date = view["lead_create_date"][idx];
      if (lead_create_date != undefined) {
        mega.lead_create_date.val = lead_create_date;
      }

      let contract_number = view["contract_number"][idx];
      if (contract_number != undefined) {
        mega.contract_number.val = contract_number;
      }
    }

    function l(text) {
      console.log(text);
    }

    function clip(text) {
      copyToClipboard(text);
      notify("Скопирован");
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
      l(view);
      // megaview = response;
      $q.loading.hide();
    }

    function filteraddress(val, update) {
      if (val === "") {
        update(() => {
          megaview.addressOptions = view.addressOptions;
        });
        return;
      }
      update(() => {
        let arneed = val.toLowerCase().split(" ");
        megaview.addressOptions = view.addressOptions.filter((v) =>
          arneed.every((ar) => v.toLowerCase().includes(ar))
        );
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
        let arneed = val.toLowerCase().split(" ");
        megaview.cityOptions = view.cityOptions
          .filter((v) => arneed.every((ar) => v.toLowerCase().includes(ar)))
          .sort()
      });
    }

    function filterpaymentMethod(val, update, abort) {
      if (val === "") {
        update(() => {
          megaview.paymentMethodOptions = view.paymentMethodOptions.sort();
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        megaview.paymentMethodOptions = view.paymentMethodOptions
          .filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
          .sort()
      });
    }

    function filterconsumption(val, update, abort) {
      if (val === "") {
        update(() => {
          megaview.consumptionOptions = view.consumptionOptions.sort();
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        megaview.consumptionOptions = view.consumptionOptions
          .filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
          .sort();
      });
    }

    function filterincome(val, update, abort) {
      if (val === "") {
        update(() => {
          megaview.incomeOptions = view.incomeOptions.sort();
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        megaview.incomeOptions = view.incomeOptions
          .filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
          .sort();
      });
    }

    function filtermanager(val, update) {
      if (val === "") {
        update(() => {
          megaview.managerOptions = view.managerOptions;
        });
        return;
      }
      update(() => {
        let arneed = val.toLowerCase().split(" ");
        megaview.managerOptions = view.managerOptions
          .filter((v) => arneed.every((ar) => v.toLowerCase().includes(ar)));
      });
    }

    function filterprojectmanager(val, update) {
      if (val === "") {
        update(() => {
          megaview.projectmanagerOptions = view.projectmanagerOptions;
        });
        return;
      }
      update(() => {
        let arneed = val.toLowerCase().split(" ");
        megaview.projectmanagerOptions = view.projectmanagerOptions
          .filter((v) => arneed.every((ar) => v.toLowerCase().includes(ar)));
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

    function notify(text, type = "positive") {
      $q.notify({
        message: text,
        icon: "announcement",
        timeout: 1000,
        type: type,
        position: "top",
        actions: [
          {
            label: "Закрыть",
            color: "white",
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    }

    async function saveData() {
      let m2 = JSON.parse(JSON.stringify(model));

      Object.keys(model).forEach((key) => {
        if (model[key].hasOwnProperty("val")) {
          model[key].val = "";
        }
      });

      let sum = m2.sum.val.replace(/ /g, "");
      m2.sum.val = m2.paymentType.val == "Расход" ? sum * (-1) : +sum;
      l(m2.consumption.val.label)
      m2.consumption.val = m2.consumption.val.label;
      m2.mode = "finance";
      m2.lead_create_date.val = m2.lead_create_date.val != '' ? new Date(m2.lead_create_date.val).toLocaleDateString('ru-RU') : "";

      const requestOptions = {
        method: "POST",
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(m2),
      };
      l(m2);

      let response = await fetch(WEB_URL, requestOptions).then((resp) => resp.json());
      l(response);
      if (response.status == "good") {
        notify("Сохранено");
      } else {
        notify("Oшибка: " + response.error, "negative");
      }
    }

    onBeforeMount(() => {
      l("onBeforeMount");
      // getView();
    });

    watch(mega.paymentType, value => {
      if (value.val == "Бонус") {
        mega.paymentMethod.val = "Накопление бонусов";
      } else {
        mega.paymentMethod.val = "";
      }
    })

    // watch(
    //   () => mega.consumption.val,
    //   (newVal, prevVal) => {
    //     if (!newVal) return;
    //     mega.showaddress = newVal.needaddress;
    //     mega.showmanager =
    //       mega.consumption.val.label == "Бонусы менеджеры" ||
    //         mega.consumption.val.label == "Бонусы ПМ"
    //         ? true
    //         : false;
    //   }
    // );

    return {
      mega,
      megaview,
      l,
      getView,
      notify,
      showbutton,
      showaddress,
      showcommon,
      filteraddress,
      filterpaymentMethod,
      filterCity,
      filterconsumption,
      filterincome,
      filterprojectmanager,
      filtermanager,
      abortFilterFn,
      saveData,
      clip,
      changeAddress,
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
