const segment = {
   rows: [
      {
         view: "segmented", id: "selector", inputWidth: 300,
         options: [
            { id: 1, value: "All" },
            { id: 2, value: "Old" },
            { id: 3, value: "Modern" },
            { id: 4, value: "New" }
         ],
         on: {
            onChange: function () {
               $$("mydata").filterByAll();
            }
         },
      }
   ]

}

const datatable = {
   id: "mydata",
   view: "datatable",
   url: "./test_data/data.js",
   scroll: 'y',
   select: 'cell',
   hover: "myhover",
   columns: [
      { id: "rank", header: "#", css: "rank", width: 40, sort: "int" },
      { id: "title", header: ["Film title", { content: "textFilter" }], fillspace: true, sort: "string" },
      { id: "cat_id", header: ["Category", { content: "selectFilter" }], editor: "select", options: './test_data/categories.js', width: 80 },
      { id: 'rating', header: ["Rating", { content: "textFilter" }], sort: "string", width: 80 },
      { id: "votes", header: ["Votes", { content: "textFilter" }], width: 80, sort: "int", tooltip: "" },
      { id: "year", header: 'Year', width: 80, tooltip: "" },
      {
         view: "button", template: "{common.trashIcon()}", width: 40
      }

   ],
   onClick: {
      "wxi-trash": function (e, id) {
         this.remove(id);
         return false;
      }
   },
   on: {
      onAfterSelect: valuesToForm
   }

}

let dashboard = {
   rows: [
      segment,
      datatable
   ]
}

const form = {
   view: "form",
   id: "myform",
   width: 300,
   elements: [
      {
         view: "fieldset", label: "Edit films",
         body: {
            rows: [
               { view: "text", label: "Title", name: 'title', invalidMessage: 'Title is empty' },
               { view: "text", label: "Year", name: 'year', invalidMessage: 'Incorrect year' },
               { view: "text", label: "Rating", name: 'rating', invalidMessage: 'Rating is empty' },
               { view: "text", label: "Votes", name: 'votes', invalidMessage: 'Incorrect votes' }
            ]
         }
      },
      {
         cols: [
            {
               view: "button", value: "Save", css: 'webix_primary', click: saveItem
            },
            {
               view: "button", value: "Clear", click: function () {
                  webix.confirm({
                     title: "Warning!",
                     type: "confirm-warning",
                     text: "You are about to agree. Are you sure?"
                  })
                     .then(function () {
                        $$('myform').clear()
                        $$("myform").clearValidation();
                     })
                     .fail(function () {
                        webix.message("Cleanup canceled.");
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

function saveItem() {
   var form = $$("myform");
   var list = $$("mydata");
   var item_data = form.getValues();
   if (item_data.id) {
      list.updateItem(item_data.id, item_data);
   } else {
      list.add(item_data);
   }
};

function valuesToForm(id) {
   var values = $$("mydata").getItem(id);
   $$("myform").setValues(values)
};

export { dashboard, form }