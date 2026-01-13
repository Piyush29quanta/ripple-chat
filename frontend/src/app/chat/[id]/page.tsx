import Chatbase from '@/components/chat/ChatBase'
import { fetchChats } from '@/fetch/chatsFetch'
import { fetchGroupChat, fetchGroupChatUsers } from '@/fetch/groupFetch'
import { notFound } from 'next/navigation'
import React from 'react'

const  Chat = async({params}:{params:{id:string}}) => {
    if(params.id.length !== 36){ 
        return notFound()
    }
    const group:ChatGroupType | null = await fetchGroupChat(params.id)
    if(group === null){
        return notFound()
    }
    const users: Array<GroupChatUserType> | [] = await fetchGroupChatUsers(params.id)
    const chats : Array<MessageType> | [] = await fetchChats(params.id)
  return (
    <div>
        
        <Chatbase users={users} group={group} oldMessages={chats}/>
    </div>
  )
}

export default Chat