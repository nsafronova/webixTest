import { ids } from './../helpers.js'
import { countries, names } from '../../test_data/countries.js'

const filter = {
   view: 'toolbar',
   rows: [
      {
         cols: [
            { view: 'text', id: ids.usersInputList },
            {
               view: 'button', autowidth: true, value: 'Sort asc', css: 'webix_primary', click: function () {
                  $$(ids.usersList).sort('#name#', 'asc', 'string')
               }
            },
            {
               view: 'button', autowidth: true, value: 'Sort desc', css: 'webix_primary', click: function () {
                  $$(ids.usersList).sort('#name#', 'desc', 'string')
               }
            },
            {
               view: 'button', autowidth: true, value: 'Add new', css: 'webix_primary',
               click: function () {
                  let userObj = {
                     'name': getRandomValue(names),
                     'age': Math.floor(Math.random() * 80) + 10,
                     'country': getRandomValue(countries)
                  }
                  $$(ids.usersList).add(userObj)
               }
            }

         ]
      }

   ],

}

function getRandomValue(array) {
   const randomIndex = Math.floor(Math.random() * array.length);
   let item = array[randomIndex];
   item = item.value
   return item;
}

webix.protoUI({
   name: 'editlist',
}, webix.EditAbility, webix.ui.list);

const list = {
   view: 'editlist',
   id: ids.usersList,
   template: '#name#, #age# from #country# <span class="removeBtn webix_icon wxi wxi-close"></span>',
   editable: true,
   editor: 'text',
   editValue: 'name',
   editaction: 'dblclick',
   url: './test_data/usersdata.js',
   content: 'textFilter',

   select: true,
   onClick: {
      removeBtn: function (e, id) {
         this.remove(id);
         return false;
      }
   },
   rules: {
      name: webix.rules.isNotEmpty,
   },
   scheme: {
      $init: function (obj) {
         if (obj.age < 26)
            obj.$css = 'highlight';
      },
   }
}

const chart = {
   id: ids.usersChart,
   view: 'chart',
   type: 'bar',
   value: '#name#',
   xAxis: {
      template: '#country#'
   },
   yAxis: {
   },
   barWidth: 35,
   radius: 0
}

export { filter, list, chart }