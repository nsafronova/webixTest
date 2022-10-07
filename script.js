let label = { 
    view:"label", 
    label: "My App", 
  };
  
  let btn = {
    view:"button",
    type:"icon", icon:"wxi-user", label:"Profile",
    width:100,
    css: 'webix_transparent'
  }
  
  let row1 = { 
    view: "toolbar",
    css: "webix_dark",
    paddingX: 10,
    cols:[ 
      label,
      btn
    ]
  };
  
  let sidebar = {
    minHeight: 300,
    css: "sidebar",
    view:"sidebar",
    width:200,
    minHeight: 260,
    scroll:false,
    data:[ "Dashboard", "Users", "Products", "Locations" ],
    borderless: true,
  }
  
  let connected = {
    view:"label", 
    align: "center",
    label:"<span class='webix_icon wxi wxi-check'></span>Connected", 
    css: "connect_label",
  }
  
  let side = {
    css: "sidebar",
    rows:[
      sidebar,
      connected
    ]
  };
  
  let database = {
    view:"datatable",
    data: small_film_set,
    autoConfig:true,
    // autoheight:true,
  }
  
  
  let form = {
    view:"form",
    width: 280,
    elements:[
      { view:"fieldset", label:"Edit films", body:{
        rows:[
          { view:"text", label:"Title"},
          { view:"text", label:"Year"},
          { view:"text", label:"Rating"},
          { view:"text", label:"Votes"}
        ]
      }},
      { cols:[
        { view:"button", label:"Add new" , type:"form", css: 'webix_primary'},
        { view:"button", label:"Clear" }
      ]},
      {}
    ]
  }
  
  let row2 = { 
    cols:[ 
      side,
      { view:"resizer"},
      database,
      form
    ]
  };
  
  let row3 = {
    template:`<div class="copyright"> The software is provided by <a href="https://webix.com/" target="_blank">webix.com.</a> All rights are reserved. (c) </div>`,
    align:"center",
    height: 30
  }
  
  webix.ui({
    rows:[
      row1,
      row2,
      row3
    ]
  });