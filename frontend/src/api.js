import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const uploadDocument = async (file) => {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const askQuestion = async (question, conversationHistory) => {
  const response = await api.post('/ask', {
    question,
    conversation_history: conversationHistory,
  })

  return response.data
}

export const getDocuments = async () => {
  const response = await api.get('/documents')
  return response
}

export const clearDocuments = async () => {
  const response = await api.delete('/documents')
  return response.data
}

export default api

