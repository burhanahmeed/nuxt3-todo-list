import axios from '@/utils/axios';

export function getActivityGroupLists() {
  return new Promise((resolve, reject) => {
    axios.get('/activity-groups')
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function addActivityGroup(payload: Object) {
  return new Promise((resolve, reject) => {
    axios.post('/activity-groups', payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function deleteActivityGroup(id: string) {
  return new Promise((resolve, reject) => {
    axios.delete('/activity-groups/'+id)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function showActivityGroup(id: string) {
  return new Promise((resolve, reject) => {
    axios.get('/activity-groups/'+id)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function updateActivityGroup(id: string, payload: Object) {
  return new Promise((resolve, reject) => {
    axios.patch('/activity-groups/'+id, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function addTodo(payload: Object) {
  return new Promise((resolve, reject) => {
    axios.post('/todo-items/', payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function updateTodo(id: string, payload: Object) {
  return new Promise((resolve, reject) => {
    axios.patch('/todo-items/'+id, payload)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function deleteTodo(id: string) {
  return new Promise((resolve, reject) => {
    axios.delete('/todo-items/'+id)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}