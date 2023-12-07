import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const hex = router.query.hex as string

  let tinycolor = require('tinycolor2')
    let color = tinycolor(hex);
    return (
        <div className="flex flex-col items-center align-center font-mono break-normal">
            <Head>
        <title>#{router.query.hex as string}</title>
        <meta name="description" content={`#${router.query.hex as string} on Ewan's Yellows`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <h1 className="text-white text-4xl font-mono mb-8 mt-4 font-semibold">{"#" + hex}</h1>
        <div className="w-48 h-48 rounded-md mb-4" style={{backgroundColor: ("#" + hex)}}></div>
        <h1 className="text-white text-xl mb-2">Hex: {"#" + hex}</h1>
        <h1 className="text-white text-xl mb-2">RGB: {color.toRgbString()}</h1>
        <h1 className="text-white text-xl mb-2">HSL: {color.toHslString()}</h1>
        <h1 className="text-white text-xl mb-2">HSV: {color.toHsvString()}</h1>
        <h1 className="text-white text-xl mb-2">Brightness(0-255): {color.getBrightness()}</h1>
        <h1 className="text-white text-xl mb-2">Luminance(0-1): {color.getLuminance()}</h1>
        <h1 className="text-white text-xl mb-4">Alpha(0-1): {color.getAlpha()}</h1>
        <h1 className="text-white text-2xl font-mono mb-4 mt-4 font-semibold">Related Colours</h1>
        <h1 className="text-white text-xl mb-2">Complement: <Link  href={`/colour/${color.complement().toHexString().slice(1)}`}>{color.complement().toHexString()}</Link></h1>
        <div className="w-12 h-12 rounded-md mb-4" style={{backgroundColor: color.complement().toHexString()}}></div>
        <h1 className="text-white text-xl mb-2">Triad: {color.triad().map((color: any, i: number) => [
            i > 0 && ", ",
            <Link  key={color.hex} href={`/colour/${color.toHexString().slice(1)}`}>{color.toHexString()}</Link>
        ])}</h1>
        <div className="flex">
            {color.triad().map((color: any) => {
                return <div key={color.hex} className="w-12 h-12 rounded-md" style={{backgroundColor: color.toHexString()}}></div>
            })}
            
        </div>
        <h1 className="text-white text-xl mb-2">Tetrad: {color.tetrad().map((color: any, i : number) => [
            i > 0 && ", ",
            <Link  key={color.hex} href={`/colour/${color.toHexString().slice(1)}`}>{color.toHexString()}</Link>
        ])}</h1>
        <div className="flex">
            {color.tetrad().map((color: any) => {
                return <div key={color.hex} className="w-12 h-12 rounded-md" style={{backgroundColor: color.toHexString()}}></div>
            })}
            
        </div>
        </div>)
}

export default Post