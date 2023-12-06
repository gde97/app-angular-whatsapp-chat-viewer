export interface Message{
    idmessage: number,
    datetime: string,
    sender: string,
    text: string,
    nameattachment: string,
    attachment: boolean
}

export interface User{
    id: number,
    email: string,
    password: string,
    phone: string,
    chats: Chat[]
}

export interface Chat{
    user: User,
    idchat: number,
    name: string,
    nameowner: string[],
    messages: Message[]
}

