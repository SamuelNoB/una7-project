import Link from "next/link";
import { Card, CardBody, CardImg, CardTitle, CardSubtitle, CardText, CardFooter } from "reactstrap";

function BlogCard(params: any) {

  return (
    
      <Card
      className="hoverClass"
      color="light"
        >
        <CardImg
        src={'/images/mountain.jpeg'}
        top
        width={'100%'}
        />
        <CardBody>
          <CardTitle tag={'h4'}>
            Blog Post
          </CardTitle>
          <br />
          <br />
      
          <CardText className="text-muted">Postado Em: 22/04/2022</CardText>
        </CardBody>
      </Card>
  );
}

export default BlogCard;