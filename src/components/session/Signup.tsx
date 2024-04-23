export default function Signup() {
  function handleSignup(e: any) {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
      fetch(process.env.NEXT_PUBLIC_API + "/signup", {
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
        <input name="password" type="password" placeholder="password" />
        <input name="passwordConfirmation" type="password" placeholder="password confirmation" />
        <input name="profileImage" type="file" />

        <button >Signup</button>
      </form>
    </div>
  );
}