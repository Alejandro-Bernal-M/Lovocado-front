'use client'
import { useAppSelector} from "../lib/hooks";

export default function Homepage() {
  const {user} = useAppSelector((state) => state.user);
  const { homeSections } = useAppSelector((state) => state.homeSections);
  return (
    <div>
      <h1>Lovacado web store</h1>
      {homeSections.map((section) => {
        return (
          <div key={section._id}>
            <h3>{section.title}</h3>
            <img src={`${process.env.NEXT_PUBLIC_IMAGES}${section.image}`} alt={section.title} width={100}  />
            {section.paragraphs && section.paragraphs.map((paragraph, index) => {
              return <p key={index}>{paragraph}</p>
            })}
          </div>
        )
      })}
    </div>
  );
}