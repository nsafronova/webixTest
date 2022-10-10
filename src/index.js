// import products from '/src/modules/products'
// import dashboard from './modules/dashboard'
// import users from './modules/users'


const label = {
   view: "label",
   label: "My App",
};

const btn = {
   view: "button",
   type: "icon", icon: "wxi-user", label: "Profile",
   width: 100,
   css: 'webix_transparent',
   popup: 'my_pop'
}

let sidebar = {
   minHeight: 300,
   id: "mylist",
   css: "sidebar",
   view: "sidebar",
   width: 200,
   scroll: false,
   data: ["Dashboard", "Users", "Products", "Locations"],
   borderless: true,
   on: {
      onAfterSelect: function (id) {
         $$(id).show();
      }
   }
};

const connected = {
   view: "label",
   align: "center",
   label: "<span class='webix_icon wxi wxi-check'></span>Connected",
   css: "connect_label",
}

let side = {
   css: "sidebar",
   rows: [
      sidebar,
      connected
   ]
};

//dashboard stuff

let datatable = {
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

let form = {
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

//users stuff

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
         console.log(a);
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
   radius: 0,
}

//products stuff

const treetable = {
   id: "mytreetable",
   view: "treetable",
   url: './test_data/productsdata.js',
   columns: [
      { id: "id", header: "", css: { "text-align": "right" }, width: 50 },
      {
         id: "title", header: "Title", width: 1000,
         template: "{common.treetable()} #title#"
      },
      { id: "price", header: "Price", width: 400 }
   ],
   autoheight: true,
   autowidth: true,
   select: "cell",
   ready: function () {
      $$("mytreetable").openAll()
   }
}

////

const main = {
   cells: [
      { id: "Dashboard", cols: [datatable, form] },
      { id: "Users", rows: [filter, list, chart] },
      { id: "Products", rows: [treetable] },
      { id: "Locations", rows: [{}] }
   ]
}

const row1 = {
   view: "toolbar",
   css: "webix_dark",
   paddingX: 10,
   cols: [
      label,
      btn
   ]
};

const row2 = {
   cols: [
      side,
      { view: "resizer" },
      main
   ]
};

const row3 = {
   template: `<div class="copyright"> The software is provided by <a href="https://webix.com/" target="_blank">webix.com.</a> All rights are reserved. (c) </div>`,
   align: "center",
   height: 30
}

// products()
// dashboard()
// users()