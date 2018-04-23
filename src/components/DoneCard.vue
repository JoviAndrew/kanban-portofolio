<template>
  <div class="card border-success mb-3" style="max-width: 20rem;">
      <div class="card-header">
          <h4 class="card-title">Done</h4>
      </div>
      <div class="card-body">
          <div class="jumbotron" v-for="(task, index) in done" :key="index">
              <h4>{{task.name}}</h4>
              <hr class="my-4">
              <p>{{task.description}}</p>
              <p>For: {{task.person}}</p>
              <p>Pts: {{task.points}}</p>
              <p class="lead">
                  <button class="btn btn-secondary" v-on:click="backToWaiting(task)">prev</button>
                  <button class="btn btn-info" v-on:click="finishTask(task)">done</button>
              </p>
          </div>
      </div>
  </div>
</template>

<script>
import { db } from '@/firebase.js'

export default {
  name: 'DoneCard',
  firebase: {
    done: db.ref('done'),
    waiting: db.ref('waiting')
  },
  methods: {
    backToWaiting: function (task) {
      this.$firebaseRefs.waiting.push({
        name: task.name,
        description: task.description,
        person: task.person,
        points: task.points
      })
      this.$firebaseRefs.done.child(task['.key']).remove()
    },
    finishTask: function (task) {
      this.$firebaseRefs.done.child(task['.key']).remove()
    }
  }
}
</script>

<style>

</style>
