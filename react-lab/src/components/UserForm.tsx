import { type ChangeEvent, type FormEvent } from 'react'

export type UserFormData = {
  fullname: string
  age: number
  education: string
  gender: string
  skills: string[]
  bio: string
}

type UserFormProps = {
  formData: UserFormData
  editingId: number | null
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onClear: () => void
}

const EDUCATION_OPTIONS = ['Grade school', 'High school', 'College']
const GENDER_OPTIONS = ['Male', 'Female', 'Other']
const SKILLS_OPTIONS = ['TypeScript', 'React', 'Node', 'NoSQL']

const UserForm = ({ formData, editingId, onChange, onSubmit, onClear }: UserFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>{editingId !== null ? 'Edit User' : 'Add User'}</h2>

      <div>
        <label htmlFor="fullname">Full Name</label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          value={formData.fullname}
          onChange={onChange}
          required
        />
      </div>

      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={onChange}
          min={0}
          required
        />
      </div>

      <div>
        <label htmlFor="education">Education</label>
        <select
          id="education"
          name="education"
          value={formData.education}
          onChange={onChange}
          required
        >
          <option value="">-- Select --</option>
          {EDUCATION_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div>
        <fieldset>
          <legend>Gender</legend>
          <div className="inline-options">
            {GENDER_OPTIONS.map(opt => (
              <label key={opt}>
                <input
                  type="radio"
                  name="gender"
                  value={opt}
                  checked={formData.gender === opt}
                  onChange={onChange}
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <fieldset>
          <legend>Skills</legend>
          <div className="inline-options">
            {SKILLS_OPTIONS.map(skill => (
              <label key={skill}>
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  checked={formData.skills.includes(skill)}
                  onChange={onChange}
                />
                {skill}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={onChange}
        />
      </div>

      <div className="form-buttons">
        <button type="submit">{editingId !== null ? 'Save User' : 'Add User'}</button>
        <button type="button" onClick={onClear}>Clear</button>
      </div>
    </form>
  )
}

export default UserForm
