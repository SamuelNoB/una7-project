import Image from "next/image";
import Link from "next/link";

export default function BannerCard(params:any) {
  return (
  <div className="hoverClass" style={{maxWidth: '600px', maxHeight: '200px', borderRadius: '5px'}}>
    <Link href={params.link} passHref>
      <a>
        <Image src={'/images/teste.jpg'} alt=''  width='400' height='200' layout='responsive'>
        </Image>
      </a>
    </Link>
  </div>
  )
}