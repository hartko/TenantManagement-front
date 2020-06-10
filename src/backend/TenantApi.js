import Api from '@/backend/Api'

export default {
    fetchTenant (params) {
        return Api().get('tenant/' + params.currenPage + '/' + params.show )
    },

    addTenant (params) {
        return Api().post('tenant', params)
    },
    addTenantDB (params) {
        return Api().post('tenant-db', params)
    },
    updateTenant (params) {
        return Api().put('tenant/' + params.tenant_id, params)
    },

    getTenant (params) {
        return Api().get('tenant/' + params.tenant_id)
    },

    deleteTenant (id) {
        return Api().delete('tenant/' + id)
    }
}
