<template>

  <div id="app">
    <div id="header">
      <div style="display: flex; justify-content: center">
        <h1 id="header-pink">Kek or</h1>
        <h1 style="padding-top: 20px; padding-left: 15px; font-size: 50px">Cringe</h1>
      </div>
      <div id="nav">
        <router-link to="/">Home</router-link> 
        <router-link to="/browse">Browse</router-link>
        <router-link to="/upload">Upload</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Gill Sans", sans-serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#header {
  display: flex;
  flex-direction: column;
  justify-content: right;
  height: 200px;
  border: 4px solid black;
  border-radius: 3px;
  background: rgb(245, 241, 241);
}

#nav {
  height: 100%;
  padding: 0px 20px 10px 20px;
  text-anchor: end;
  display: flex;
  flex-direction: row;
  justify-content: right;
  justify-items: flex-end;
  align-items: flex-end;
  align-content: flex-end;
}

#nav a {
  font-size: 20px;
  color: #0d0d63;
  margin-left: 60px;
}

#nav a.router-link-exact-active {
  color: #cf499c;
}

#header-pink {
  font-size: 50px;
  padding-top: 20px;
  color: rgb(221, 140, 153);
}
</style>
