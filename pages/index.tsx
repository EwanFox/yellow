import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
export interface PageProps {
  posts: Page[]
}
export interface Page {
  name: string,
  slug: string,
  hex: string
}
export default function Home(props: PageProps) {
  return (
    <>
      <Head>
        <title>Ewan&apos;s Yellows</title>
        <meta name="description" content="Your app for yellow finding!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex items-center justify-center font-mono text-4xl text-white flex-col'>
        <h1 className='mb-4 mt-4'>
          Ewan&apos;s Yellows
        </h1>
        <div className='grid lg:grid-cols-4 md:grid-cols-3'>
          {props.posts.map((post) => {
            return (<div key={post.slug} className='bg-clip-border max-w-xs mx-4 mb-8 rounded-lg shadow-lg bg-slate-800 flex flex-col align-center items-center'>
              <div className={`-clip-border w-full h-36 ${`bg-[${post.hex}]`}`} style={{backgroundColor: post.hex}}></div>
              <div className='px6 py-4'>
                <Link href={`/content/${post.slug}`} className='text-xl font-semibold tracking-tight'>{post.name}</Link>
              </div>
            </div>)
          })}
        </div>




      </main>
    </>
  )
}
export async function getStaticProps() {
  const fs = require('fs');
  const files = fs.readdirSync(`${process.cwd()}/content`, "utf-8");
  const posts = files.filter((fn: string) => fn.endsWith(".json")).map((fn: string) => {
    const path = `${process.cwd()}/content/${fn}`;
    const rawContent = fs.readFileSync(path, {
      encoding: "utf-8",
    });
    let data = JSON.parse(rawContent);
    return { name: data.name, slug: data.slug, hex: data.hex };
  });
  return {
    props: { posts }
  }
}
