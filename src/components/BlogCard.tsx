
import dayjs from "dayjs";
import Link from "next/link";
import { Card, CardBody, CardImg, CardTitle, CardText, CardFooter } from "reactstrap";

interface props {
  params: SmallPublication
  full: boolean
}

function BlogCard({params, full}: props) {
  full = full ?? true;
  
  const dateType = full ? 'LLL' : 'DD/MM/YYYY'
  const minMax = full ? '200px': '150px';
  const displayDate = dayjs(params.createdAt).format(dateType);
  return (
    
      <Link href={'/blog/post/[id]'} as={`blog/post/${params.id}`} passHref >
        <Card
        className="hoverClass"
        color="light"
        >
          <CardImg
          src={`data:${params.imageType};base64, ${params.coverImage}`}
          top
          width={'100%'}
          style={{minHeight: '200px', maxHeight: '200px', objectFit: 'cover'}}
          />
          <CardBody style={{minHeight: minMax, maxHeight: minMax}}>
            <CardTitle tag={'h4'}>
              {params.title}
            </CardTitle>
            {
              full === true ? (
              <CardText style={{height: '100%'}} className="text-truncate">
                {params.subTitle}
              </CardText>
              ) :(
                <>
                  
                </>
              )
            }
            
          </CardBody>
          <CardFooter  className="text-muted">
            Postado Em: {displayDate}
          </CardFooter>
        </Card>
      </Link>
  );
}

export default BlogCard;