<template>
  <div id="kanban-app">
    <div class="row">
      <div class="colNav col-12">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Kanban-App</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <button class="btn btn-primary" data-toggle="modal" data-target="#modalTask">
            New Task
          </button>
        </nav>
      </div>
    </div>
    <div class="modal fade" id="modalTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label>Title:</label>
            <input type="text" v-model="task.name">
            <label>Description</label>
            <textarea cols="30" rows="5" v-model="task.description"></textarea>
            <label>Points</label>
            <input type="text" v-model="task.points">
            <label>Assign To:</label>
            <input type="text" v-model="task.person">
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-primary" v-on:click="addTask()" data-dismiss="modal">Save changes</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 col-sm-12">
        <backlog-card></backlog-card>
      </div>
      <div class="col-lg-3 col-sm-12">
        <doing-card></doing-card>
      </div>
      <div class="col-lg-3 col-sm-12">
        <waiting-card></waiting-card>
      </div>
      <div class="col-lg-3 col-sm-12">
        <done-card></done-card>
      </div>
    </div>
  </div>
</template>

<script>

import BacklogCard from '@/components/BacklogCard.vue'
import DoingCard from '@/components/DoingCard.vue'
import WaitingCard from '@/components/WaitingCard.vue'
import DoneCard from '@/components/DoneCard.vue'
import { db } from '@/firebase.js'

export default {
  name: 'kanban-app',
  firebase: {
    backlog: db.ref('backlog')
  },
  data: function () {
    return {
      task: {
        name: '',
        description: '',
        points: '',
        person: ''
      }
    }
  },
  components: {
    BacklogCard,
    DoingCard,
    WaitingCard,
    DoneCard
  },
  methods: {
    addTask () {
      this.$firebaseRefs.backlog.push({
        name: this.task.name,
        description: this.task.description,
        points: this.task.points,
        person: this.task.person
      })
      this.reset()
    },
    reset () {
      this.task.taskName = ''
      this.task.taskDes = ''
      this.task.taskPts = ''
      this.task.person = ''
    }
  }
}
</script>
