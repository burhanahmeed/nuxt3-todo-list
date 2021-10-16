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