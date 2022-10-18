import { ids, collectionCategories } from '../helpers.js'

const categoriesTable = {
   id: ids.adminTable,
   view: 'datatable',
   data: collectionCategories,
   scroll: 'y',
   select: true,
   editable: true,
   hover: 'myhover',
   columns: [
      { id: 'value', view: 'richselect', header: 'Category', editor: 'text', fillspace: true },
      {
         view: 'button', template: '{common.trashIcon()}'
      }

   ],
   onClick: {
      'wxi-trash': function (e, id) {
         collectionCategories.remove(id);
         return false;
      }
   },
}

const adminForm = {
   view: 'form',
   id: ids.adminForm,
   cols: [
      { view: 'text', name: 'value' },
      {
         view: 'toolbar', cols: [
            {
               view: 'button', value: 'Add category', width: 300, invalidMessage: 'Category is empty', click: function () {
                  const form = $$(ids.adminForm);
                  const values = form.getValues();
                  if (form.validate())
                     collectionCategories.add({
                        value: values.value
                     });
                  form.clear()
               }
            },
         ]
      },
   ],
   rules: {
      value: webix.rules.isNotEmpty
   }
}

const admin = {
   rows: [
      adminForm,
      categoriesTable
   ]
}


export { categoriesTable, admin }