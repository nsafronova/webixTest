const treetable = {
   view: 'treetable',
   editable: true,
   url: './test_data/productsdata.js',

   columns: [
      { id: 'id', header: '', css: { 'text-align': 'right' }, width: 50 },
      {
         id: 'title', header: 'Title', fillspace: true, editor: 'text',
         template: '{common.treetable()} #title#'
      },
      { id: 'price', header: 'Price', editor: 'text', width: 400 }
   ],
   select: 'cell',
   rules: {
      title: webix.rules.isNotEmpty,
      price: webix.rules.isNumber
   },

   ready: function () {
      this.openAll()
   },

}

export { treetable }