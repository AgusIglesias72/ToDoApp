'use client'

import { useState } from 'react'
import CreateModal from './Notes/CreateNoteModal'
import { Tooltip } from 'flowbite-react'
import Link from 'next/link'
import useScrollToFooter from '@/hooks/checkScroll'

export default function BottomNavigation({}) {
  const [isDialOpen, setIsDialOpen] = useState(false)
  const [createModal, setCreateModal] = useState<string | undefined>()

  const { distanceFromEnd, isNearEnd } = useScrollToFooter()

  return (
    <>
      <CreateModal openModal={createModal} setOpenModal={setCreateModal} />
      <div
        className={`fixed z-50 w-full h-16 sm:max-w-lg 
      -translate-x-1/2 bg-white border border-gray-200 shadow-xl 
      sm:rounded-full bottom-0 sm:bottom-4
      transition-transform duration-300 ease-in-out transform
      left-1/2 dark:bg-gray-700 dark:border-gray-600
      `}
      >
        <div className="grid h-full sm:max-w-lg grid-cols-5 mx-auto">
          <Tooltip content="Home" placement="top" trigger="hover">
            <Link href="/">
              <button
                data-tooltip-target="tooltip-home"
                type="button"
                className="inline-flex w-full h-full flex-col items-center justify-center px-5 sm:rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <svg
                  className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                <span className="sr-only">Home</span>
              </button>
            </Link>
          </Tooltip>
          <Tooltip content="My Notes" placement="top" trigger="hover">
            <button
              data-tooltip-target="tooltip-wallet"
              type="button"
              className="inline-flex h-full w-full flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <svg
                className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
                <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
              </svg>
              <span className="sr-only">Wallet</span>
            </button>
          </Tooltip>
          <Tooltip content="Create new" placement="top" trigger="hover">
            <div
              className="flex items-center justify-center w-full h-full"
              onClick={() => {
                setCreateModal('form-elements')
                setIsDialOpen(false)
              }}
            >
              <button
                data-tooltip-target="tooltip-new"
                type="button"
                className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group
              hover:transform hover:rotate-90 transition-transform duration-300 ease-in-out
              "
              >
                <svg
                  className="w-4 h-4 text-white
                
                "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
                <span className="sr-only">New item</span>
              </button>
            </div>
          </Tooltip>
          <Tooltip content="Set order" placement="top" trigger="hover">
            <div
              onMouseLeave={() => setIsDialOpen(false)}
              className="w-full h-full"
            >
              <button
                onClick={() => setIsDialOpen(!isDialOpen)}
                data-tooltip-target="tooltip-settings"
                type="button"
                className="inline-flex w-full h-full flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <svg
                  className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                  />
                </svg>
                <span className="sr-only">Settings</span>
              </button>
              <div data-dial-init className="fixed bottom-16 group">
                <div
                  id="speed-dial-menu-dropdown-alternative"
                  className={`relative z-50  mt-2 origin-top-right bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600
                    ${isDialOpen ? 'block' : 'hidden'}
                    `}
                >
                  <ul className="text-sm text-gray-500 dark:text-gray-300">
                    <li className="flex items-center rounded-t-lg px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600 cursor-pointer">
                      <svg
                        className="w-3.5 h-3.5 mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12V1m0 0L4 5m4-4 4 4m3 5v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                        />
                      </svg>
                      <span className="text-sm font-medium">Latest First</span>
                    </li>
                    <li className="flex items-center rounded-t-lg px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600 cursor-pointer">
                      <svg
                        className="w-3.5 h-3.5 mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                        />
                      </svg>
                      <span className="text-sm font-medium">Oldest First</span>
                    </li>

                    <li className="flex items-center rounded-t-lg px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600 cursor-pointer">
                      <svg
                        className="w-3.5 h-3.5 mr-2"
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
                          d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <span className="text-sm font-medium">Random Order</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Tooltip>
          <Tooltip content="Profile" placement="top" trigger="hover">
            <Link href="/profile">
              <button
                data-tooltip-target="tooltip-profile"
                type="button"
                className="inline-flex w-full h-full flex-col items-center justify-center px-5 sm:rounded-r-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <svg
                  className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <span className="sr-only">Profile</span>
              </button>
            </Link>
          </Tooltip>
        </div>
      </div>
    </>
  )
}
