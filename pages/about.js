import Link from"next/link"
const obj = [
  {name: "bag"},
  {name: "tmp"}
]

export default function Home() {
  return (
    <div>
      <ul>
        {obj.map((i) => {
          return (
            <li key={i.name}>
              <Link href={i.name}>
                <p>{i.name}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}