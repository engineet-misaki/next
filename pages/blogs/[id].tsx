import Link from 'next/link';

const BlogId = ({ blog }) => {
  return (
    <div className='overflow-hidden relative pb-40 min-h-screen bg-gray-100'>
      <header className='overflow-hidden w-full h-20 bg-white'>
        <div className='container m-6 mx-auto'>
          <Link href='/'>
            <a className='mx-3 text-2xl font-bold font-fancy'>Indomitable Willpower</a>
          </Link>
        </div>
      </header>
      <div className='container mx-auto'>
        <div className='p-6 md:py-8 md:px-16 m-3 md:m-16 my-8 bg-white rounded-xl shadow-sm'>
          <div className='mb-3 text-right'>
            {new Date(blog.updatedAt).toLocaleString().split(' ')[0]}
          </div>
          <h1 className='text-2xl font-bold'>{blog.title}</h1>
          <div className='mt-6'>
            {blog.tags.map((tag) => (
              <span className='py-1 px-2 mr-3 text-gray-600 bg-gray-200 rounded-2xl' key={tag.id}>
                {tag.name}
              </span>
            ))}
          </div>
          <div className='my-6' dangerouslySetInnerHTML={{ __html: `${blog.body}` }}></div>
        </div>
      </div>
      <br></br>
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

export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY },
  };

  const res = await fetch('https://toyama-blog.microcms.io/api/v1/blogs', key);
  const repos = await res.json();

  const paths = repos.contents.map((repo) => `/blogs/${repo.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const key = {
    headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY },
  };

  const res = await fetch(`https://toyama-blog.microcms.io/api/v1/blogs/${id}`, key);
  const blog = await res.json();

  return {
    props: {
      blog: blog,
    },
  };
};

export default BlogId;
