<template lang="html">
    <div class="">
        <b-container>
            <!-- start breadcrumb -->
            <b-breadcrumb>
                <b-breadcrumb-item @click="index()" >

                    Tenant
                </b-breadcrumb-item>
                <b-breadcrumb-item active>Show</b-breadcrumb-item>

            </b-breadcrumb>
            <!-- end breadcrumb -->
            <b-row class="p-3">

                <!-- start of Company details card -->
                <b-col cols='12'>
                    <b-card>
                        <b-row >
                            <b-col cols='5' class="text-center pb-3">
                                <b-img center rounded="circle"  src="https://picsum.photos/200/200/?image=58" alt="Center image"></b-img>
                            </b-col>

                            <b-col cols='7'>
                                <b-row >
                                    <b-col cols='12' class="pb-3">
                                        <h5>Company Details</h5>
                                    </b-col>
                                    <b-col cols='4' class="pb-2">
                                        Name
                                    </b-col>

                                    <b-col cols='8' class="pb-2">
                                        <b>{{tenant.company_name}}</b>

                                    </b-col>
                                    <b-col cols='4' class="pb-2">
                                        Email
                                    </b-col>
                                    <b-col cols='8' class="pb-2">
                                        <b>    {{tenant.email}}</b>

                                    </b-col>
                                    <b-col cols='4' class="pb-2">
                                        Link
                                    </b-col>
                                    <b-col cols='8' class="pb-2">
                                        <b>{{tenant.link}}</b>

                                    </b-col>
                                    <b-col cols='4' class="pb-2">
                                        Name
                                    </b-col>
                                    <b-col cols='8' class="pb-2">
                                        <b>{{tenant.first_name }} </b>

                                    </b-col>
                                    <b-col cols='4' class="pb-2">
                                        Account Type
                                    </b-col>
                                    <b-col cols='8' class="pb-2">
                                        <b>{{tenant.account_type }}</b>

                                    </b-col>
                                </b-row>

                            </b-col>

                        </b-row>
                    </b-card>
                </b-col>

                <!-- end of Company details card  -->

                <!-- start of Company details card -->
                <!-- <b-col cols='6'>
                <b-card>
                <b-row >



            </b-row>


        </b-card>
    </b-col> -->


    <!-- end of Company details card  -->


</b-row>
<div class="p-3">
    <b-card  class="p-4 ">
        <h4 class="pb-3">Billing Details</h4>


        <b-table-simple    responsive>


            <b-thead class="text-center">

                <b-tr>
                    <b-th>Date</b-th>
                    <b-th>Account Type</b-th>
                    <b-th>Status</b-th>


                </b-tr>
            </b-thead>
            <b-tbody class="text-center">
                <b-tr>
                    <b-th>April 1, 2020</b-th>
                    <b-th>Standard</b-th>
                    <b-td > <b-badge variant="warning">Primary</b-badge></b-td>



                </b-tr>
                <b-tr>
                    <b-th>March 1, 2020</b-th>
                    <b-th>Standard</b-th>
                    <b-td> <b-badge variant="success">Credited</b-badge></b-td>



                </b-tr>
                <b-tr>
                    <b-th>February 1, 2020</b-th>
                    <b-th>Standard</b-th>
                    <b-td><b-badge variant="success">Credited</b-badge></b-td>



                </b-tr>
                <b-tr>
                    <b-th>January 1, 2020</b-th>
                    <b-th>Standard</b-th>
                    <b-td><b-badge variant="success">Credited</b-badge></b-td>



                </b-tr>

            </b-tbody>
            <b-tfoot>
                <b-tr>
                    <b-td colspan="7"class="text-right">

                    </b-td>
                </b-tr>
            </b-tfoot>
        </b-table-simple>

    </b-card>
    <br>
    <br>
    <br>
</div>



</b-container>

</div>

</template>

<script>
import TenantApi from '@/backend/TenantApi'

export default {
    data() {
        return {
            mainProps: { blank: true, blankColor: '#777', width: 75, height: 75, class: 'm1' },
            image: "require('./assets/download.jpg')",
            items: [
                {  'Date': 'April 1, 2020',  account_type: 'Standard','status': 'Pending' },
                {  'Date': 'March 1, 2020', account_type: 'Standard','status': 'Credited' },
                {  'Date': 'February 1, 2020', account_type: 'Standard','status': 'Credited' },
                { 'Date': 'January 1, 2020', account_type: 'Standard','status': 'Credited' }
            ],

            tenant:'',
            request_status:'',
            request_msg:'',
            loading:false,

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
            this.loading = true;

            var tenant = await TenantApi.getTenant({
                tenant_id: this.$route.params.tenant_id
            })
            if(tenant.data.status == 'success'){
                this.tenant = tenant.data.message;



                this.loading = false;

            }else{
                this.loading = false;


            }
        },
    }
}
</script>

<style lang="css" scoped>
</style>
