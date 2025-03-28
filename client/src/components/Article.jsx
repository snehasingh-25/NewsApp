import { Card, CardContent, Typography, Box, styled, Grid } from "@mui/material";

const Component = styled(Card)`
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  margin-bottom: 20px;
  width: 48%; // 
  margin: 1%;
  display: inline-block;
  background-color:rgb(226, 247, 242);
`;

const Container = styled(CardContent)`
  display: flex;
  padding: 8px;
  padding-bottom: 4px !important;
`;

const Image = styled('img')({
  height: 268,
  width: '88%',
  borderRadius: 10,
  objectFit: 'cover'
});

const RightContainer = styled(Box)(({ theme }) => ({
  margin: '5px 0px 0 -25px',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.between('sm', 'lg')]: {
    padding: '0 5px'
  },
  [theme.breakpoints.down('sm')]: {
    margin: '5px 0'
  }
}));

const Title = styled(Typography)`
  font-weight: 300;
  color: #44444d;
  font-size: 22px;
  line-height: 27px;
`;

const Author = styled(Typography)`
  color: #808290;
  font-size: 12px;
  line-height: 22px;
`;

const Description = styled(Typography)`
  line-height: 22px;
  color: #44444d;
  margin-top: 5px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
`;

const Short = styled('b')({
  color: '#44444d',
  fontFamily: "'Convergence', sans-serif"
});

const Publisher = styled(Typography)`
  font-size: 12px;
  margin-top: auto;
  margin-bottom: 10px;
`;

const Article = ({ article }) => {
  // Fallback values for missing data
  //console.log(article); // Debugging: Check API response

  // Fix: Use correct key for image URL
  const imageUrl = article?.urlToImage || article?.image || 'https://via.placeholder.com/300';
  const title = article?.title || 'No Title Available';
  const author = article?.author || 'Unknown Author';
  const description = article?.description || 'No Description Available';
  const publisher = article?.publisher || 'Unknown Publisher';
  const link = article?.url || article?.newsUrl || '#';

  return (
    <Component>
      <Container>
        <Grid container>
          {/* Left Image Section */}
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <Image src={imageUrl} alt={title} />
          </Grid>

          {/* Right Text Section */}
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <RightContainer>
              <Title>{title}</Title>
              <Author>
                <Short>short</Short> by {author} / {new Date(article?.timestamp).toDateString()}
              </Author>
              <Description>{description}</Description>
              <Publisher>
                read more at <a href={link} target="_blank" rel="noopener noreferrer">{publisher}</a>
              </Publisher>
            </RightContainer>
          </Grid>
        </Grid>
      </Container>
    </Component>
  );
};

export default Article;
