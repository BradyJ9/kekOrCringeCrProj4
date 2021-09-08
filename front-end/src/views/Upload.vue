<template>
<div>
  <h1>Upload a Meme</h1>
  <div class="add">
    <div class="form">
      <input v-model="title" placeholder="Title">
      <p></p>
      <textarea v-model="description" placeholder="Description"></textarea>
      <p></p>
      <input v-model="author" placeholder="Author">
      <p></p>
      <input style="align-self: center; justify-self: center;" type="file" name="photo" @change="fileChanged">
      <p></p>
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addItem">
      <h2>{{addItem.title}}</h2>
      <img :src="addItem.path" />
    </div>
  </div>
    <div class="footer">
      <a href="https://github.com/BradyJ9/kekOrCringeCrProj4">Github Repo</a>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Upload',
    data() {
    return {
      title: "",
      description: "",
      author: "",
      file: null,
      addItem: null,
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/posts', {
          title: this.title,
          path: r1.data.path,
          description: this.description,
          author: this.author,
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
  }
}

</script>


<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  justify-content: center;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
  justify-content: center;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
  justify-content: center;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

</style>

