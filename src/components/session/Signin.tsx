import apiEndPoints from "@/utils/routes";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { signIn } from "@/lib/features/user/userSlice";
import { getCartItemsDB } from "@/lib/features/cart/cartSlice";


export default function Signin() {
  const {user} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  function handleSignin(e: any) {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get('email')
    const password = data.get('password')
    const body = {
      email,
      password
    }
    console.log(data.get('email'))
    try {
      fetch(apiEndPoints.signin, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(body),
      })
        .then(async(res) => {
          if(res.ok){
            e.target.reset()
            const data = await res.json()
            dispatch(signIn(data))
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            dispatch(getCartItemsDB(data.token))
            return 
          }else if(res.status === 400){
            console.log('error')
            let data = await res.json()
            console.log(data.message)
            return
          }else{
            console.log(res.body)
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
      <h1> Signin Page tittle</h1>
      <form  encType="multipart/form-data"  onSubmit={handleSignin}>
        <input name="email" type="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />

        <button >Signin</button>
      </form>
      {user.firstName && <h2> Welcome {user.firstName}</h2>}
      
    </div>
  );
}