import { ids, collectionCategories } from '../helpers.js'

const categoriesTable = {
   id: ids.adminTable,
   view: 'datatable',
   scroll: 'y',
   select: true,
   editable: true,
   hover: 'myhover',
   columns: [
      { id: 'value', view: 'richselect', header: 'Category', editor: 'text' },
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
   rows: [
      { view: 'text', name: 'value' },
      {
         view: 'toolbar', cols: [
            {
               view: 'button', value: 'Add category', click: function () {
                  const form = $$(ids.adminForm);
                  const values = form.getValues();
                  console.log(values);
                  collectionCategories.add({
                     value: values.value
                  });
                  $$(ids.adminForm).clear()
               }
            },
         ]
      },
   ]
}

const admin = {
   rows: [
      adminForm,
      categoriesTable
   ]
}


export { categoriesTable, admin }