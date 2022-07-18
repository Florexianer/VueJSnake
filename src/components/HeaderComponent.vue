<template>
  <div id="header">
    <div id="logo">
      Snake
    </div>
    <div id="nav">
     <div id="left">
       Game
     </div>
     <div id="right">
        About Me
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
}
</script>

<style scoped>
#logo {
  flex-grow: 3;
}
#nav {
  flex-grow: 7;
  display: flex;
  justify-content: end;
}

#right {
  margin-right: 50px;
}

#left {
  margin-right: 100px;
}

#header {
  align-items: stretch;
  display: flex;
}
</style>