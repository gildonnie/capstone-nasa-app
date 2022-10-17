import React from 'react';
import styled from 'styled-components';
import {
  faFacebook, faTwitter, faInstagram, faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FooterWrap = styled.div`
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  height: 300px;
  margin-top: 3rem;
  background-color: black;
  .fonts {
    svg {
      margin-right: 1.5rem;
     }
  }
  ul {
    list-style: none;
    li {
      color: #00B2A7;
    }
  }
`;

function Footer() {
  return (
    <FooterWrap>
      <div>
        <h1>
          ES
        </h1>
        <p>
          Follow Us On Social Media For Updates!
        </p>
        <div className="fonts">
          <FontAwesomeIcon icon={faFacebook as IconProp} />
          <FontAwesomeIcon icon={faTwitter as IconProp} />
          <FontAwesomeIcon icon={faInstagram as IconProp} />
          <FontAwesomeIcon icon={faYoutube as IconProp} />
        </div>
        <p>
          Contact Us ES@gmail.com
        </p>
        <p>
          © Explore Space,
          {' '}
          {new Date().getFullYear()}
        </p>
      </div>
      <div>
        <h1>Explore ES</h1>
        <ul>
          <li>APOD</li>
          <li>Near Earth Objects</li>
          <li>Rover Images</li>
          <li>Home</li>
        </ul>
      </div>
      <div>
        <h1>About ES</h1>
        <ul>
          <li>Terms & Conditions</li>
          <li>About Us</li>
          <li>About NASA</li>
          <li>Partner With Us</li>
        </ul>
      </div>
    </FooterWrap>
  );
}

export default Footer;
