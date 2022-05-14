
import Link from "next/link";
import { Card, CardBody, CardImg, CardTitle, CardText } from "reactstrap";


const cardStyle = {
  cursor: 'pointer'
}

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
  
  const displayDate = Intl.DateTimeFormat('pt-br', {timeZone: 'UTC'}).format(params.createdAt);
  return (
    
      <Link href={'/blog/post/[id]'} as={`blog/post/${params.id}`} passHref >
        <Card
        style={cardStyle}
        color="light"
          >
          <CardImg
          src={params.image}
          top
          width={'100%'}
          />
          <CardBody>
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