import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Words Project</title>
        </Head>
        <Main />
        <NextScript />
      </Html>
    )
  }
}
