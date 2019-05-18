import Vue from 'vue';
import App from './app.vue';

const root = document.createElement('div')
document.body.appendChild(root)

//mount就是讲我们的App挂载到root这样一个根节点中去
new Vue({
    render: (h) => h(App)
}).$mount(root)