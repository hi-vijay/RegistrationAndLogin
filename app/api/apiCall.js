import axios from 'axios';
import {SpaceX_URL} from './urls';

export const FetchData = () =>
  new Promise(async (resolve, reject) => {
    try {
      axios({
        method: 'get',
        baseURL: SpaceX_URL,
        responseType: 'json',
      })
        .then(data => {
          console.log('axios=> ', data.data);
          resolve(data.data);
        })
        .catch(error => {
          console.log('error=> ', error);
          reject(error);
        });
    } catch (e) {
      console.log('gotcha');
      reject('some error occred');
    }
  });
