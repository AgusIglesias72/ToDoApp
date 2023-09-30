'use client'

import { useState } from 'react'
import { Label, Modal } from 'flowbite-react'
import { createNote } from '@/services'
import { redirect } from 'next/navigation'
import LoadingSpinner from '../Loading'

export default function CreateModal({
  openModal,
  setOpenModal,
}: {
  openModal: string | undefined
  setOpenModal: (value: string | undefined) => void
}) {
  const [loading, setLoading] = useState<boolean>(false)

  const props = { openModal, setOpenModal }
  const [noteElements, setNoteElements] = useState<PostNote>({
    title: '',
    content: '',
  })

  const [error, setError] = useState<string | undefined>()

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNoteElements({ ...noteElements, [e.target.id]: e.target.value })
  }

  const submitNote = async () => {
    setLoading(true)
    try {
      setError(undefined)
      const { title, content } = noteElements
      const note = await createNote({
        title,
        content,
      })
      if (note.status === 401) {
        return redirect('/login')
      }
      if (note.status === 400) {
        return setError(note.message)
      }
      if (note.status === 200) {
        setLoading(false)
        return window.location.reload()
      }
      setOpenModal(undefined)
    } finally {
      setLoading(false)
    }
  }
  // TO DO => MAKE A DIV WITH TITLE AND CLOSE BUTTON
  return (
    <>
      <Modal
        show={props.openModal === 'form-elements'}
        size="lg"
        popup
        onClose={() => props.setOpenModal(undefined)}
        dismissible
      >
        <Modal.Header
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.1rem',
          }}
        />
        <Modal.Body>
          <div
            className={`space-y-4
          ${loading ? 'opacity-30' : ''}`}
          >
            <h3
              className="text-xl font-medium text-gray-900 dark:text-white"
              style={{
                position: 'relative',
                paddingTop: '1rem',
              }}
            >
              Create note
            </h3>
            <div>
              <div className="mb-2  block">
                <Label htmlFor="title" value="Title" />
              </div>

              <input
                id="title"
                placeholder="Mandar email al cliente"
                onChange={handleChange}
                required
                className="bg-gray-50  w-full rounded-md py-2 px-2 text-gray-700 leading-5 dark:bg-gray-800 dark:text-gray-300
                    border-b border-gray-300 dark:border-gray-700 focus:outline-none
                "
                style={{
                  border: 'none',
                  borderBottom: '1px solid #e2e8f0',
                  borderRadius: '0',
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Description" />
              </div>
              <textarea
                id="content"
                rows={4}
                placeholder="Enviar presupuesto actualizado a cliente"
                onChange={handleChange}
                required
                className="bg-gray-50  w-full rounded-md py-2 px-2 text-gray-700 leading-5 dark:bg-gray-800 dark:text-gray-300
                    border-b border-gray-300 dark:border-gray-700  focus:ring-0
                "
                style={{
                  border: 'none',
                  borderBottom: '1px solid #e2e8f0',
                  borderRadius: '0',
                }}
              />{' '}
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="text-red-500">{error}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 font-semibold text-white py-2 px-4 rounded
                  focus:outline-none focus:ring-0 
                "
                onClick={submitNote}
              >
                Create Note
              </button>
            </div>
          </div>
          {loading && <LoadingSpinner />}
        </Modal.Body>
      </Modal>
    </>
  )
}
