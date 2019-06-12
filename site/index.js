import 'babel-polyfill';
import Vue from 'vue';
import App from './app';
// import TreeSelect from '../components/tree-select/index.jsx';
// import '../components/tree-select/style/index';
// import Radio from '../components/radio/index';
// import '../components/radio/style/index.less';

import Table from '../components/table/index';
import '../components/table/style/index.less';
import '../components/pagination/style/index.less';

// import TreeSelect from '../es/tree-select/index.js';
// import '../es/tree-select/style/index';
// import Radio from '../es/radio/index';
// import '../es/radio/style/index.less';

// Vue.use(TreeSelect);
// Vue.use(Radio);
Vue.use(Table);

new Vue({
  render: h => h(App),
}).$mount('#app');
