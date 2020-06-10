<template lang="html">
    <div class="">
        <b-container>
            <!-- start breadcrumb -->
            <b-breadcrumb>
                <b-breadcrumb-item @click="index()" >
                    <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true" active=false></b-icon>
                    Tenant
                </b-breadcrumb-item>
                <b-breadcrumb-item active>Edit</b-breadcrumb-item>
            </b-breadcrumb>
            <!-- end breadcrumb -->
            <!-- Start of Create new tenant form -->
            <b-card>
                <b-row>
                    <b-col cols="6">
                        <h5 class="text-left pb-3">Update Tenant <b-spinner small v-if="loading == true" label="Loading..." variant="secondary"></b-spinner></h5>
                    </b-col>
                    <b-col cols="6" class="text-right">
                        <b-button  variant="success" @click="updateTenant()">
                            Save
                        </b-button>
                    </b-col>
                </b-row>

                <b-row class="p-3">

                    <b-col cols="12" class="pb-4">
                        <b-alert show variant="success"  v-if="request_status == true">
                            {{request_msg}}
                        </b-alert>
                        <b-alert show variant="danger"  v-show ="request_status == false ">
                            <ul id="example-1">
                                <li v-for="error in request_msg" :key="error.msg">
                                    {{ error.msg }}
                                </li>
                            </ul>
                        </b-alert>

                    </b-col>


                    <b-col cols="12" class="pb-4">

                        <label for="">Company Name</label>
                        <b-form-input v-model="tenant.company_name" type="text"placeholder="Enter Company Name" required></b-form-input>
                    </b-col>
                    <b-col cols="4" class="pb-4">
                        <label for="">Firstname</label>
                        <b-form-input v-model="tenant.first_name" type="text"placeholder="Enter Firstname"></b-form-input>
                    </b-col>
                    <b-col cols="4" class="pb-4">
                        <label for="">Middlename</label>
                        <b-form-input v-model="tenant.middle_name" type="text"placeholder="Enter Middlename"></b-form-input>
                    </b-col>
                    <b-col cols="4" class="pb-4">
                        <label for="">Lastname</label>
                        <b-form-input v-model="tenant.last_name" type="text"placeholder="Enter Lastname"></b-form-input>
                    </b-col>

                    <b-col cols="4" class="pb-4">
                        <label for="">Email</label>
                        <b-form-input v-model="tenant.email" type="text"placeholder="Enter Email"></b-form-input>
                    </b-col>
                    <b-col cols="4" class="pb-4">
                        <label for="">Company Link</label>
                        <b-form-input v-model="tenant.link" type="text"placeholder="Enter Link"></b-form-input>
                    </b-col>

                    <b-col cols="4" class="pb-4">
                        <label for="">Account Type</label>
                        <b-form-select v-model="tenant.account_type" class="mb-3" >
                            <b-form-select-option :value="null" disabled>Please select an option</b-form-select-option>
                            <b-form-select-option value="free">Free</b-form-select-option>
                            <b-form-select-option value="standard" >Standard</b-form-select-option>
                            <b-form-select-option value="premium" >Premium</b-form-select-option>

                        </b-form-select>
                    </b-col>



                </b-row>


            </b-card>
            <br>
            <br>
            <br>
            <!-- End of Create new tenant form -->

        </b-container>

    </div>

</template>

<script>
import TenantApi from '@/backend/TenantApi'
export default {
    data() {
        return {
            tenant:'',
            request_status:null,
            request_msg:'',
            loading: false,


        }
    },

    created(){
        this.getTenant()
    },
    methods:{

        index(){

            this.$router.push({name:'Index'})

        },
        async getTenant(){

            var tenant = await TenantApi.getTenant({
                tenant_id: this.$route.params.tenant_id
            })

            this.tenant = tenant.data.message;
        },

        async updateTenant(){
            this.request_status = null
            this.request_msg = ''
            this.loading = true;
            var tenant = await TenantApi.updateTenant(this.tenant);

            if(tenant.data.status == 'success'){

                this.request_status = true;
                this.request_msg = tenant.data.message
                this.loading = false;

            }else{

                this.request_status = false;
                this.request_msg = tenant.data.message
                this.loading = false;

            }


        },
    }
}
</script>

<style lang="css" scoped>
</style>
