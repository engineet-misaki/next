import Link from 'next/link';

const BlogId = ({ blog }) => {
  return (
    <div className='overflow-hidden min-h-screen bg-gray-100'>
      <div className='bg-white'>
        <h2 className='container p-6 mx-auto text-2xl font-bold'>記事詳細</h2>
      </div>
      <div className='container mx-auto'>
        <div className='p-6 md:py-8 md:px-16 m-3 md:m-16 my-8 bg-white rounded-lg shadow-sm'>
          <h1 className='text-2xl font-bold'>{blog.title}</h1>
          {/* <div>
        {blog.tags.map((tag) => (
          <div key={tag.id}>
            <span>{tag.name}</span>
          </div>
        ))}
      </div> */}
          <div className='my-6' dangerouslySetInnerHTML={{ __html: `${blog.body}` }}></div>
        </div>
      </div>
      <br></br>
      <div className='overflow-hidden bg-white'>
        <hr></hr>
        <div>
          <Link href='/blogs'>
            <a className='container block m-12 mx-auto font-bold text-center'>記事一覧画面へ</a>
          </Link>
        </div>
      </div>
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
