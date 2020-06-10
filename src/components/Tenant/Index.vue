<template lang="html">

    <div class="">

        <b-container>
            <b-card >

                <b-row>
                    <b-col cols="6">
                        <h5 class="text-left pb-3">Tenant <b-spinner small v-if="loading == true" label="Loading..." variant="secondary"></b-spinner></h5>

                    </b-col>
                    <b-col cols="6" class="text-right">
                        <b-button  variant="primary" @click="create()" :disabled="loading == true">
                            Add Tenant
                        </b-button>
                    </b-col>
                </b-row>
                <!-- start of Tenant Table -->

                <div class="p-3" v-if="loading == false">
                    <b-table-simple    responsive :per-page="perPage"
      :current-page="currentPage">


                        <b-thead class="text-center" >

                            <b-tr>
                                <b-th>ID</b-th>
                                <b-th>Name</b-th>
                                <b-th>Link</b-th>
                                <b-th>Account Type</b-th>
                                <b-th  >Actions</b-th>

                            </b-tr>
                        </b-thead>
                        <b-tbody class="text-center">
                            <b-tr v-for="(tenant,index) in tenants" :key="index">
                                <b-th>{{tenant.tenant_id}}</b-th>
                                <b-th>{{tenant.company_name}}</b-th>
                                <b-td>{{tenant.link}}</b-td>
                                <b-td>{{tenant.account_type}}</b-td>
                                <b-td class="text-center" >
                                    <b-button  variant="primary" size="sm" @click="show(tenant.tenant_id)">
                                        show
                                    </b-button>
                                    <b-button  variant="warning" size="sm" @click="edit(tenant.tenant_id)">
                                        edit
                                    </b-button>
                                    <b-button  variant="danger" size="sm" href="">
                                        delete
                                    </b-button>


                                </b-td>


                            </b-tr>


                        </b-tbody>
                        <b-tfoot>
                            <b-tr>
                                <b-td colspan="7"class="text-right">

                                </b-td>
                            </b-tr>
                        </b-tfoot>
                    </b-table-simple>
                    <b-pagination
                    v-model="currentPage"
                    :total-rows="totalPage"
                    :per-page="perPage"
                    aria-controls="my-table"
                    ></b-pagination>
                </div>

                <div v-else>
                    Loading please wait ...
                </div>
                <!-- end of teant table -->

            </b-card>
            <br>
            <br>
            <br>
        </b-container>

    </div>

</template>

<script>
import TenantApi from '@/backend/TenantApi'
export default {
    data() {
        return {
            tenants:'',
            tenant:'',
            loading: false,
            perPage: 1,
            currentPage: 1,
            totalPage:0,

        }


    },

    created(){
        this.getTenants()
    },
    methods:{

        create(){

            this.$router.push({name:'Create'})
        },
        show(tenant_id){

            this.$router.push({path:'/Show/' +tenant_id})
        },
        edit(tenant_id){

            this.$router.push({path:'/Update/' +tenant_id})
        },

        async getTenants(){

            this.loading = true;

            let params = {

                database: "mongodb://localhost:27017/Tenant",
                model: "tenants",
                currenPage: this.currentPage,
                show: this.perPage,
            }
            //add new tenat/ save tenant details
            var tenants =  await TenantApi.fetchTenant(params)
            if(tenants.data.status == 'success'){
                this.tenants = tenants.data.message.tenants;
                var pagination = JSON.parse(tenants.data.message.pagination);

                this.currentPage = pagination.currentPage;
                this.totalPage = pagination.totalPage;
                this.nextPage = pagination.nextPage;
                this.previousPage = pagination.previousPage;

                this.loading = false;
            }



        }
    }
}
</script>

<style lang="css" scoped>
</style>
