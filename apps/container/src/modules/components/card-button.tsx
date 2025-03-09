import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const CardButton: React.FC<{
  imageUrl: string;
  title: string;
  des: string;
}> = ({ imageUrl, title, des }) => {
  return (
    <Card sx={{ width: 300, height: 400, position: 'relative' }}>
      <CardMedia sx={{ height: 237 }} image={imageUrl} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {des}
        </Typography>
      </CardContent>
      <CardActions sx={{ position: 'absolute', bottom: 0 }}>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};
