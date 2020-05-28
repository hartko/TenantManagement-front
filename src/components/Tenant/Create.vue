<template lang="html">
    <div class="">
        <b-container>
            <!-- start breadcrumb -->
            <b-breadcrumb>
                <b-breadcrumb-item @click="index()" >

                    Tenant
                </b-breadcrumb-item>
                <b-breadcrumb-item active>Create</b-breadcrumb-item>

            </b-breadcrumb>
            <!-- end breadcrumb -->
            <!-- Start of Create new tenant form -->
            <b-card>
                <b-row>
                    <b-col cols="6">
                        <h5 class="text-left pb-3">Add Tenant</h5>
                    </b-col>
                    <b-col cols="6" class="text-right">
                        <b-button v-if="loading == false" type="submit" variant="success" @click="saveTenant()">
                            Submit
                        </b-button>

                        <b-spinner v-else label="Loading..." variant="success"></b-spinner>
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
                        <b-form-input v-model="tenant.company_name"  type="text"placeholder="Enter Company Name" required></b-form-input>
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

                    <b-col cols="6" class="pb-4">
                        <label for="">Email</label>
                        <b-form-input v-model="tenant.email" type="text"placeholder="Enter Email"></b-form-input>
                    </b-col>
                    <b-col cols="6" class="pb-4">
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
                    <b-col cols="4" class="pb-4">
                        <label for="">Password</label>
                        <b-form-input v-model="tenant.password" type="password"placeholder="Enter Password"></b-form-input>
                    </b-col>

                    <b-col cols="4" class="pb-4">
                        <label for="">Confirm Password</label>
                        <b-form-input v-model="tenant.confirm_password" type="password"placeholder="Confirm Password"></b-form-input>
                    </b-col>


                </b-row>


            </b-card>
            <!-- End of Create new tenant form -->
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
            tenant:{},
            confirm_password:'',
            request_status:null,
            request_msg:'',
            loading: false,

        }
    },
    methods:{

        index(){

            this.$router.push({name:'Index'})
        },

        /**
        * method for adding tenant
        */
        async saveTenant(){
            this.request_status = null
            this.request_msg = ''
            this.loading = true;
            this.tenant.database =  "mongodb://localhost:27017/Tenant";
            this.tenant.model =  "tenants";
            //add new tenat/ save tenant details
            var addTenantData =  await TenantApi.addTenant(this.tenant)
            // if adding tenant details is success, create collection for new tenant
            if(addTenantData.data.status == 'success'){
                this.tenant.tenant_id = addTenantData.data.tenant_id
                this.tenant.model =  addTenantData.data.tenant_id+ '_users';

                this.tenant.database =  "mongodb://localhost:27017/free_db";
                // create collection request
                var addCollection = await TenantApi.addTenantDB(this.tenant);

                // for alert porpuses
                if(addCollection.data.status == 'success'){

                    this.request_status = true;
                    this.request_msg = addCollection.data.message
                    this.loading = false;


                }else{

                    this.request_status = false;
                    this.request_msg = addCollection.data.message
                    this.loading = false;

                }

            }else{
                // if validation fails

                this.request_status = false;
                this.request_msg = addTenantData.data.message
                this.loading = false;

            }






        }
    }
}
</script>

<style lang="css" scoped>
</style>
