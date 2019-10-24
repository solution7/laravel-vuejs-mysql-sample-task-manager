<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 mt-5">
                <div class="card">
                    <div class="card-header">Task Manager</div>
                    <div class="card-body">
                        <form @submit.prevent="saveTask()">
                         <div class="input-group add-on">
                          <input class="form-control"
                              :class="{'is-invalid':errors.name, 'is-valid': formData.name }"
                              type="text" v-model="formData.name"
                              placeholder="Enter a new task"
                              v-on:input="isValidData()"
                            />
                            <div class="input-group-btn">
                              <button class="btn btn-primary" type="submit">ADD</button>
                            </div>
                          <span class="text-danger" v-if="errors.name">
                            {{ errors.name }}
                          </span>
                        </div>
                        </form>
                        <div class="text-center mt-4"
                          v-if="tasksIsloading">
                          <img src="../../images/loader.gif" width="100px" />
                        </div>
                        <template v-else>
                          <ul class="list-group mt-4" v-if="tasks.length">
                            <li class="list-group-item" v-for="task in tasks">
                              <input type="checkbox" :checked="task.status" :value="task.status" @change="approveTask($event, task.id)"/>
                              <b>{{ task.name }}</b>
                            </li>
                          </ul>
                          <p class="text-center mt-4" v-else>
                            <b>No task Found!</b>
                          </p>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
          return {
            tasksIsloading: false,
            formData: {
              name: '',
            },
            tasks: [],
            errors: []
          };
        },
        created() {
          this.tasksIsloading = true;
          axios.get('tasks').then((resp) => {
            this.tasksIsloading = false;
            this.tasks = resp.data;
          }, (error) => {
            this.tasksIsloading = false;
            console.log(error)
          });
        },
        methods: {
          saveTask() {
            if (this.errors.length) return;
            const app = this;
            axios.post('tasks', app.formData).then((resp) => {
              app.formData = {};
              this.tasks.unshift(resp.data);
            }, (error) => {
              console.log(error)
            });
          },
          approveTask(evn, taskId) {
            status = (evn.target.checked)? 1 : 0;
            console.log(status);

            axios.put(`tasks/${taskId}`,{ 'status': status}).then((resp) => {
            }, (error) => {
              console.log(error)
            });
          },
          isValidData () {
            this.errors = [];
            if (!this.formData.name) {
              this.$set(this.errors, 'name', 'Name is required.');
            }
          }
        }
    }
</script>
