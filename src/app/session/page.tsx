'use client'
import { useAppSelector, useAppDispatch } from "../../lib/hooks";
import { useState } from "react";
import Signin from "@/components/session/Signin";
import Signup from "@/components/session/Signup";

export default function Session() {
  const [signin, setSignin] = useState(true);

  // const dispatch = useAppDispatch();
  // const {token} = useAppSelector((state) => state.user);
  return (
    <div>
      {signin ?
        <>
          <Signin /> 
          <button onClick={() => setSignin(false)}>Do not have an account? Signup </button>
        </>
        :
        <>
          <Signup />
          <button onClick={() => setSignin(true)}>Already have an account? Signin </button>
        </>
        }
    </div>
  );
}