<template>
  <div class="card border-warning mb-3" style="max-width: 20rem;">
      <div class="card-header">
          <h4 class="card-title">Waiting</h4>
      </div>
      <div class="card-body">
          <div class="jumbotron" v-for="(task, index) in waiting" :key="index">
              <h4>{{task.name}}</h4>
              <hr class="my-4">
              <p>{{task.description}}</p>
              <p>For: {{task.person}}</p>
              <p>Pts: {{task.points}}</p>
              <p class="lead">
                  <button class="btn btn-secondary" @click="backToDoing(task)">prev</button>
                  <button class="btn btn-danger" @click="deleteTaskWaiting(task)">Delete</button>
                  <button class="btn btn-info" v-on:click="addDone(task)">next</button>
              </p>
          </div>
      </div>
  </div>
</template>

<script>
import { db } from '@/firebase.js'

export default {
  name: 'WaitingCard',
  firebase: {
    waiting: db.ref('waiting'),
    done: db.ref('done'),
    doing: db.ref('doing')
  },
  methods: {
    addDone (task) {
      this.$firebaseRefs.done.push({
        name: task.name,
        description: task.description,
        person: task.person,
        points: task.points
      })
      this.$firebaseRefs.waiting.child(task['.key']).remove()
    },
    backToDoing (task) {
      this.$firebaseRefs.doing.push({
        name: task.name,
        description: task.description,
        person: task.person,
        points: task.points
      })
      this.$firebaseRefs.waiting.child(task['.key']).remove()
    },
    deleteTaskWaiting (task) {
      this.$firebaseRefs.waiting.child(task['.key']).remove()
    }
  }
}
</script>

<style>

</style>
