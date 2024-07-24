import axios from 'axios'
import { useMutation } from "@tanstack/vue-query";

export async function axiosGet2(url, payload) {
  try {
    const response = await axios.get(url, {
      params: payload,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    return response.data
  } catch (e) {
    return e
  }
}
export async function axiosPost2(url, payload) {
  const response = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  if (response.data) {
    return response.data
  } else {
    return []
  }
}
export async function axiosPost3(url, payload) {
  const response = await axios.post(url, payload, {
    headers: {
      "Content-Type": "application/json",
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  if (response.data) {
    return response.data
  } else {
    return []
  }
}

export function axiosPost(url, payload) {
  const response = axios.post(url, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  return response;
}

export function axiosGet(url, payload) {
  const response = axios.get(url, {
    params: payload,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  return response;
}
