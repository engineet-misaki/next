import Image from 'next/image';
import Link from 'next/link';

const Home = ({ blogs }) => {
  return (
    <div className='overflow-hidden relative pb-44 min-h-screen bg-gray-100'>
      <header className='overflow-hidden w-full h-20 bg-white'>
        <div className='container m-6 mx-auto'>
          <Link href='/'>
            <a className='mx-3 text-2xl font-bold font-fancy'>Indomitable Willpower</a>
          </Link>
        </div>
      </header>
      <div className='container mx-auto'>
        <div className='overflow-hidden md:py-8 px-6 md:px-16 m-3 md:m-16 my-8 bg-white rounded-xl shadow-sm'>
          {blogs.map((blog) => (
            <article key={blog.id} className='my-6'>
              <Link href='/blogs/[id]' as={`blogs/${blog.id}`}>
                <a className='flex items-center'>
                  <Image
                    src={`/img/thumbnail/${blog.thumbnail}`}
                    alt='thumbnail'
                    width={64}
                    height={64}
                    className='block w-16 rounded-full'
                  />
                  <div className='ml-6 w-10/12'>
                    <h2 className='text-lg'>{blog.title}</h2>
                    <p className='text-xs text-gray-400'>
                      {blog.updatedAt} {blog.auther}
                    </p>
                  </div>
                </a>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <footer className='overflow-hidden absolute bottom-0 w-full bg-white'>
        <div className='container my-6 mx-auto'>
          <p className='text-2xl font-bold text-center font-fancy'>Indomitable Willpower</p>
          <div className='mt-3 text-xs text-center'>
            <Link href='/'>
              <a className='block mt-3 text-gray-500 underline'>記事一覧</a>
            </Link>
            <Link href='/'>
              <a className='block mt-3 text-gray-500 underline'>
                Twitter : Misaki@未経験新卒エンジニア
              </a>
            </Link>
            <p className='mt-3 text-gray-500'>連絡先 : damymisaki@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY },
  };
  const res = await fetch(`https://toyama-blog.microcms.io/api/v1/blogs/`, key);
  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
    },
  };
};

export default Home;
