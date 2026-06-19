import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { v4 as randomId } from 'uuid';
import { NavLink } from 'react-router-dom';
const SignUp = () => {
  let navigate = useNavigate()
  let [formData, setFormData] = useState({   // create a piece of state in that take updateddata i.e formData  &create one object with vempty values
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    id: randomId(),  // generate unique id
    role: 'user'
  })
  let { username, password, email, confirmPassword } = formData; // Destructuring

  let handleChange = (e) => {  //by using handleChange() method we take the data & whenever this method is running it will have one event object i.e 'e' here
    let name = e.target.name
    setFormData({ ...formData, [name]: e.target.value })  // key should be wrapped in [] 
  }

  let handleSubmit = async (e) => {
    e.preventDefault();  // to prevent/stop form Reload wew use this preventDefault() method  
    let alreadyExist = await axios.get(`http://localhost:3000/users?email=${email}`)
    console.log(alreadyExist?.data);
    if (alreadyExist?.data.length > 0) {  // validating data: whether user exists or its empty 
      toast.error('User already exists')
      return;
    }
    if (confirmPassword != password) { // validating the Password whether its matching or not
      toast.error('Password does not match ') // to pop up error message beautifully we use toast
      return;
    }
    if (password.length < 9) {
      toast.error('Password should contain at least 9 characters')
      return;
    }
    else {
      if (username.trim() && password.trim().length > 8 && email.trim().includes('@gmail.com') && confirmPassword.trim()) { // trim() is used to prevent/validate the issue: like when we just give space instead of typing values its accepting signup
        console.log(formData);

        let userData = {
          id: formData.id,
          username,
          email,
          password,
          role: 'user'
        }

        let result = await axios.post(
          'http://localhost:3000/users',
          userData
        )

        console.log(result);

        if (result.status === 201) {  // validating whether request is executed successfully or not
          toast.success('SignUp successfull')
          navigate('/login') // if its successful then navigate/redirect to loginpage by using useNavigate hook 
        }
      }

      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        id: randomId(),
        role: 'user'
      })
    }
  }



  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      {/* create one form to accept the input from user */}
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create Account
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={handleChange}
            name='username'
            placeholder="Enter username"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name='email'
            onChange={handleChange}
            value={email}
            placeholder="Enter email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            name='password'
            type="password"
            value={password}
            onChange={handleChange}

            placeholder="Enter password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            name='confirmPassword'
            type="password"
            value={confirmPassword}
            onChange={handleChange}

            placeholder="Confirm password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Sign Up
        </button>

        {/* Footer text */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <NavLink
            to="/login"
            className="font-medium text-blue-600 hover:underline">
            Login
          </NavLink>
        </p>

      </form>

    </div>
  )
}

export default SignUp



