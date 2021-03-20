import React, { useState } from 'react';
import {Input} from '../components/atoms/Input/Input';
import Heading from '../components/atoms/Heading/Heading';
import styled from 'styled-components';
import {bookPopular} from '../data/bookPopular.js';
import harry from '../assets/img/harry.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {carouselSettings} from '../data/carouselSettings';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { 
  searchBook
} from '../actions';
import SearchBookList from '../components/SearchBookList/SearchBookList';

import './slider-arrow.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const BookPopularWrapper=styled.div`
    max-width: 200px;
    min-width: 200px;
    height:300px;
    /* min-width: 200px;
    min-height:300px; */
    margin-right:10px;
`;


const MainPage = ({searchbooks,search}) => {

      const [searchFormValue,setSearchFormValue]=useState('');

      const handleChangeSearchFormValue=(e)=>{
          setSearchFormValue(e.target.value);
          search(e.target.value);
      }
  
      const map=searchbooks.map(item=><SearchBookList key={item.id} {...item}/>);
  

    return ( 
        <>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <Input className="input" 
                            type="text" 
                            placeholder="Search title book" 
                            onChange={handleChangeSearchFormValue} 
                            value={searchFormValue}
                        />
                    <span className="icon is-small is-left">
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                </p>
            </div> 

            {searchFormValue.length<=2&&(
              <>
                <div className="notification is-warning">
                        <FontAwesomeIcon icon={faExclamationCircle} /> Enter <strong>three</strong> characters to start searching for books.
                </div>
                <Heading>Popular Books</Heading>
                <Slider {...carouselSettings}>
                {bookPopular.map(item=>(
                        <>
                          
                          <BookPopularWrapper key={item.id}>
                          <Link to={{ pathname: `/book/${item.title}`, query: {...item}}}>
                              <img src={harry} alt={item.title}/>
                              {/* {item.title}*/}
                          </Link>
                          </BookPopularWrapper>
                        </>
                    ))} 
                </Slider>  
              </>
            )}
            {map}

        </>
     );
}
 
const mapStateToProps=({searchbooks})=>{
  return {searchbooks}
}

const mapDispatchToProps=dispatch=>{
  return {
      search:(phrase)=>dispatch(searchBook(phrase))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainPage);