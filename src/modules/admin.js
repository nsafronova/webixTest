import { ids, collectionCategories } from "../helpers.js"
// import


const categoriesTable = {
   id: ids.adminTable,
   view: 'datatable',
   scroll: 'y',
   select: true,
   editable: true,
   hover: 'myhover',
   // data: collectionCategories,
   columns: [
      { id: 'value', view: 'richselect', header: 'Category', editor: "text" },
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
      {
         view: 'text', id: 'categoryFilm'
      },
      {
         view: "toolbar", cols: [
            {
               view: "button", value: "Add category", click: function () {
                  collectionCategories.add(categoryFilm.value)
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