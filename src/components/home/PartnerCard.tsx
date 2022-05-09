import Link from "next/link";
import { Card, CardImg, CardTitle, CardImgOverlay } from "reactstrap";

export default function PartnerCard(params: any) {
  return (
    <Link
      href={'https://www.youtube.com/'}
      passHref
      >
      <Card inverse style={{height:'45vh'}}>
        <CardImg
        style={{height: "100%"}}
        width={'100%'}
        
        src={'/images/rocket2.jpg'}
        />
        <CardImgOverlay>
          <CardTitle tag='h3'>
            Parceiro 1
          </CardTitle>
        </CardImgOverlay>
      </Card>
    </Link>

  )
}