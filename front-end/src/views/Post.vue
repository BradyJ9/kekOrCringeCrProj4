<template>
  <div>
        <div id="title-container">
            <p class="info-text"><strong>{{this.post.title}}</strong></p>
            <p class="info-text"><em>{{this.post.description}}</em></p>
        </div>
        <img id="meme" :src="this.post.path" width="600px" height="500px"/>
        <div id="info-container">
            <div style="display: flex; align-items: center">
                <p class="info-text" style="font-size: 50px; margin-right: 10px">{{post.points}}</p>
                <div v-if="this.buttonState == 0" id="button-container">
                    <button class="button" style="background-color: #e061da;" v-on:click="voteKek()">k</button>
                    <button class="button" style="background-color: rgb(36, 36, 104);" v-on:click="voteCringe()">c</button>
                </div>
                <div v-else-if="this.buttonState == 1" id="button-container">
                    <button class="button-active" style="background-color: #e061da;" v-on:click="voteKek()">k</button>
                    <button class="button" style="background-color: rgb(36, 36, 104);" v-on:click="voteCringe()">c</button>
                </div>
                <div v-else-if="this.buttonState == -1" id="button-container">
                    <button class="button" style="background-color: #e061da;" v-on:click="voteKek()">k</button>
                    <button class="button-active" style="background-color: rgb(36, 36, 104);" v-on:click="voteCringe()">c</button>
                </div>
                <div v-else style="display: flex; flex-direction: column; margin-left: 6px">
                    <p>ERROR</p>
                </div>
            </div>
            <div>
                <p class="info-text">{{post.author}}</p>
                <p class="info-text">{{post.time}}</p>
            </div>
        </div>
        <div class="comments-container">
            <div v-for="comment in comments" v-bind:key="comment._id" class="comment">
                <div style="display: flex; flex-direction: column">
                    <p style="font-size: 20px">"{{comment.comment}}"</p>
                    <p style="font-size: 15px; color: gray"><em>-{{comment.author}}</em></p>
                </div>
                <button class="delete-button" v-on:click="deleteComment(comment._id)">Delete</button>
            </div>
            <textarea v-model="commentText" placeholder="Comment" style="margin-top: 50px"></textarea>
            <p></p>
            <input v-model="commentAuthor" placeholder="Name">
            <p></p>
            <button @click="submitComment">Submit</button>
        </div>
    <div class="footer">
      <a href="https://github.com/BradyJ9/kekOrCringeCrProj4">Github Repo</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Post',
  created() {
    this.buttonState = 0;
    this.getPostData();
  },
  data() {
      return { //this will be null and populated by api call for next project
          post: null,
          buttonState: 0,
          comments: [],
          commentAuthor: '',
          commentText: ''
      }
  },
  props: {
      id: String
  },
  methods: {
      async leavingUpdatePoints() {
          console.log("Leaving");
          if (this.buttonState != 0) { //points need updated
            try {
                let response = await axios.put('/api/posts/' + this.id, {
                    newPoints: this.post.points
                });
                console.log(response);
            } catch (error) {
                console.log("Couldn't update points");
            }
          }
      },
      async getPostData() {
        try {
        let response = await axios.get('/api/posts/' + this.id);
        console.log(response);
        this.post = response.data;

        let comments = await axios.get('/api/comments/' + this.id);
        console.log(comments);
        this.comments = comments.data;
        } catch (error) {
        this.post = null;
        }
      },
      async submitComment() {
          try {
              let response = axios.post('/api/comments/', {
                  author: this.commentAuthor,
                  comment: this.commentText,
                  postid: this.id
              })
              console.log(response);
          } catch(error) {
              console.log(error);
          }
          this.getPostData();
      },
      async deleteComment(commentid) {
          console.log("Deleting comment: " + commentid);
          try {
              let response = await axios.delete('/api/comments/' + commentid);
              console.log(response);
          } catch(error) {
              console.log(error);
          }
          this.getPostData();
      },
      async voteKek() {
          if (this.buttonState == 1) {
              this.buttonState = 0;
              this.post.points -= 1;
              try { 
                await this.leavingUpdatePoints();
              } catch (error) {
                  console.log(error);
              }
          } else if (this.buttonState == 0) {
              this.buttonState = 1;
              this.post.points += 1; 
              try { 
                await this.leavingUpdatePoints();
              } catch (error) {
                  console.log(error);
              }
          } else if (this.buttonState == -1) {
              this.buttonState = 1;
              this.post.points += 2;
              try { 
                await this.leavingUpdatePoints();
              } catch (error) {
                  console.log(error);
              }
          }
      },
      voteCringe() {
          if (this.buttonState == 1) {
              this.buttonState = -1;
              this.post.points -= 2;
              this.leavingUpdatePoints();
          } else if (this.buttonState == 0) {
              this.buttonState = -1;
              this.post.points -= 1; 
             this.leavingUpdatePoints();
          } else if (this.buttonState == -1) {
              this.buttonState = 0;
              this.post.points += 1;
            this.leavingUpdatePoints();
          }
      }
  }
}
</script>

<style scoped>
    #title-container {
        margin: 10px 20px;
        display: flex; 
        justify-content: space-evenly; 
        align-content: space-evenly
    }

    #info-container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin: 10px 50px;
    }

    #comments-container {
        margin-top: 40px;
    }

    #meme-container {
        margin: 0 auto;
        width: 600px;
    }

    #meme {
        border: 3px solid black;
        border-radius: 10px;
        padding: 10px 20px;
    }

    #button-container {
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        margin-left: 6px;
    }

    .info-text {
        font-size: 20px;        
    }

    .comment {
        display: flex;
        justify-self: center;
        justify-content: space-around;
        margin: 10px 40px;
        border: 2px solid rgb(190, 41, 178);
        border-radius: 5px;
        align-items: center;
    }

    .button {
        border: 1px solid white;
        border-radius: 4px;
        color: white;
        text-align: center;
        text-justify: auto;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        height:40px; 
        width:40px;
        margin-bottom: 3px;
    }

    .delete-button {
        border: 1.5px solid rgb(228, 12, 12);
        background-color: white;
        border-radius: 4px;
        color: rgb(226, 27, 27);
        text-align: center;
        text-justify: auto;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        height:35px; 
        width:80px;
        margin-bottom: 3px;
    }

    .button-active {
        border: 2px solid rgb(0, 0, 0);
        border-radius: 4px;
        color: white;
        text-align: center;
        text-justify: auto;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        height: 45px; 
        width: 45px;
        margin-bottom: 3px;
    }

</style>