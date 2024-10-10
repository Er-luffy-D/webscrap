import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

export function SimpleCard(props) {
  const {article} = props;
  const navigate = useNavigate(); // Initialize navigate

  const handleReadMore = () => {
    navigate('/card'); // Navigate to /card on button click
  };
  return (
    <Card className="border-solid border-black-500 border-4 mt-10 h-96 w-96 flex flex-col">
      <CardBody className="flex-1 overflow-hidden">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {article.title}
        </Typography>
        <Typography>
          {article.abstract.length > 150
            ? article.abstract.slice(0, 150) + "......"
            : article.abstract}
        </Typography>
        <Typography className="font-bold">
        {typeof article.date === "string" ? article.date.replace(",", " ") : article.date.toString().replace(",", " ")}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={handleReadMore}>Read More</Button>
      </CardFooter>
    </Card>
  );
}
