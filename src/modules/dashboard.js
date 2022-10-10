const datatable = {
   id: "mydata",
   view: "datatable",
   url: "./test_data/data.js",
   autoConfig: true,
   scroll: 'auto',
   editable: true,
   hover: "myhover",
   columns: [
      { id: "rank", header: "", css: "rank", width: 40, sort: "int" },
      { id: "title", header: ["Film title", { content: "textFilter" }], fillspace: true, sort: "string" },
      { id: "year", header: ["Released", { content: "textFilter" }], width: 80, sort: "int", tooltip: "" },
      { id: "votes", header: ["Votes", { content: "textFilter" }], width: 80, sort: "int", tooltip: "" },
      {
         view: "button", template: "{common.trashIcon()}", width: 50
      }

   ],
   onClick: {
      "wxi-trash": function (e, id) {
         this.remove(id);
         return false;
      }
   }
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
               view: "button", value: "Add new", css: 'webix_primary', click: function () {
                  if ($$("myform").validate()) {
                     let item = $$("myform").getValues();
                     $$("mydata").add(item);
                     webix.message({ type: 'success', text: "Database updated", expire: 1000 })
                  }
               }
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
   }
};

export { datatable, form }