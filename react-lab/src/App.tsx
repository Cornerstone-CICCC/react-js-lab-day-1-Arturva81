import { useState, type ChangeEvent, type FormEvent } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import UserForm, { type UserFormData } from './components/UserForm'
import UserList, { type User } from './components/UserList'
import UserProfile from './components/UserProfile'

const EMPTY_FORM: UserFormData = {
  fullname: '',
  age: 0,
  education: '',
  gender: '',
  skills: [],
  bio: '',
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [formData, setFormData] = useState<UserFormData>(EMPTY_FORM)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [nextId, setNextId] = useState(1)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter(s => s !== value),
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: name === 'age' ? Number(value) : value }))
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editingId !== null) {
      setUsers(prev => prev.map(u => u.id === editingId ? { ...formData, id: editingId } : u))
      setSelectedUser(prev => prev?.id === editingId ? { ...formData, id: editingId } : prev)
      setEditingId(null)
      toast.success('User updated successfully!')
    } else {
      const newUser: User = { ...formData, id: nextId }
      setUsers(prev => [...prev, newUser])
      setNextId(prev => prev + 1)
      toast.success('User added successfully!')
    }
    setFormData(EMPTY_FORM)
  }

  const handleClear = () => {
    setFormData(EMPTY_FORM)
    setEditingId(null)
  }

  const handleView = (user: User) => setSelectedUser(user)

  const handleEdit = (user: User) => {
    const { id, ...data } = user
    setFormData(data)
    setEditingId(id)
  }

  const handleDelete = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id))
    if (selectedUser?.id === id) setSelectedUser(null)
    if (editingId === id) {
      setEditingId(null)
      setFormData(EMPTY_FORM)
    }
    toast.error('User deleted.')
  }

  return (
    <>
      <UserForm
        formData={formData}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClear={handleClear}
      />
      <UserList
        users={users}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <UserProfile selectedUser={selectedUser} />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  )
}

export default App
