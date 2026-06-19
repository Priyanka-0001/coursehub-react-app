import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Course from './Course'

const CourseList = () => {
  const [allCourses, setAllCourses] = useState([])

  const getCourses = async () => {
    const res = await axios.get('http://localhost:3000/courses')
    setAllCourses(res.data)
  }

  const deleteCourse = async (id) => {

    let confirmDelete = window.confirm(
      'Are you sure you want to delete this course?'
    )

    if (!confirmDelete) {
      return
    }

    await axios.delete(
      `http://localhost:3000/courses/${id}`
    )

    setAllCourses(
      allCourses.filter(course => course.id !== id)
    )
  }

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">

      <div className="mb-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-center text-white">

        <h1 className="text-4xl font-bold mb-4">
          Master In-Demand Tech Skills
        </h1>

        <p className="text-lg">
          Explore courses in Java, Python, React, MERN Stack,
          Spring Boot, Angular, and DevOps.
        </p>

      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {allCourses.map((el) => (
          <Course
            {...el}
            key={el.id}
            onDelete={deleteCourse}
          />
        ))}
      </div>
    </div>
  )
}

export default CourseList