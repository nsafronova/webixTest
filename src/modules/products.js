const treetable = {
   id: "mytreetable",
   view: "treetable",
   url: './test_data/productsdata.js',
   columns: [
      { id: "id", header: "", css: { "text-align": "right" }, width: 50 },
      {
         id: "title", header: "Title", fillspace: true,
         template: "{common.treetable()} #title#"
      },
      { id: "price", header: "Price", width: 400 }
   ],
   select: "cell",
   ready: function () {
      this.openAll()
   }
}

export { treetable }