<template>
  <div class="card border-danger mb-3" style="max-width: 20rem;">
      <div class="card-header">
          <h4 class="card-title">Doing</h4>
      </div>
      <div class="card-body">
          <div class="jumbotron" v-for="(task, index) in doing" :key="index">
              <h4>{{task.name}}</h4>
              <hr class="my-4">
              <p>{{task.description}}</p>
              <p>For: {{task.person}}</p>
              <p>Pts: {{task.points}}</p>
              <p class="lead">
                  <button class="btn btn-secondary" v-on:click="backToBacklog(task)">prev</button>
                  <button class="btn btn-danger" @click="deleteTaskDoing(task)">Delete</button>
                  <button class="btn btn-info" v-on:click="addWaiting(task)">next</button>
              </p>
          </div>
      </div>
  </div>
</template>

<script>
import { db } from '@/firebase.js'

export default {
  name: 'DoingCard',
  firebase: {
    backlog: db.ref('backlog'),
    doing: db.ref('doing'),
    waiting: db.ref('waiting')
  },
  methods: {
    addWaiting (task) {
      this.$firebaseRefs.waiting.push({
        name: task.name,
        description: task.description,
        person: task.person,
        points: task.points
      })
      this.$firebaseRefs.doing.child(task['.key']).remove()
    },
    backToBacklog: function (task) {
      this.$firebaseRefs.backlog.push({
        name: task.name,
        description: task.description,
        points: task.points,
        person: task.person
      })
      this.$firebaseRefs.doing.child(task['.key']).remove()
    },
    deleteTaskDoing (task) {
      this.$firebaseRefs.doing.child(task['.key']).remove()
    }
  }
}
</script>

<style>

</style>
