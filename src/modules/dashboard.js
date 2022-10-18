import { categories } from '../../test_data/categories.js';
import { ids, getRandomItem, collectionCategories } from './../helpers.js'
const segment = {
   rows: [
      {
         view: 'segmented', id: ids.dashboardSelector, inputWidth: 300,
         options: [
            { id: 1, value: 'All' },
            { id: 2, value: 'Old' },
            { id: 3, value: 'Modern' },
            { id: 4, value: 'New' }
         ],
         on: {
            onChange: function () {
               $$(ids.dashboardTable).filterByAll();
            }
         },
      }
   ]

}

const datatable = {
   id: ids.dashboardTable,
   view: 'datatable',
   url: './test_data/data.js',
   scroll: 'y',
   select: true,
   hover: 'myhover',
   columns: [
      { id: 'rank', header: '#', css: 'rank', width: 40, sort: 'int' },
      { id: 'title', header: ['Film title', { content: 'textFilter' }], fillspace: true, sort: 'string' },

      { id: 'categoryId', header: ['Category', { content: 'selectFilter' }], editor: 'select', collection: collectionCategories, width: 80 },
      { id: 'rating', header: ['Rating', { content: 'textFilter' }], sort: 'string', width: 80 },
      { id: 'votes', header: ['Votes', { content: 'textFilter' }], width: 80, sort: 'int', tooltip: '' },
      { id: 'year', header: 'Year', width: 80, tooltip: '' },
      {
         view: 'button', template: '{common.trashIcon()}', width: 40
      }

   ],
   onClick: {
      'wxi-trash': function (e, id) {
         this.remove(id);
         return false;
      }
   },
   scheme: {
      $init: function (obj) {
         const category = getRandomItem(categories);
         obj.categoryId = category.id
      }
   }
}


let dashboard = {
   rows: [
      segment,
      datatable
   ]
}

const form = {
   view: 'form',
   id: ids.dashboardForm,
   width: 300,
   elements: [
      {
         view: 'fieldset', label: 'Edit films',
         body: {
            rows: [
               { view: 'text', label: 'Title', name: 'title', invalidMessage: 'Title is empty' },

               { view: 'text', label: 'Year', name: 'year', invalidMessage: 'Incorrect year' },
               { view: 'text', label: 'Rating', name: 'rating', invalidMessage: 'Rating is empty' },
               { view: 'text', label: 'Votes', name: 'votes', invalidMessage: 'Incorrect votes' },
               {
                  view: 'richselect',
                  label: 'Category', name: 'categoryId',
                  value: 1, options: collectionCategories
               }
            ]
         }
      },
      {
         cols: [
            {
               view: 'button', value: 'Save', css: 'webix_primary', click: save_form

            },
            {
               view: 'button', value: 'Clear', click: function () {
                  webix.confirm({
                     title: 'Warning!',
                     type: 'confirm-warning',
                     text: 'You are about to agree. Are you sure?'
                  })
                     .then(function () {
                        $$(ids.dashboardForm).clear()
                        $$(ids.dashboardForm).clearValidation();
                        $$(ids.dashboardTable).clearSelection();
                     })
                     .fail(function () {
                        webix.message('Cleanup canceled.');
                     })

               }
            }
         ],
      },
      {}
   ],
   rules: {
      title: webix.rules.isNotEmpty,
      year: function (value) {

         return value > 1970 && value < 2022;
      },
      votes: function (value) {

         return value < 100000;
      },
      rating: webix.rules.isNotEmpty && function (value) {
         return value > 0;
      }
   },
};


function save_form() {
   const form = $$(ids.dashboardForm);
   if (form.isDirty() && form.validate())
      form.save()
};

export { dashboard, form }