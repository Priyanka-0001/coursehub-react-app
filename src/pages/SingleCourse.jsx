import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Auth } from '../context/AuthContext'
import { CartData } from '../context/CartContext'
import toast from 'react-hot-toast'

const SingleCourse = () => {

    let { id } = useParams()

    let [course, setCourse] = useState(null)

    let { user } = useContext(Auth)
    let { addToCart } = useContext(CartData)

    let getSingleCourse = async () => {

        let result = await axios.get(
            `http://localhost:3000/courses/${id}`
        )

        setCourse(result.data)
    }

    useEffect(() => {
        getSingleCourse()
    }, [])

    if (!course) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-6xl p-6">

            <div className="grid gap-8 rounded-xl bg-white p-6 shadow-lg md:grid-cols-2">

                {/* Left Side Image */}
                <div>
                    <img
                        src={course.course_image}
                        alt={course.cname}
                        className="w-full rounded-lg bg-gray-100 p-4 object-contain"
                    />
                </div>

                {/* Right Side Details */}
                <div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        {course.cname}
                    </h1>

                    <p className="mt-3 text-gray-600">
                        <strong>Author:</strong> {course.course_author}
                    </p>

                    <p className="mt-2 text-gray-600">
                        <strong>Duration:</strong> {course.course_duration}
                    </p>

                    <p className="mt-3 text-2xl font-bold text-blue-600">
                        ₹{course.course_fee}
                    </p>

                    {/* Description */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Description
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            This course provides comprehensive training in
                            {` ${course.cname}`}. Students will learn
                            industry-relevant concepts, build practical projects,
                            and gain hands-on experience to strengthen their
                            development skills.
                        </p>
                    </div>

                    {/* Skills Covered */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Skills Covered
                        </h2>

                        <ul className="grid grid-cols-2 gap-2 text-gray-600">
                            <li>✔ Problem Solving</li>
                            <li>✔ Project Development</li>
                            <li>✔ Industry Concepts</li>
                            <li>✔ Best Practices</li>
                            <li>✔ Real-world Applications</li>
                            <li>✔ Hands-on Learning</li>
                        </ul>
                    </div>

                    {/* Add To Cart Button */}
                    <div className="mt-8">
                        <button
                            onClick={() => {

                                if (!user) {
                                    toast.error('Please login first')
                                    return
                                }

                                addToCart(course)
                            }}
                            className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
                        >
                            Add To Cart
                        </button>
                    </div>

                </div>

            </div>

        </div>
    )

}

export default SingleCourse