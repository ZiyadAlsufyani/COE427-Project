import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

export default function OrderCard({btnmessage = "Terminate" , id, btnColor, removeOrderCard, orderNum = 2830 }) {
  return (
    <Card sx={{ width: 0.20, maxWidth: '100%', boxShadow: 'lg', margin: 1 }}>
      <CardContent>
        <Typography style={{ textAlign: 'center' }} level="title-lg"> Order: {orderNum} </Typography>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color={btnColor} size="lg" onClick={() => removeOrderCard(id)}>
          {btnmessage}
        </Button>
      </CardOverflow>
    </Card>
  );
}