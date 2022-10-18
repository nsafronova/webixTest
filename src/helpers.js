import { categories } from "../test_data/categories.js";
import { users } from "../test_data/usersdata.js";

const ids = {
   multiviewDashboard: 'Dashboard',
   multiviewUsers: 'Users',
   multiviewProducts: 'Products',
   multiviewAdmin: 'Admin',
   headerPopup: 'popup',
   sidebarList: 'list',
   dashboardTable: 'datatable',
   dashboardForm: 'form',
   dashboardSelector: 'selector',
   usersList: 'editlist',
   usersInputList: 'text',
   usersChart: 'chart',
   adminTable: 'categoriesTable',
   adminForm: 'formAdmin'

}

function getRandomItem(array) {
   const randomIndex = Math.floor(Math.random() * array.length);
   let item = array[randomIndex];
   return item;
}

const collectionCategories = new webix.DataCollection({
   data: categories
});

const collectionUsers = new webix.DataCollection({
   data: users
});



export { ids, getRandomItem, collectionCategories, collectionUsers }