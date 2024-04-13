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
      <button onClick={() => setSignin(true)}>Signin </button>
      <button onClick={() => setSignin(false)}>Signup </button>
      {signin ? <Signin /> : <Signup />}
    </div>
  );
}