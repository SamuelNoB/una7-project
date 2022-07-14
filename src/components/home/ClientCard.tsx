import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface ClientCardProps {
  width?: number;
  height?: number
  externalLink: string
  imageLink: string,
  imageType: string
}

function ClientCard(params: ClientCardProps, ref: any) {
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
  <div className="hoverClass">
    <Link href={params.externalLink} passHref>
      <a href="">
        <Image src={`data:${params.imageType};base64, ${params.imageLink}`} alt="client" width={imageHeight} height={imageWidth} layout='responsive' />
      </a>
    </Link>
  </div>
  )
}
export default React.forwardRef(ClientCard )