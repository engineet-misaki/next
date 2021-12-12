import Image from 'next/image';
import Link from 'next/link';

const Home = ({ blogs }) => {
  return (
    <div className='overflow-hidden h-screen bg-gray-100'>
      <div className='bg-white'>
        <h2 className='container p-6 mx-auto text-2xl font-bold'>記事一覧</h2>
      </div>
      <div className='container mx-auto'>
        <div className='py-8 px-16 m-16 bg-white rounded-lg shadow-sm'>
          {blogs.map((blog) => (
            <article key={blog.id} className='my-6'>
              <Link href='/blogs/[id]' as={`blogs/${blog.id}`}>
                <a className='flex items-center'>
                  <Image
                    src={`/img/thumbnail/${blog.thumbnail}.png`}
                    alt='thumbnail'
                    width={64}
                    height={64}
                    className='pr-3 rounded-full'
                  />
                  <div className='ml-6'>
                    <h2 className='text-lg'>{blog.title}</h2>
                    <p className='text-xs text-gray-400'>
                      {blog.updatedAt} {blog.auther}
                    </p>
                  </div>
                </a>
              </Link>
              {/* {blog.tags.map((tag) => (
              <div key={tag.id}>
                <span>{tag.name}</span>
              </div>
            ))} */}
            </article>
          ))}
        </div>
      </div>
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
