import apiEndPoints from "@/utils/routes";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { signIn } from "@/lib/features/user/userSlice";
import { useState } from "react";

export default function Signup() {
  const {user} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  function validatePasswordSecurity() {
    const password = document.querySelector('input[name="password"]') as HTMLInputElement
    if(password.value.length < 8){
      password.style.borderColor = 'red'
    }
    else{
      password.style.borderColor = 'green'
    }
  }

  function validatePasswordMatch() {
    const password = document.querySelector('input[name="password"]') as HTMLInputElement
    const passwordConfirmation = document.querySelector('input[name="passwordConfirmation"]') as HTMLInputElement
    if(password.value !== passwordConfirmation.value){
      passwordConfirmation.style.borderColor = 'red'
    }
    else{
      passwordConfirmation.style.borderColor = 'green'
    }
  }

  function validatePassword(password: string, passwordConfirmation: string) {
    if(password !== passwordConfirmation){
      return false
    }
    return true
  }

  function handleSignup(e: any) {
    e.preventDefault();
    const data = new FormData(e.target);
    const password = data.get('password')
    const passwordConfirmation = data.get('passwordConfirmation')
    if(!validatePassword(password as string, passwordConfirmation as string)){
      console.log('passwords do not match')
      return
    }
    try {
      fetch(apiEndPoints.signup, {
        method: "POST",
        body: data,
      })
        .then(async (res) => {
          if(res.ok){
            e.target.reset()
            const password = document.querySelector('input[name="password"]') as HTMLInputElement
            const passwordConfirmation = document.querySelector('input[name="passwordConfirmation"]') as HTMLInputElement
            password.style.borderColor = 'black'
            passwordConfirmation.style.borderColor = 'black'      
            const data = await res.json()
            dispatch(signIn(data))
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            return
          }else{
            throw new Error('error')
          }
        }
        )
        .then((data) => {
          console.log('success')
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const [admin, setAdmin] = useState(false);

  return (
    <div>
      <h1> Signup Page tittle</h1>
      <form encType="multipart/form-data"  onSubmit={handleSignup}>
        <input name="firstName" type="text" placeholder="firstName" />
        <input name="lastName" type="text" placeholder="lastName" />
        <input name="email" type="email" placeholder="email" />
        <input name="username" type="text" placeholder="username" />
        <input name="contactNumber" type="text" placeholder="contact number" />
        <input name="password" type="password" placeholder="password" onKeyUp={validatePasswordSecurity}/>
        <input name="passwordConfirmation" type="password" placeholder="password confirmation" onKeyUp={validatePasswordMatch}/>
        <input name="profileImage" type="file" />
        <input name="role" type="hidden" value={admin ? 'admin' : 'user'} readOnly />
        <input name="adminPassword" type="text" placeholder="admin password" style={admin ? {display: 'block'} : {display: 'none'}}/>

        <button >Signup</button>
      </form>
      <button onClick={() => setAdmin(!admin)}>Admin</button>
    </div>
  );
}