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

}

function getRandomItem(array) {
   const randomIndex = Math.floor(Math.random() * array.length);
   let item = array[randomIndex];
   return item;
}

export { ids, getRandomItem }