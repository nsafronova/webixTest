import { dashboard, form } from './modules/dashboard.js'
import { treetable } from './modules/products.js'
import { filter, list, chart } from './modules/users.js'
import { ids } from './helpers.js'


const label = {
   view: "label",
   label: "My App",
};

const btn = {
   view: "button",
   type: "icon", icon: "wxi-user", label: "Profile",
   width: 100,
   css: 'webix_transparent',
   popup: 'my_pop'
}

const sidebar = {
   minHeight: 300,
   id: "mylist",
   css: "sidebar",
   view: "sidebar",
   width: 200,
   scroll: false,
   data: ["Dashboard", "Users", "Products", "Locations"],
   borderless: true,
   select: true,
   on: {
      onAfterSelect: function (id) {
         const view = $$(id);
         if (view) view.show();
      }
   }
};

const connected = {
   view: "label",
   align: "center",
   label: "<span class='webix_icon wxi wxi-check'></span>Connected",
   css: "connect_label",
}

let side = {
   css: "sidebar",
   rows: [
      sidebar,
      connected
   ]
};

const main = {
   cells: [
      { id: "Dashboard", cols: [dashboard, form] },
      { id: "Users", rows: [filter, list, chart] },
      { id: "Products", rows: [treetable] },
      { id: "Locations", rows: [{}] }
   ]
}

const row1 = {
   view: "toolbar",
   css: "webix_dark",
   paddingX: 10,
   cols: [
      label,
      btn
   ]
};

const row2 = {
   cols: [
      side,
      { view: "resizer" },
      main
   ]
};

const row3 = {
   template: `<div class="copyright"> The software is provided by <a href="https://webix.com/" target="_blank">webix.com.</a> All rights are reserved. (c) </div>`,
   align: "center",
   height: 30
}

webix.ui({
   view: "popup",
   id: "my_pop",

   width: 300,
   body: {
      view: "list",
      data: [
         { id: "1", name: "Settings" },
         { id: "2", name: "Log Out" },
      ],
      template: "#name#",
      autoheight: true,
      select: true
   }
});

webix.ui({
   rows: [
      row1,
      row2,
      row3
   ],
});

$$('input_list').attachEvent("onTimedKeyPress", function () {
   let value = this.getValue().toLowerCase();
   $$("list").filter(function (obj) {
      return obj.name.toLowerCase().indexOf(value) !== -1;
   })
});

$$("mylist").select("Dashboard");

$$('myform').bind($$('mydata'))


$$("mydata").registerFilter(
   $$("selector"),
   {
      columnId: "year",
      compare: function (value, filter, item) {

         if (filter == 4) {
            return value >= 2010;
         }
         else if (filter == 3) {
            return value >= 2000
         }
         else if (filter == 2) {
            return value < 2000
         }
         else return value;
      }
   },
   {
      getValue: function (node) { return node.getValue(); },
      setValue: function (node, value) { node.setValue(value); }
   }
);

$$("chart").sync($$("list"), function () {
   $$("chart").group({
      by: "country",
      map: {
         name: ["name", "count"]
      }
   });
});

