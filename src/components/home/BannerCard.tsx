import Image from "next/image";
import Link from "next/link";

export default function BannerCard(params:any) {
  return (
  <div className="hoverClass" style={{maxWidth: '600px', maxHeight: '150px', borderRadius: '5px'}}>
    <Link href={params.link} passHref>
      <a>
        <Image src={`data:${params.imageType};base64, ${params.image}`} alt=''  width='600' height='150' layout='responsive'/>
      </a>
    </Link>
  </div>
  )
}