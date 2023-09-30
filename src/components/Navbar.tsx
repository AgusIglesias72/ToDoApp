'use client'

import { Navbar, Avatar, DarkThemeToggle, Flowbite } from 'flowbite-react'
import Link from 'next/link'

export default function NavbarWithDropdown({
  imageUrl,
}: {
  imageUrl: string | undefined
}) {
  return (
    <>
      <Flowbite>
        <Navbar
          fluid
          className=" w-full bg-white dark:bg-gray-800 dark:text-white px-4 md:px-16 items-center py-0"
          style={{
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Navbar.Brand href="https://flowbite-react.com">
            <img alt="To Do App" className="h-20" src="/logo.svg" />
            {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              To Do App
            </span> */}
          </Navbar.Brand>
          <div className="flex gap-2 md:gap-6 md:order-2">
            <DarkThemeToggle className="ring-0 focus:ring-0" />
            <Link href="/profile" className="rounded-md border-none">
              <Avatar
                alt="User settings"
                img={imageUrl}
                rounded
                size="md"
                className="hidden md:block"
                style={{
                  cursor: 'pointer',
                }}
              />
            </Link>
            <Navbar.Toggle className="ring-0 focus:ring-0" />
          </div>
          <Navbar.Collapse
            style={{
              border: 'none',
            }}
          >
            <div className="w-full m-auto flex flex-col md:flex-row md:gap-10 gap-1">
              <Link href="/" className="rounded-md border-none">
                Home
              </Link>
              <Link
                href="/notes"
                className="rounded-md border-none
              
              "
              >
                My Notes
              </Link>
              <Link href="/contact" className="rounded-md border-none">
                Contact
              </Link>
              <Link href="/profile" className="rounded-md border-none">
                <Avatar
                  alt="User settings"
                  img={imageUrl}
                  rounded
                  size="md"
                  className="md:hidden"
                  style={{
                    cursor: 'pointer',
                  }}
                />
              </Link>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </Flowbite>
    </>
  )
}
