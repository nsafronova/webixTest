const filter = {
   view: "toolbar",
   rows: [
      {
         cols: [
            { view: "text", id: "input_list" },
            {
               view: "button", autowidth: true, value: "Sort asc", css: 'webix_primary', click: function () {
                  $$('list').sort('#name#', "asc", "string")
               }
            },
            {
               view: "button", autowidth: true, value: "Sort desc", css: 'webix_primary', click: function () {
                  $$('list').sort('#name#', "desc", "string")
               }
            }


         ]
      }

   ],

}
const list = {
   id: "list",
   view: 'list',
   url: './test_data/usersdata.js',
   content: "textFilter",
   template: '#name# from #country# <span class="removeBtn webix_icon wxi wxi-close"></span>',
   select: true,
   onClick: {
      removeBtn: function (e, id) {
         this.remove(id);
         return false;
      }
   },
   ready: function () {
      for (let i = 0; i <= 4; i++) {
         let a = $$('list').getIdByIndex(i)
         $$('list').addCss(a, "color_row")
      }
   }
}

const chart = {
   view: "chart",
   type: "bar",
   url: './test_data/usersdata.js',
   value: '#age#',
   label: '#age#',
   barWidth: 35,
   radius: 0
}

export { filter, list, chart }