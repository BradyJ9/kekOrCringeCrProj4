<template>
  <div class="table">
      <router-link style="text-decoration: none; color: inherit;" :to="{ name: 'Post', params: { id: '42' }}"> 
          <div v-for="post in posts" v-bind:key="post._id">
          <div class="post-container">
              <p style="margin-left: 5px; font-size: 20px"><strong>{{post.score}}</strong></p>

              <img style="margin-left: 6px" width="75px" height="50px" :src="post.path"/>
              <div class="post-info">
                <div style="display: flex; flex-direction: column; margin-left: 50px">
                    <p><strong>{{post.title}}</strong></p>
                    <p>{{post.author}}</p>
                </div>
                <div style="margin: 0px 100px">
                    <p>{{post.desc}}</p>
                </div>
                <p style="margin-right: 30px">{{post.time}}</p>
              </div>
          </div>
        </div>
      </router-link>
    <div class="footer">
      <a href="https://github.com/BradyJ9/kekOrCringeCrProj3">Github Repo</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Browse',
  data() {
      return {
          posts: [
              {
                 path: '/images/kekorcringe.png',
                 title: 'test', 
                 desc: 'This a funny meme',
                 author: 'deez',
                 score: 10,
                 time: "7:00 AM"
              },
              {
                 path: '/images/kekorcringe.png',
                 title: 'testB', 
                 desc: 'This a funny meme',
                 author: 'boi',
                 score: 30,
                 time: "7:00 AM"
              },
                {
                 path: '/images/kekorcringe.png',
                 title: 'testC', 
                 desc: 'This a funny memmmmmme',
                 author: 'dbarack',
                 score: 20,
                 time: "7:00 AM"
              },
          ]
      }
  },
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