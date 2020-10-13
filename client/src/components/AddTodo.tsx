import React, { FormEvent, useState } from 'react'

type Props = {
  saveTodo: (formData: ITodo | any) => void
}

interface IFormInput {
  name?: string;
  description?: string;
}

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<IFormInput>({ name: '', description: '' });

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveTodo(formData)
    setFormData({ name: '', description: '' })
  }

  return (
    <form className='Form' onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor='name'>Name</label>
          <input onChange={handleForm} type='text' id='name' value={formData?.name}/>
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <input onChange={handleForm} type='text' id='description' value={formData?.description}/>
        </div>
      </div>
      <button disabled={formData === undefined ? true: false} >Add Todo</button>
    </form>
  )
}

export default AddTodo
