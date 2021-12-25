import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async async(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  getInitialProps;

  render() {
    return (
      <Html lang='ja'>
        <Head>
          <meta charSet='UTF-8'></meta>
          <meta name='viewport' content='width=device-width,initial-scale=1' />
          <meta name='description' content='フロントエンジニアの雑記ブログ。Nuxtが好き' />
          <title>Indomitable Willpower</title>
          <link
            href='https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap'
            rel='stylesheet'
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
