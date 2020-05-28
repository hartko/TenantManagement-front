import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

/*Start Tenant components */
import Index from '@/components/Tenant/Index'
import Show from '@/components/Tenant/Show'
import Update from '@/components/Tenant/Update'
import Create from '@/components/Tenant/Create'
/*End Tenant components */

Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [

        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/Show/:tenant_id',
            name: 'Show',
            component: Show
        },
        {
            path: '/Index',
            name: 'Index',
            component: Index
        },
        {
            path: '/Update/:tenant_id',
            name: 'Update',
            component: Update
        },
        {
            path: '/Create',
            name: 'Create',
            component: Create
        },


    ]
})
