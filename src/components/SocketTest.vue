<template>
  <div>
    <div id="main-content" class="container">
      <div class="row">
        <div class="col-md-6">
          <form class="form-inline">
            <div class="form-group">
              <label for="connect">WebSocket connection:</label>
              <button id="connect" type="submit" :disabled="connected == true" @click.prevent="connect">Connect</button>
              <button id="disconnect" type="submit" :disabled="connected == false" @click.prevent="disconnect">Disconnect
              </button>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <form class="form-inline">
            <div class="form-group">
              <label for="name">What is message?</label>
              <input type="text" id="name" class="form-control" v-model="send_message" placeholder="message">
            </div>
            <button id="send" type="submit" @click.prevent="send">Send</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table id="conversation" class="table table-striped">
            <thead>
              <tr>
                <th>Greetings</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in received_messages" :key="item.text">
                <td>{{ item.from }}</td>
                <td>{{ item.text }}</td>
                <td>{{ item.time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import socketClient from '../client/socketClient'

export default {
  name: "SocketTest",
  data() {
    return {
      received_messages: [],
      send_message: null,
      connected: false
    }
  },
  methods: {
    send() {
      const destination = '/app/ws/foo/send'
      const message = {
						from : 'socketClient',
						text : this.send_message
			}
      socketClient.emit(destination, message)
    },
    connect() {
      socketClient.getClient().onConnect = (frame) => {
        console.log('Connected: ' + frame)
        const topic = '/topic/messages/foo'
        const callback = (message) => {
          const tick = JSON.parse(message.body)
          this.received_messages.push(tick)
        }
        socketClient.subscribe(topic, callback)
        this.connected = true
      }
    },
    disconnect() {
      socketClient.disconnect()
      this.connected = false
    },
 },
} 
</script>