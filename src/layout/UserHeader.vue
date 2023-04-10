<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            
               <a href="" @click="signout"> <h3  style="color: #fff;">Logout</h3></a>
            


            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
               
               
                
                    <a slot="title" href="#" class="nav-link" >
                        <h4><router-link to="/Home" class="dropdown-item text-white">Home</router-link></h4>
                        
                    </a>
                     
                    
                    
                    
                   
              
            </ul>
             <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
               
               
                
                  <a slot="title" href="#cart" class="nav-link" >
                        <h4 class="text-white">Cart</h4>
                        
                    </a>
                    
                    
                    
                   
              
            </ul>
            
            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://www.facebook.com/Kritsada Saekua" target="_blank" rel="noopener"
                       data-toggle="tooltip" title="Like us on Facebook">
                        <i class="fa fa-facebook-square"></i>
                        <span class="nav-link-inner--text d-lg-none">Facebook</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://www.instagram.com/asl_frozen"
                       target="_blank" rel="noopener" data-toggle="tooltip" title="Follow us on Instagram">
                        <i class="fa fa-instagram"></i>
                        <span class="nav-link-inner--text d-lg-none">Instagram</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://twitter.com/MGEternalTH" target="_blank" rel="noopener"
                       data-toggle="tooltip" title="Follow us on Twitter">
                        <i class="fa fa-twitter-square"></i>
                        <span class="nav-link-inner--text d-lg-none">Twitter</span>
                    </a>
                </li>
                
            
            </ul>
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },method:{
signout(){
firebase
.auth()
.signOut()
.then(() => {
	this.$router.replace("/");
});
}
}
};
</script>
<style>
</style>
