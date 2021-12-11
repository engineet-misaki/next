import Link from 'next/link';

export default function Home() {
  return (
    <Link href="/blogs">
      <a>記事一覧画面へGo</a>
    </Link>
  )
}