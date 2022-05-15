
import Link from "next/link";
import { useState } from "react";
import { Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap";


const cardStyle = ({hover}: any) => ({
  cursor: 'pointer',
  backgroundColor: hover ? 'rgba(229, 226, 226, 0.42)' : ''
})

interface PostCard {
  id: string | number,
  image: string,
  title: string,
  subtitle?: string,
  createdAt: Date,
}

interface props {
  params: PostCard
}

function BlogCardFull({params}: props) {
  const [hover, setHover] = useState(false)
  const displayDate = Intl.DateTimeFormat('pt-br', {timeZone: 'UTC'}).format(params.createdAt);
  return (
    
      <Link href={'/blog/post/[id]'} as={`blog/post/${params.id}`} passHref >
        <Card
        style={cardStyle(hover)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        color="light"
          >
          <CardImg
          src={params.image}
          top
          width={'100%'}
          />
          <CardBody
          style={cardStyle(hover)}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          >
            <CardTitle tag={'h4'}>
              {params.title}
            </CardTitle>
            <CardText style={{height: '100%'}} className="text-truncate">
              {params.subtitle}
            </CardText>
            <br />
            <br />
            <CardText className="text-muted">Postado Em: {displayDate}</CardText>
          </CardBody>
        </Card>
      </Link>
  );
}

export default BlogCardFull;