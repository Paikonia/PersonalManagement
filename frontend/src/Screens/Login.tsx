import React from 'react'

const Login = () => {
  return (
    <div className="flex justify-center p-4 flex-col items-center">
      <input className="w-full" placeholder="Username or email...." />
      <input className="w-full" placeholder="Password..." />
    </div>
  );
}

export default Login