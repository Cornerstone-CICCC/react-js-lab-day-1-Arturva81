import { type User } from './UserList'

type UserProfileProps = {
  selectedUser: User | null
}

const UserProfile = ({ selectedUser }: UserProfileProps) => {
  if (!selectedUser) {
    return (
      <div>
        <h2>User Profile</h2>
        <p>Select a user to view their profile.</p>
      </div>
    )
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>ID:</strong> {selectedUser.id}</p>
      <p><strong>Full Name:</strong> {selectedUser.fullname}</p>
      <p><strong>Age:</strong> {selectedUser.age}</p>
      <p><strong>Education:</strong> {selectedUser.education}</p>
      <p><strong>Gender:</strong> {selectedUser.gender}</p>
      <p><strong>Skills:</strong> {selectedUser.skills.join(', ')}</p>
      <p><strong>Bio:</strong> {selectedUser.bio}</p>
    </div>
  )
}

export default UserProfile
