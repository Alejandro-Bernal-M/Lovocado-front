'use client'
import { useAppSelector} from "../lib/hooks";
export default function Homepage() {
  const {user} = useAppSelector((state) => state.user);
  return (
    <div>
      <h1> home Page tittle</h1>
      {user.firstName && <h2> Welcome {user.firstName}</h2>}
    </div>
  );
}