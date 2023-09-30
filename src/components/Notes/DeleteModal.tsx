'use client'

import { Button, Modal } from 'flowbite-react'
import { deleteNote } from '@/services'
import { useState } from 'react'
import LoadingSpinner from '../Loading'
import { redirect } from 'next/navigation'

const ExclamationCircleIcon = () => {
  return (
    <svg
      className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  )
}

export default function DeleteModal({
  openModal,
  setOpenModal,
  id,
}: {
  openModal: string | undefined
  setOpenModal: (value: string | undefined) => void
  id: number
}) {
  const [loading, setLoading] = useState<boolean>(false)
  const props = { openModal, setOpenModal }

  const handleDelete = async () => {
    setLoading(true)

    try {
      const delNote = await deleteNote(id)
      if (delNote.status === 401) {
        return redirect('/login')
      }
      if (delNote.status === 400) {
        return alert(delNote.message)
      }
      if (delNote.status === 200) {
        return window.location.reload()
      }
    } finally {
      setLoading(false)
      props.setOpenModal(undefined)
    }
  }

  return (
    <>
      <Modal
        show={props.openModal === 'pop-up'}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div
            className={`text-center
          ${loading ? 'opacity-30' : ''}
          `}
          >
            <ExclamationCircleIcon />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this note?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                No, cancel
              </Button>
            </div>
          </div>
          {loading && <LoadingSpinner />}
        </Modal.Body>
      </Modal>
    </>
  )
}
