'use client'

import { useState } from 'react'
import { Label, Modal } from 'flowbite-react'
import { editNote } from '@/services'
import { redirect } from 'next/navigation'
import LoadingSpinner from '../Loading'

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-x"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M18 6l-12 12"></path>
      <path d="M6 6l12 12"></path>
    </svg>
  )
}

export default function EditModal({
  originalNote,
  openModal,
  setOpenModal,
}: {
  originalNote: Note
  openModal: string | undefined
  setOpenModal: (value: string | undefined) => void
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()

  const props = { openModal, setOpenModal }

  const [noteElements, setNoteElements] = useState<PostNote>({
    title: originalNote.title,
    content: originalNote.content,
  })

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNoteElements({ ...noteElements, [e.target.id]: e.target.value })
  }

  const handleEdit = async () => {
    setLoading(true)
    try {
      setError(undefined)
      const { title, content } = noteElements
      const id = originalNote.id
      const note = await editNote(
        {
          title,
          content,
        },
        id
      )
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
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Body>
          <div
            className={`space-y-4
          ${loading ? 'opacity-30' : ''}`}
          >
            <div className="flex flex-row justify-between items-center pt-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Edit note
              </h3>

              <div
                className="hover:bg-gray-100 dark:hover:bg-gray-700
                rounded-md p-1  cursor-pointer
                text-gray-500 dark:text-gray-300
              "
                onClick={() => props.setOpenModal(undefined)}
              >
                <CloseIcon />
              </div>
            </div>
            <div>
              <div className="mb-2  block">
                <Label htmlFor="title" value="Title" />
              </div>

              <input
                id="title"
                placeholder="Mandar email al cliente"
                onChange={handleChange}
                value={noteElements.title}
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
                placeholder="Mandar email al cliente"
                onChange={handleChange}
                value={noteElements.content}
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
                onClick={handleEdit}
              >
                Edit Note
              </button>
            </div>
          </div>
          {loading && <LoadingSpinner />}
        </Modal.Body>
      </Modal>
    </>
  )
}
