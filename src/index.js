import { ids } from './helpers.js'
import { dashboard, form } from './modules/dashboard.js'
import { treetable } from './modules/products.js'
import { filter, list, chart } from './modules/users.js'
import { countries, names } from './../test_data/countries.js'


const label = {
   view: 'label',
   label: 'My App',
};

const btn = {
   view: 'button',
   type: 'icon', icon: 'wxi-user', label: 'Profile',
   width: 100,
   css: 'webix_transparent',
   popup: ids.headerPopup
}

const sidebar = {
   minHeight: 300,
   id: ids.sidebarList,
   css: 'sidebar',
   view: 'sidebar',
   width: 200,
   scroll: false,
   data: [ids.multiviewDashboard, ids.multiviewUsers, ids.multiviewProducts, ids.multiviewAdmin],
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
   view: 'label',
   align: 'center',
   label: '<span class="webix_icon wxi wxi- check"></span>Connected',
   css: 'connect_label',
}

let side = {
   css: 'sidebar',
   rows: [
      sidebar,
      connected
   ]
};

const main = {
   cells: [
      { id: ids.multiviewDashboard, cols: [dashboard, form] },
      { id: ids.multiviewUsers, rows: [filter, list, chart] },
      { id: ids.multiviewProducts, rows: [treetable] },
      { id: ids.multiviewAdmin, rows: [{}] }
   ]
}

const row1 = {
   view: 'toolbar',
   css: 'webix_dark',
   paddingX: 10,
   cols: [
      label,
      btn
   ]
};

const row2 = {
   cols: [
      side,
      { view: 'resizer' },
      main
   ]
};

const row3 = {
   template: `<div class='copyright'> The software is provided by <a href='https://webix.com/' target='_blank'>webix.com.</a> All rights are reserved. (c) </div>`,
   align: 'center',
   height: 30
}

webix.ui({
   view: 'popup',
   id: ids.headerPopup,

   width: 300,
   body: {
      view: 'list',
      data: [
         { id: '1', name: 'Settings' },
         { id: '2', name: 'Log Out' },
      ],
      template: '#name#',
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

$$(ids.usersInputList).attachEvent('onTimedKeyPress', function () {
   let value = this.getValue().toLowerCase();
   $$(ids.sidebarList).filter(function (obj) {
      return obj.name.toLowerCase().indexOf(value) !== -1;
   })
});

$$(ids.sidebarList).select(ids.multiviewDashboard);

$$(ids.dashboardForm).bind($$(ids.dashboardTable))


$$(ids.dashboardTable).registerFilter(
   $$(ids.dashboardSelector),
   {
      columnId: 'year',
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

$$(ids.usersChart).sync($$(ids.usersList), function () {
   $$(ids.usersChart).group({
      by: 'country',
      map: {
         name: ['name', 'count']
      }
   });
});




