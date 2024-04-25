import apiEndPoints from "@/utils/routes";

export default function Signup() {
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
        .then((res) => {
          if(res.ok){
            e.target.reset()
            return res.json()
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

        <button >Signup</button>
      </form>
    </div>
  );
}