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
            },
            {
               view: 'button', autowidth: true, value: "Add new", css: 'webix_primary',
               // click: function () {
               //    $$("list").add({ title: "New film" })
               // }
            }

         ]
      }

   ],

}
webix.protoUI({
   name: 'editlist',
}, webix.EditAbility, webix.ui.list);

const list = {
   view: 'editlist',
   id: 'list',
   template: '#name#, #age# from #country# <span class="removeBtn webix_icon wxi wxi-close"></span>',
   editable: true,
   editor: "text",
   editValue: "name",
   editaction: "dblclick",
   url: './test_data/usersdata.js',
   content: "textFilter",

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
            obj.$css = "highlight";
      },
   }
}

const chart = {
   id: 'chart',
   view: "chart",
   type: "bar",
   url: './test_data/usersdata.js',
   value: '#name#',
   xAxis: {
      template: "#country#"
   },
   yAxis: {
   },
   barWidth: 35,
   radius: 0,
   ready: function () {
      $$("chart").group({
         by: "country",
         map: {
            name: ["name", "count"]
         }
      });
   }
}

export { filter, list, chart }