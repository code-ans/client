import Vue from 'vue'
import Component from './Loader'
import { sleep } from '@/utils/async'

const instance = new Vue({
  render: h => h(Component)
}).$mount().$children[0]

document.body.appendChild(instance.$el)

export const Waiting = {
  start () {
    instance.show = true
  },

  finish () {
    instance.show = false
  }
}

export async function Wait (callback, delay = 0) {
  instance.show = true
  try {
    await callback()

    if (delay) {
      await sleep(delay)
    }
  } finally {
    instance.show = false
  }
}
