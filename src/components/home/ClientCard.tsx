import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


interface ClientCardProps {
  width?: number;
  height?: number
  externalLink: string
  imageLink: string
}

function ClientCard(params: ClientCardProps) {
  const {height, width} = params;
  const [imageHeight, setImageHeight] = useState(300)
  const [imageWidth, setImageWidth] = useState(300)
  if (height) {
    setImageHeight(height);
  }
  if (width) {
    setImageWidth(width)
  }

  return (
  <div >
    <Link href={params.externalLink} passHref>
      <Image src={params.imageLink} alt="client" width={imageHeight} height={imageWidth} layout='responsive' />
    </Link>
  </div>
  )
}
export default ClientCard 