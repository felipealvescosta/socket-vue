import { Client } from '@stomp/stompjs'
import SockJS from "sockjs-client"

let socketClient = null

function socketFactory(){
    const url = "http://localhost:8080"
    const path= "ws"

    return new SockJS(`${url}/${path}`)
}

function getConfig(){
    return {
        webSocketFactory: socketFactory,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      }
}

function getClient() {
    if(!socketClient){
        socketClient = new Client(getConfig())
        socketClient.activate()
    }

    return socketClient
}

function subscribe(topic, callback, headers) {
    const client = getClient()
    if(client.connected) {
        return client.subscribe(topic, callback, headers)
    }

    return null
}

function unsubscribe(subscription) {
    subscription.unsubscribe()
}

function emit(destination, object) {
    const client = getClient()

    if(client.connected) {
        const body = JSON.stringify(object)
        client.publish({ destination, body })
    }
}

function disconnect() {
    const client = getClient()
    
    if(client) {
        client.deactivate()
        socketClient = null
    }
}

export default {
    getClient,
    subscribe,
    unsubscribe,
    emit,
    disconnect
}