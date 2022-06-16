import { Partner } from "@prisma/client";
import Link from "next/link";
import { Card, CardImg, CardTitle, CardImgOverlay } from "reactstrap";



export default function PartnerCard(params: Partner) {
  return (
    <Link
      href={params.link}
      passHref
      >
      <Card inverse style={{height:'45vh'}} className="hoverClass">
        <CardImg
        style={{height: "100%", objectFit: 'cover'}}
        width={'100%'}
        
        src={`data:${params.imageType};base64, ${params.image}`}
        />
        <CardImgOverlay>
          <CardTitle tag='h3'>
            {params.name}
          </CardTitle>
        </CardImgOverlay>
      </Card>
    </Link>

  )
}