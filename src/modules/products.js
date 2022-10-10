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

export { treetable }