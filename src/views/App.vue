<template>
    <div id="app">
        <router-view name="header"></router-view>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/>
            </fade-transition>
        </main>
        <router-view name="footer"></router-view>
    </div>
</template>
<script>
import UserTable from '@/components/UserTable'
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    FadeTransition
  },
  data(){
    return {
      user : [
        {
          id: 1,
          username:'user',
          password:'user',
          email: 'dd@gg.com',
          user_type: 'user'
        },
        {
          id: 2,
          username:'user2',
          password:'user',
          email: 'dd@gg.com',
          user_type: 'user'
        },{
          id: 3,
          username:'user2',
          password:'user',
          email: 'dd@gg.com',
          user_type: 'user'
        }
      ]
    }
  },
  methods:{
    
    addUser(user){
      const lastId =
    this.user.length > 0 ? this.user[this.user.length-1].id :0;
    const id = lastId +1;
    const newUser = {...user, id};
    const user_type = 'user';
    const newUser_type = {...user, user_type};
      this.user = [...this.user, newUser,newUser_type]
      console.log(this.user);
    }
  }
};
</script>
