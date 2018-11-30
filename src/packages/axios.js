import Axios from 'axios'
// import Vue from 'vue'

const SERVER_URL = 'http://mtm.test'
// const SERVER_URL = 'https://api.zhanglan.tech:7001'

Axios.defaults.baseURL = SERVER_URL

const Http = Axios.create()

// custome axios
export default Axios

// primary axios
export const http = Http
