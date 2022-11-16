import React from 'react';
import styled from 'styled-components';
// import TsParticles from '../components/tsParticles';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
// import Space from '../images/space.jpg';
// import Space3 from '../images/space3.jpg';
import Earth from '../images/earth.jpg';
import Earth2 from '../images/windowEarth.jpg';
import Nav from '../components/NavBar';

const BackImg = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${Earth});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  h1 {
    margin: 0;
    padding-top: 5rem;
    text-align: center;
    font-size: 90px;
  }
  h2 {
    margin: 0;
    padding-top: 1rem;
    text-align: center;
    font-size: 20px;
  }
`;
const InfoContainer = styled.div`
background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Earth2});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
div {
  width: 1200px;
  text-align: center;
  margin-left: 50%;
  transform: translate(-50%);
  h1 {
    color: #96B1AD;
  }
}
  
`;

const Button = styled.button`
  width: 299px;
  height: 60px;
  color: red;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #00B2A7;
  color: #00B2A7;
  &:hover {
    cursor: pointer;
    border: 1px solid #96B1AD;
    color: #96B1AD;
  }
  a {
    text-decoration: none;
    color: white;
  }
`;
const ButtonWrap = styled.div`
  p {
    color: #96B1AD;
  }
`;

function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        transition={{ delay: 0.4 }}
      >
        <BackImg>
          <Nav />
          <h1>ES</h1>
          <h2>Explore Space</h2>
        </BackImg>
      </motion.div>
      {/* <TsParticles /> */}
      <InfoContainer>
        <div>
          <h1>Who is NASA?</h1>
          <p>
            The National Aeronautics and Space Administration is America’s civil space program and
            the global leader in space exploration. The agency has a diverse workforce of just under
            18,000 civil servants, and works with many more U.S. contractors, academia, and
            international and commercial partners to explore, discover, and expand knowledge for the
            benefit of humanity. With an annual budget of $23.2 billion in Fiscal Year 2021, which
            is
            less than 0.5% of the overall U.S. federal budget, NASA supports more than 312,000 jobs
            across the United States, generating more than $64.3 billion in total economic output (
            Fiscal Year 2019). At its 20 centers and facilities across the country – and the only
            National Laboratory in space – NASA studies Earth, including its climate, our Sun, and
            our solar system and beyond. We conduct research, testing, and development to advance
            aeronautics, including electric propulsion and supersonic flight. We develop and fund
            space technologies that will enable future exploration and benefit life on Earth.NASA
            also leads a Moon to Mars exploration approach, which includes working with U.S.
            industry, international partners, and academia to develop new technology, and send
            science research and soon humans to explore the Moon on Artemis missions that will help
            prepare for human exploration of the Red Planet. In addition to those major missions,
            the
            agency shares what it learns so that its information can make life better for people
            worldwide. For example, companies use NASA discoveries and technologies to create new
            products for the public. To ensure future success for the agency and the nation, NASA
            also supports education efforts in STEM with an emphasis on increasing diversity in our
            future workforce.
          </p>
          {/* <Img /> */}
        </div>
        <div>
          <h1>What is Explore Space (ES)?</h1>
          <p>
            Here in ES we use NASAs Public APIs and explore the wonders of space. There are
            three APIs that we tap into.
            <p>
              The first one is the APOD API. One of the most
              popular websites at NASA is the Astronomy Picture of the Day. In fact,
              this website is one of the most popular websites across all federal
              agencies. It has the popular appeal of a Justin Bieber video. This
              endpoint structures the APOD imagery and associated metadata so that
              it can be repurposed for other applications.
            </p>
            <p>
              The second one is Asteroids - NeoWs. With NeoWs a user can: search
              for Asteroids based on their closest approach date to Earth, lookup
              a specific Asteroid with its NASA JPL small body id, as well as browse
              the overall data-set.
            </p>
            <p>
              Lastly is the Mars Rover Photos API. This API is designed to collect image
              data gathered by NASA’s Curiosity, Opportunity, and Spirit rovers on Mars
              and make it more easily available to other developers, educators, and citizen
              scientists. This API is maintained by Chris Cerami.Each rover has its own set
              of photos stored in the database, which can be queried separately. There are
              several possible queries that can be made against the API. Photos are organized
              by the sol (Martian rotation or day) on which they were taken, counting up from
              the rover’s landing date. A photo taken on Curiosity’s 1000th Martian sol
              exploring Mars, for example, will have a sol attribute of 1000. If instead
              you prefer to search by the Earth date on which a photo was taken, you can do
              that, too
            </p>
          </p>
        </div>
        <ButtonWrap>
          <h1>Explore These Features By Signing Up!</h1>
          <Link to="/signup"><Button type="button">Sign Up</Button></Link>
          <p>Already a Member?</p>
          <Link to="/signin"><Button type="button">Sign In</Button></Link>
        </ButtonWrap>
      </InfoContainer>
      <Footer />
    </>
  );
}

export default Home;
