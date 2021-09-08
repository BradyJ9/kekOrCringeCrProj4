<template>
  <div>
        <div id="title-container">
            <p class="info-text"><strong>{{this.post.title}}</strong></p>
            <p class="info-text"><em>{{this.post.desc}}</em></p>
        </div>
        <img id="meme" :src="this.post.path" width="600px" height="500px"/>
        <div id="info-container">
            <div style="display: flex; align-items: center">
                <p class="info-text" style="font-size: 50px; margin-right: 10px">{{post.score}}</p>
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
  </div>
</template>

<script>
export default {
  name: 'Post',
  created() {
    this.buttonState = 0;
      //this is where api call will be made to set up page with post from id
  },
  data() {
      return { //this will be null and populated by api call for next project
          post: {
                path: '/images/kekorcringe.png',
                title: 'test', 
                desc: 'This a funny meme',
                author: 'deez',
                score: 10,
                time: "7:00 AM"
          },
          buttonState: 0
      }
  },
  props: {
      id: String
  },
  methods: {
      voteKek() {
          if (this.buttonState == 1) {
              this.buttonState = 0;
              this.post.score -= 1;
          } else if (this.buttonState == 0) {
              this.buttonState = 1;
              this.post.score += 1; 
          } else if (this.buttonState == -1) {
              this.buttonState = 1;
              this.post.score += 2;
          }
      },
      voteCringe() {
          if (this.buttonState == 1) {
              this.buttonState = -1;
              this.post.score -= 2;
          } else if (this.buttonState == 0) {
              this.buttonState = -1;
              this.post.score -= 1; 
          } else if (this.buttonState == -1) {
              this.buttonState = 0;
              this.post.score += 1;
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