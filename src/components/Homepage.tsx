'use client'
import { useAppSelector} from "../lib/hooks";
export default function Homepage() {
  const {name} = useAppSelector((state) => state.user);
  return (
    <div>
      <h1> home Page tittle</h1>
      {name && <h2> Welcome {name}</h2>}
    </div>
  );
}