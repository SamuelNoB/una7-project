import dayjs from "dayjs";
import Link from "next/link";
import { Card, CardBody, CardImg, CardTitle, CardSubtitle, CardText, CardFooter } from "reactstrap";

function BlogCard(params: SmallPublication) {
  const createdDateToDisplay = dayjs(params.createdAt).format('DD/MM/YYYY');

  return (
    
      <Link href={`/blog/post/${params.id}`} passHref>
        <Card
        className="hoverClass"
        color="light"
          >
          <CardImg
          src={'/uploads/'+params.coverImage}
          top
          width={'100%'}
          height={'200px'}
          />
          <CardBody>
            <CardTitle tag={'h4'}>
              {params.title}
            </CardTitle>
            <br />
            <br />
            <CardText className="text-muted">Postado Em: {createdDateToDisplay}</CardText>
          </CardBody>
        </Card>
      </Link>
  );
}

export default BlogCard;