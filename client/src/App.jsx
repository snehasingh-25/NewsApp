import { useState, useEffect } from "react";
// import './App.css'
import Header from './components/Header'
import InfoHeader from './components/InfoHeader'
import { Box, Typography, styled } from '@mui/material';
import Articles from './components/Articles';
const Container=styled(Box)`
  margin:10px auto;
`
function App() {
  const [location, setLocation] = useState("INDIAN");
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;

        // Reverse Geocoding API
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
          .then(res => res.json())
          .then(data => {
            const city = data.address.city || data.address.state || "India"; // Default to India
            setLocation(city);
          });
      });
    }
  }, []);
  return (
    <>
      <Box>
      <Header location={location} setLocation={setLocation} />
      
      <Container>
        <Articles location={location} />
      </Container>
      </Box>

    </>
  )
}

export default App
