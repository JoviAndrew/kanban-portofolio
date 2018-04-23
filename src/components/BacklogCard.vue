<template>
  <div class="card border-primary mb-3" style="max-width: 20rem;">
    <div class="card-header">
      <h4 class="card-title">Backlog</h4>
    </div>
      <div class="card-body">
        <div class="jumbotron" v-for="(task, index) in backlog" :key="index">
          <h4>{{task.name}}</h4>
          <hr class="my-4">
          <p>{{task.description}}</p>
          <p>For: {{task.person}}</p>
          <p>Pts: {{task.points}}</p>
          <p class="lead">
            <button class="btn btn-danger" @click="deleteTaskBacklog(task)">Delete</button>
            <button class="btn btn-info" v-on:click="addDoing(task)">Next</button>
          </p>
        </div>
      </div>
  </div>
</template>

<script>
import { db } from '@/firebase.js'

export default {
  name: 'BacklogCard',
  firebase: {
    backlog: db.ref('backlog'),
    doing: db.ref('doing')
  },
  methods: {
    addDoing: function (task) {
      this.$firebaseRefs.doing.push({
        name: task.name,
        description: task.description,
        person: task.person,
        points: task.points
      })
      this.$firebaseRefs.backlog.child(task['.key']).remove()
    },
    deleteTaskBacklog (task) {
      this.$firebaseRefs.backlog.child(task['.key']).remove()
    }
  }
}
</script>

<style>
.modal-body{
    display: flex;
    flex-direction: column;
}

textarea{
    resize: none;
}
</style>
