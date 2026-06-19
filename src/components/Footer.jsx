import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-8 md:grid-cols-2">

          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              CourseHub
            </h2>

            <p className="mt-3 text-sm text-gray-400 max-w-md">
              Learn industry-relevant skills with expert-designed courses
              and hands-on learning experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-sm">
              <Link
                to="/"
                className="hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/"
                className="hover:text-white transition"
              >
                Courses
              </Link>

              <span className="cursor-default text-gray-400">
                Privacy Policy
              </span>
            </div>
          </div>

        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} CourseHub. All rights reserved.
        </div>

      </div>
    </footer>

  )
}

export default Footer