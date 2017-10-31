import Vue from 'vue';

export default {
  getLists() {
    return new Promise((resolve, reject) => {
      Vue.http.get('/lists', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('id_token')}`,
        }
      }).then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('id_token');
        }
        reject(error);
      });
    });
  },

  getTasks() {
    return new Promise((resolve, reject) => {
      Vue.http.get('/tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('id_token')}`,
        }
      }).then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
        }
        reject(error);
      });
    });
  },

  addTask(task) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/tasks', task, headers).then((response) => {
        if (response.status == 200) {
          resolve(response.data);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  },

  editTask(task) {
    return new Promise((resolve, reject) => {
      Vue.http.put(`/tasks/${task.id}`, task, headers).then((response) => {
        if (response.status == 200) {
          resolve(response.data);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  },

  deleteTask(task) {
    return new Promise((resolve, reject) => {
      Vue.http.delete(`/tasks/${task.id}`, task, headers).then((response) => {
        if (response.status == 200) {
          resolve(response.data);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  },
};
