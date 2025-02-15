"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Hash, Bell, Users, Settings, ChevronDown, AtSign, Paperclip, Smile, Send } from 'lucide-react'

interface Channel {
  id: string
  name: string
  type: 'text' | 'voice'
}

interface Category {
  id: string
  name: string
  channels: Channel[]
}

interface Message {
  id: string
  author: string
  content: string
  timestamp: string
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Information',
    channels: [
      { id: '1', name: 'announcements', type: 'text' },
      { id: '2', name: 'rules', type: 'text' },
    ]
  },
  {
    id: '2',
    name: 'General',
    channels: [
      { id: '3', name: 'general-chat', type: 'text' },
      { id: '4', name: 'memes', type: 'text' },
      { id: '5', name: 'voice-chat', type: 'voice' },
    ]
  },
  {
    id: '3',
    name: 'Trading',
    channels: [
      { id: '6', name: 'strategy-discussion', type: 'text' },
      { id: '7', name: 'market-analysis', type: 'text' },
      { id: '8', name: 'trade-alerts', type: 'text' },
    ]
  }
]

const messages: Message[] = [
  { id: '1', author: 'CryptoWhale', content: 'Just bought 100 BTC. Feeling bullish!', timestamp: '2024-12-11 10:30 AM' },
  { id: '2', author: 'HODLer', content: 'Remember, HODL is the way!', timestamp: '2024-12-11 10:32 AM' },
  { id: '3', author: 'TradeMaster', content: 'Looking at some interesting patterns on the ETH chart.', timestamp: '2024-12-11 10:35 AM' },
  { id: '4', author: 'Newbie', content: 'Can someone explain what DCA means?', timestamp: '2024-12-11 10:38 AM' },
  { id: '5', author: 'CryptoWhale', content: 'DCA stands for Dollar Cost Averaging. It\'s a strategy where you invest a fixed amount regularly, regardless of market conditions.', timestamp: '2024-12-11 10:40 AM' },
]

export default function ChannelPage({ params }: { params: { id: string } }) {
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null)
  const [messageInput, setMessageInput] = useState('')

  const handleChannelSelect = (channel: Channel) => {
    setCurrentChannel(channel)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput)
      setMessageInput('')
    }
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-black/30 text-white flex flex-col">
        <div className="p-4 font-bold text-xl border-b border-white/10">CryptoTrader</div>
        <div className="flex-grow overflow-y-auto">
          {categories.map((category) => (
            <div key={category.id} className="mb-4">
              <div className="px-4 py-2 text-sm font-semibold text-gray-400 flex items-center">
                <ChevronDown className="w-4 h-4 mr-1" />
                {category.name}
              </div>
              {category.channels.map((channel) => (
                <button
                  key={channel.id}
                  className={`w-full px-4 py-1 text-sm text-gray-300 hover:bg-white/10 flex items-center ${
                    currentChannel?.id === channel.id ? 'bg-white/20' : ''
                  }`}
                  onClick={() => handleChannelSelect(channel)}
                >
                  {channel.type === 'text' ? (
                    <Hash className="w-4 h-4 mr-2 text-gray-400" />
                  ) : (
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                  )}
                  {channel.name}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-yellow-500 mr-2"></div>
              <div>
                <div className="font-semibold">CryptoTrader</div>
                <div className="text-xs text-gray-400">#1234</div>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Channel Header */}
        <div className="h-12 border-b border-white/10 flex items-center px-4">
          <Hash className="w-5 h-5 text-gray-400 mr-2" />
          <span className="font-semibold text-white">{currentChannel?.name || 'Select a channel'}</span>
          <div className="mx-4 h-6 border-l border-white/10"></div>
          <Bell className="w-5 h-5 text-gray-400" />
          <div className="mx-4 h-6 border-l border-white/10"></div>
          <Users className="w-5 h-5 text-gray-400" />
        </div>

        {/* Messages */}
        <div className="flex-grow p-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-yellow-500 mr-3"></div>
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold text-white">{message.author}</span>
                    <span className="ml-2 text-xs text-gray-400">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-300">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
          <div className="flex items-center bg-white/10 rounded-md">
            <Button type="button" variant="ghost" size="icon" className="text-gray-400">
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              type="text"
              placeholder={`Message #${currentChannel?.name || 'channel'}`}
              className="flex-grow bg-transparent border-none focus:ring-0 text-white"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <Button type="button" variant="ghost" size="icon" className="text-gray-400">
              <AtSign className="w-5 h-5" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="text-gray-400">
              <Smile className="w-5 h-5" />
            </Button>
            <Button type="submit" variant="ghost" size="icon" className="text-gray-400">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}