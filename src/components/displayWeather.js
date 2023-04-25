import { useEffect } from 'react';
import { API } from './lib/api';
import { useState } from 'react';
import '../styles/displayWeather.scss';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function DisplayWeather(city) {
  const [displayLocation, setDisplayLocation] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    API.GET(API.ENDPOINTS.currentWeather(city.city), API.Access)
      .then(({ data }) => {
        setDisplayLocation(data);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsUpdated(false);
  }, [city, isUpdated]);

  const refresh = () => {
    window.location.reload();
  };

  return (
    <Grid
      style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}
    >
      <Card sx={{ width: '20rem' }}>
        <CardContent>
          <div>
            <RefreshIcon onClick={refresh} style={{ float: 'right' }} />
          </div>
          <Typography
            variant='h1'
            sx={{ fontSize: '2rem', textAlign: 'center' }}
            color='text.main'
          >
            {displayLocation?.location.name}
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{ mb: 1.5, fontSize: '1rem', textAlign: 'center' }}
            color='text.secondary'
          >
            {displayLocation?.location.localtime}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              style={{ width: '7rem' }}
              src={displayLocation?.current.condition.icon}
              alt={displayLocation?.current.condition.text}
            />
          </Box>
          <Typography
            variant='body2'
            gutterBottom
            sx={{ fontSize: '1rem', textAlign: 'center' }}
          >
            {displayLocation?.current.condition.text}
          </Typography>
          <Typography
            variant='body2'
            gutterBottom
            sx={{ fontSize: '1rem', textAlign: 'center' }}
          >
            Temp: {displayLocation?.current.temp_c} °C
          </Typography>
          <Typography
            variant='body2'
            gutterBottom
            sx={{ fontSize: '1rem', textAlign: 'center' }}
          >
            Feels like: {displayLocation?.current.feelslike_c} °C
          </Typography>
          <Typography
            variant='body2'
            gutterBottom
            sx={{ fontSize: '1rem', textAlign: 'center' }}
          >
            Wind speed: {displayLocation?.current.wind_mph} mph
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
