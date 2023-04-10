<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                      
                        <template>
                            <div id="user-table">
                               <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="user in user" :key="user.id">
      <th scope="row">{{ x }}</th>
      <td>{{  user.username  }}</td>
      <td>{{  user.password  }}</td>
      <td>{{  user.email  }}</td>
    </tr>
  </tbody>
</table>
                            </div>
                        </template>
                    </card>
                    
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'user-table',
    props:{
      user: Array
    }
}
</script>