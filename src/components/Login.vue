<template lang="html">

    <div class="">
        <b-container >
            <b-row class="justify-content-center pt-5">
                <b-col cols=4>

                    <!-- Start of Login  -->
                    <b-card class="p-3" style="background-color:#F0F0F0;">
                        <center><h3 class="pb-3">Login</h3></center>

                        <div class="pb-3">
                            <b-form-input
                            type="text"
                            placeholder="Username or Email"
                            ></b-form-input>
                        </div>
                        <div class="pb-3">
                            <b-form-input
                            type="password"
                            placeholder="Password"
                            ></b-form-input>
                        </div>
                        <div class="pt-3">
                            <b-button block variant="primary" @click="login()">Login</b-button>
                            <div class="pt-2" >
                                <a href="#">Forgot Password?</a>

                            </div>
                        </div>

                    </b-card>
                    <!-- end of Login Form -->
                </b-col>


            </b-row>
        </b-container>
    </div>

</template>

<script>
export default {

    data () {
        return {

        }
    },

    methods:{

        login(){

            this.$router.push({name:'Index'})
        }




    }
}
</script>

<style lang="css" scoped>
</style>
