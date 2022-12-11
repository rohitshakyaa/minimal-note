/* eslint-disable vue/no-multiple-template-root */
<template>
  <div style="width: 100%">
    <div style="min-height: 100vh; padding: 20px 5px">
      <header>
        <div class="title">
          <h2>{{ title }}</h2>
          <input
            type="color"
            id="favcolor"
            name="favcolor"
            v-model="note.color"
          />
        </div>
        <!-- <div class="head">
          <p data-bs-toggle="modal" data-bs-target="#loginModal">Login</p>
          <p href="">Register</p>
  
          <p @click.prevent="sync()">
            <span v-if="syncing">Syncing</span>
            <span v-else>
              <span v-if="synced == 'true'">Synced</span>
              <span v-else>Sync</span>
            </span>
          </p>
          <p href="">Logout</p>
        </div> -->
      </header>
      <div id="app">
        <textarea
          id="textarea"
          autofocus
          placeholder="insert your note .."
          v-model="note.text"
          @keyup.ctrl.enter="addNote"
          @input="autoGrow()"
        ></textarea>
        <button class="button" @click="addNote">Submit</button>

        <div v-for="(note, index) in notes" class="noteBox" :key="index">
          <div
            class="top"
            :style="{ 'background-color': note.color, color: note.fontColor }"
          >
            <button
              class="close"
              @click="removeNote(index)"
              :class="note.classs"
            ></button>
            <i>{{ note.date }}</i>
          </div>
          <div class="content">
            {{ note.text }}
          </div>
        </div>
      </div>
      <!-- <Login /> -->
    </div>
    <footer>
      Made by
      <a href="https://rohitshakyaa.github.io" class="profile_link"
        >Rohit Shakya</a
      >
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import autosize from "autosize";
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";

export default defineComponent({
  data() {
    return {
      title: "Minimal Notes",
      note: {
        text: "",
        date: "",
        color: "#fecf28",
        fontColor: "#000000",
        classs: "black",
      },
      notes: [
        {
          text: "Minimal Notes",
          date: new Date(Date.now()).toLocaleString(),
          color: "#fecf28",
          fontColor: "#000000",
          classs: "black",
        },
      ],

      syncing: false,
    };
  },
  computed: {
    ...mapGetters(["synced"]),
  },
  methods: {
    ...mapMutations(["setSync"]),
    addNote() {
      console.log(this.note);
      console.log(this.shouldTextBeBlack(this.note.color));
      if (!this.shouldTextBeBlack(this.note.color)) {
        this.note.fontColor = "#fff";
        this.note.classs = "white";
      }
      this.setSync("true");
      let { text, date, color, fontColor, classs } = this.note;
      this.notes.push({
        text,
        date: new Date(Date.now()).toLocaleString(),
        color,
        fontColor,
        classs,
      });
      this.note.text = "";
    },
    removeNote(index: any) {
      this.setSync("false");
      this.notes.splice(index, 1);
    },
    autoGrow() {
      autosize(document.querySelector("textarea") as HTMLElement);
    },
    sync() {
      // this.syncing = true;
      this.setSync("true");
    },

    shouldTextBeBlack(backgroundcolor: any) {
      return this.computeLuminence(backgroundcolor) > 0.179;
    },
    computeLuminence(backgroundcolor: string) {
      var colors = this.hexToRgb(backgroundcolor);
      var components = ["r", "g", "b"];
      for (var i in components) {
        var c = components[i];

        colors[c] = colors[c] / 255.0;

        if (colors[c] <= 0.03928) {
          colors[c] = colors[c] / 12.92;
        } else {
          colors[c] = Math.pow((colors[c] + 0.055) / 1.055, 2.4);
        }
      }

      var luminence = 0.2126 * colors.r + 0.7152 * colors.g + 0.0722 * colors.b;

      return luminence;
    },
    hexToRgb(hex: string): any {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : {
            r: 0,
            g: 0,
            b: 0,
          };
    },
  },
  mounted() {
    if (localStorage.getItem("notes"))
      this.notes = JSON.parse(localStorage.getItem("notes") || "");
    if (localStorage.getItem("noteColor"))
      this.note.color = JSON.parse(localStorage.getItem("noteColor") || "");
  },
  watch: {
    notes: {
      handler() {
        // this.setSync("false");
        localStorage.setItem("notes", JSON.stringify(this.notes));
      },
      deep: true,
    },
    "note.color": {
      handler() {
        localStorage.setItem("noteColor", JSON.stringify(this.note.color));
      },
    },
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat");

.head {
  display: flex;
  gap: 10px;
}

header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.head p {
  cursor: pointer;
  text-decoration: none;
  padding: 8px 16px;
  background-color: #ccc;
  color: black;
  border-radius: 10px;
}

.head a:hover {
  background-color: #aaa;
}

body {
  font-family: "Montserrat";
  /* font: 14px/1.6'Avenir', Helvetica, Arial, sans-serif; */
}

footer {
  background-color: #ccc;
  width: 100%;
  padding: 10px 50px;
}

.profile_link {
  text-decoration: none;
}

i {
  font-size: 12px;
  clear: both;
  font-style: normal;
  display: block;
}

h2 {
  margin: 10px;
}

.title > h2 {
  display: inline;
}

.title > a {
  font-size: 20px;
  cursor: pointer;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-flow: column wrap;
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
  margin: 0 auto;
  height: 95vh;
  justify-content: flex-start;
  align-content: flex-start;
}

#app > * {
  border-radius: 5px;
  transition: all ease 0.3s;
}

textarea {
  display: block;
  padding: 8px;
  margin: 10px;
  border: 1px solid #ccc;
  resize: none;
  overflow: hidden;
  min-height: 80px;
}

textarea:focus {
  border-color: black;
}

button {
  padding: 0;
  cursor: pointer;
  background: transparent;
  border: 0;
  width: 100%;
  display: block;
}

input[type="color"] {
  border: none;
  border-radius: 999px 999px 999px 35px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  background-color: white;
  float: right;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 999px 999px 999px 35px;
}

.noteBox {
  position: relative;
  width: 216px;
  margin: 10px;
  padding: 0;
  border: 1px solid #ccc;
}

.button {
  display: block;
  box-sizing: content-box;
  width: 200px;
  padding: 8px;
  margin: 0 10px 20px 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  clear: both;
}

.button:hover {
  background-color: black;
  color: white;
  border-color: black;
}

.top {
  text-align: right;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 15px 10px;
  margin-bottom: 0.5em;
}

.content {
  padding: 10px;
  word-break: break-all;
  white-space: pre-line;
}

.close {
  text-align: right;
  height: 10px;
  width: 10px;
  position: relative;
  box-sizing: border-box;
  line-height: 10px;
  display: inline-block;
}

.close.black::before,
.close.black::after {
  background-color: black;
}
.close.white::before,
.close.white::after {
  background-color: white;
}

.close:before,
.close:after {
  transform: rotate(-45deg);
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -1px;
  margin-left: -5px;
  display: block;
  height: 2px;
  width: 10px;
  transition: all 0.25s ease-out;
}

.close:after {
  transform: rotate(-135deg);
}

.close:hover:before,
.close:hover:after {
  transform: rotate(0deg);
}
</style>
