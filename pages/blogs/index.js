import Link from 'next/link';

const Home = ({blogs}) => {
  return (
    <div>
      <h2>最新の記事</h2>
      <div>
        
        {console.log(blogs)}
        {blogs.map(blog => (
          <div key={blog.id}>
            <Link href="/blogs/[id]" as={`blogs/${blog.id}`}>
              <a>
                <h2>{blog.title}</h2>
              </a>
            </Link>
            {blog.tags.map(tag => (
              <div key={tag.id}>
                <span>{tag.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: {'X-MICROCMS-API-KEY': process.env.API_KEY},
  };
  const res = await fetch(
    `https://toyama-blog.microcms.io/api/v1/blogs/`,
    key,
  );
  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
    }
  }
};

export default Home;