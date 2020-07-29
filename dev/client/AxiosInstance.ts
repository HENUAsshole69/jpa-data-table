import axios from 'axios'

const instance = axios.create({
})
instance.defaults.headers.common['x-api-key'] ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IkFETUlOIiwibmFtZSI6ImFkbWluIn0.pGn9WH2ZH-Ql91qniAFHEfZzStSse-U9z-knFY4YaOU'
export default instance
