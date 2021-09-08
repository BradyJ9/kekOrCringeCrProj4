<template>
  <div class="table">
          <div v-for="post in posts" v-bind:key="post._id">
          <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'Post', params: { id: post._id }}"> 
          <div class="post-container">
              <p style="margin-left: 5px; font-size: 20px"><strong>{{post.points}}</strong></p>
              <img style="margin-left: 6px" width="75px" height="50px" :src="post.path"/>
              <div class="post-info">
                <div style="display: flex; flex-direction: column; margin-left: 50px">
                    <p><strong>{{post.title}}</strong></p>
                    <p style="font-size: 12px"><em>{{post.author}}</em></p>
                </div>
                <div style="margin: 0px 100px">
                    <p>{{post.description}}</p>
                </div>
                <div style="display: flex; align-items: center">
                  <img src="https://cdn.iconscout.com/icon/free/png-256/comment-2551199-2136583.png" width="20px" height="20px" />
                  <p style="margin-right: 30px; margin-left: 8px"></p>
                </div>
              </div>
          </div>
          </router-link>
        </div>
    <div class="footer">
      <a href="https://github.com/BradyJ9/kekOrCringeCrProj4">Github Repo</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Browse',
  data() {
      return {
          posts: [],
          postComments: {}
      }
  },
  async created() {
      this.getPosts();
  },
  methods: {
    async getPosts() {
      try {
        let response = await axios.get("/api/posts");
        this.posts = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>
    li a {
        font-size: 1px;
    }

    .table {
        height: 600px;
    }

    .post-container {
        margin: 15px 30px 30px 15px;
        display: flex;
        border: 2px solid rgb(21, 24, 54);
        border-radius: 3px;
        align-items: center;
    }

    .post-info {
        margin: 8px;
        display: flex;
        border: 1px solid rgb(170, 48, 129);
        border-radius: 10px;
        width: 100%;
        align-items: center;
        justify-content: space-between;
    }
</style>