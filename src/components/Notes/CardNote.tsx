'use client'

import { Tooltip } from 'flowbite-react'
import { useState } from 'react'
import DeleteModal from './DeleteModal'
import EditModal from './EditNoteModal'
import { completeNote } from '@/services'
import { redirect } from 'next/navigation'
import LoadingSpinner from '../Loading'

const TrashIcon = () => {
  return (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
      />
    </svg>
  )
}

const EditIcon = () => {
  return (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 18"
    >
      <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
      <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
    </svg>
  )
}

const CompletedTask = () => {
  return (
    <svg
      className="w-6 h-6 "
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 21 21"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"
      />
    </svg>
  )
}

export default function CardNote(note: Note) {
  const { id, title, content, createdAt } = note
  const [deleteModal, setDeleteModal] = useState<string | undefined>()
  const [editModal, setEditModal] = useState<string | undefined>()
  // TO DO => MODAL FOR EDITING NOTES
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()

  const setAsCompleted = async () => {
    setLoading(true)
    try {
      setError(undefined)
      const completeTask = await completeNote(id)
      if (completeTask.status === 401) {
        return redirect('/login')
      }
      if (completeTask.status === 400) {
        return setError(completeTask.message)
      }
      if (completeTask.status === 200) {
        setLoading(false)
        return window.location.reload()
      }
    } finally {
      setLoading(false)
    }
  }

  // WHEN MARKING AS COMPLETED. TOOLTIP MUST BE DISABLED AND BUTTON POINTER SHOULD BE DISABLED

  return (
    <div
      className={`flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 min-w-[400px] max-w-[400px] justify-center
    ${loading ? 'opacity-30' : ''}
    `}
    >
      {loading && <LoadingSpinner />}
      {deleteModal === 'pop-up' && (
        <DeleteModal
          openModal={deleteModal}
          setOpenModal={setDeleteModal}
          id={id}
        />
      )}
      {editModal === 'form-elements' && (
        <EditModal
          openModal={editModal}
          setOpenModal={setEditModal}
          originalNote={note} // SHOULD ONLY PASS REQUIRED PROPS
        />
      )}
      <div className="flex h-full w-full flex-col justify-center gap-4 px-3 pb-4">
        <div className="pt-2 flex flex-col">
          <div className="flex flex-row w-full justify-between items-center">
            <p className="text-left text-sm text-gray-400">
              {new Date(createdAt).toLocaleDateString()}
            </p>
            <div className="flex flex-row gap-2">
              <Tooltip content="Edit">
                <button
                  className="rounded-md m-1
                text-gray-700 dark:text-gray-400 dark:hover:text-white
                transition-colors duration-300 ease-in-out"
                  onClick={() => setEditModal('form-elements')}
                >
                  <EditIcon />
                </button>
              </Tooltip>
              <Tooltip content="Delete">
                <button
                  className="rounded-md m-1
                  text-gray-700 dark:text-gray-400 dark:hover:text-white
                  transition-colors duration-300 ease-in-out
                "
                  onClick={() => setDeleteModal('pop-up')}
                >
                  <TrashIcon />
                </button>
              </Tooltip>
            </div>
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </div>

        <p className="font-normal text-gray-700 dark:text-gray-400 text-center break-words">
          {content}
        </p>

        <div className="mx-auto">
          {note.completed ? (
            <Tooltip content="Task completed" placement="bottom">
              <div
                className="
                  rounded-md py-2 px-3 
                  border-2 border-green-500 dark:border-green-700
                  bg-green-500 dark:bg-green-700 
                  dark:text-gray-400 text-white dark:text-white
                  select-none
                "
              >
                <div className="flex flex-row gap-2">
                  <CompletedTask />
                  <p className="">Completed</p>
                </div>
              </div>
            </Tooltip>
          ) : (
            <Tooltip content="Mark as completed">
              <button
                className="rounded-md py-2 px-3 
              border-2 border-gray-700 hover:border-green-500 dark:hover:border-green-700
              hover:bg-green-500 dark:hover:bg-green-700 
              text-gray-700 dark:text-gray-400 hover:text-white dark:hover:text-white
              transition-colors duration-300 ease-in-out
            "
                onClick={setAsCompleted}
              >
                <div className="flex flex-row gap-2">
                  <CompletedTask />
                  <p className="">Completed</p>
                </div>
              </button>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  )
}
