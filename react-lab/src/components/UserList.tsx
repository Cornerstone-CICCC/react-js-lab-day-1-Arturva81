import { type UserFormData } from './UserForm'

export type User = UserFormData & { id: number }

type UserListProps = {
  users: User[]
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (id: number) => void
}

const UserList = ({ users, onView, onEdit, onDelete }: UserListProps) => {
  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={3}>No users yet.</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>
                  <button type="button" onClick={() => onView(user)}>View</button>
                  <button type="button" onClick={() => onEdit(user)}>Edit</button>
                  <button type="button" onClick={() => onDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
