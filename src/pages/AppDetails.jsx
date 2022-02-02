/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useRef } from 'react';
import {
  f7,
  Page,
  Navbar,
  Button,
  Link,
  Icon,
  List,
  ListItem,
} from 'framework7-react';

import RatingStars from '../components/RatingStars';
import AppstoreBlockTitle from '../components/AppstoreBlockTitle';
import ScrenshotThumb from '../components/ScreenshotThumb';

import { apps, games } from '../js/data';

import './AppDetails.less';

function getAppById(id) {
  return [...apps, ...games].find((app) => app.id === parseInt(id, 10));
}
function formatDate(date) {
  const formatter = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' });
  return formatter.format(new Date(date));
}

const AppDetails = ({ id, backText }) => {
  const app = getAppById(id);
  const pb = useRef(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const ratingVotes = {
    5: 500,
    4: 100,
    3: 80,
    2: 50,
    1: 200,
  };

  const totalVotes = Object.values(ratingVotes).reduce((acc, current) => acc + current);

  function pageInit() {
    pb.current = f7.photoBrowser.create({
      photos: [...app.screenshots],
      toolbar: false,
      navbarShowCount: false,
    });
  }
  function pageDestroy() {
    if (pb.current) pb.current.destroy();
  }
  function openPhotoBrowser(index) {
    if (!pb.current) return;
    pb.current.open(index);
  }

  function createAppDescription() {
    return {
      __html: (app.description || '').replace(/\n/g, '<br>'),
    };
  }

  return (
    <Page onPageInit={pageInit} onPageBeforeRemove={pageDestroy}>
      <Navbar
        transparent
        backLink={backText || 'Back'}
        className="app-navbar"
      >
        <div className="app-navbar-icon" slot="title">
          <img src={app.icon} alt={app.title} />
        </div>
        <div className="app-navbar-button" slot="right">
          <Button external target="_blank" href={`https://apps.apple.com/app/id${app.id}`} round fill>GET</Button>
        </div>
      </Navbar>
      <div className="block app-header">
        <img src={app.icon} alt={app.title} className="app-header-icon" />
        <div className="app-header-content">
          <div className="app-header-title">{app.title}</div>
          <div className="app-header-subtitle">{app.subtitle}</div>
          <div className="app-header-actions">
            <Button external target="_blank" href={`https://apps.apple.com/app/id${app.id}`} round fill>GET</Button>
            <Link iconF7="square_arrow_up" />
          </div>
          <div className="app-header-ratings">
            <div className="app-header-rating">
              <div className="app-header-rating-value">{app.rating}</div>
              <RatingStars rating={app.rating} />
              <div className="app-header-rating-sub">930 Ratings</div>
            </div>
          </div>
        </div>
      </div>
      <div className="block app-screenshots">
        {app.screenshotsThumbs.map((screenshot, index) => (
          <ScrenshotThumb
            onClick={() => openPhotoBrowser(index)}
            src={screenshot}
            key={index}
            alt="Screenshot"
          />
        ))}
      </div>
      <div className={`block app-description ${showFullDescription ? 'app-description-full' : ''}`}>
        <div className="app-description-content">
          <div className="app-description-text" dangerouslySetInnerHTML={createAppDescription()} />
          <Link onClick={() => setShowFullDescription(true)}>more</Link>
        </div>
      </div>
      <AppstoreBlockTitle title="Ratings & Reviews">
        <Link>See All</Link>
      </AppstoreBlockTitle>
      <div className="block app-ratings">
        <div className="app-ratings-number">
          <b>{app.rating}</b>
          <span>out of 5</span>
        </div>
        <div className="app-ratings-votes">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div className="app-ratings-votes-row" key={rating}>
              <div className="app-ratings-votes-stars">
                {Array.from({ length: rating }).map((el, index) => (
                  <Icon key={index} f7="star_fill" />
                ))}
              </div>
              <div className="app-ratings-votes-progress">
                <span style={{ width: `${(ratingVotes[rating] / totalVotes) * 100}%` }} />
              </div>
            </div>
          ))}
          <div className="app-ratings-votes-total">{totalVotes} Ratings</div>
        </div>
      </div>
      {/* Random reviews */}
      <div className="block app-reviews">
        <div className="app-review">
          <div className="app-review-header">
            <span><b>John</b></span>
            <span>2d ago</span>
          </div>
          <div className="app-review-header">
            <RatingStars rating={5} />
            <span>johndoe</span>
          </div>
          <div className="app-review-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione laborum debitis natus cum quae est rerum cupiditate cumque delectus eaque ipsa, accusamus facilis deleniti consequuntur, aliquam soluta minima, eos exercitationem.
          </div>
        </div>
        <div className="app-review">
          <div className="app-review-header">
            <span><b>Mike</b></span>
            <span>3d ago</span>
          </div>
          <div className="app-review-header">
            <RatingStars rating={3} />
            <span>johndoe</span>
          </div>
          <div className="app-review-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat pariatur laudantium, laborum sunt adipisci magni in doloremque neque error earum fugiat! Nihil molestias rem tenetur laboriosam illo similique nobis adipisci?
          </div>
        </div>
        <div className="app-review">
          <div className="app-review-header">
            <span><b>Vladimir</b></span>
            <span>3d ago</span>
          </div>
          <div className="app-review-header">
            <RatingStars rating={2} />
            <span>johndoe</span>
          </div>
          <div className="app-review-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, repudiandae minima? Reprehenderit ab placeat delectus necessitatibus suscipit cumque laborum modi, eaque, a consequuntur, pariatur et itaque. Vitae odio necessitatibus amet.
          </div>
        </div>
        <div className="app-review">
          <div className="app-review-header">
            <span><b>Karoly</b></span>
            <span>4d ago</span>
          </div>
          <div className="app-review-header">
            <RatingStars rating={4} />
            <span>johndoe</span>
          </div>
          <div className="app-review-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, ab ex! Architecto alias delectus, optio eos nostrum obcaecati repellat distinctio, ab, quam dolores voluptatem ex inventore facere expedita exercitationem repudiandae?
          </div>
        </div>
        <div className="app-review">
          <div className="app-review-header">
            <span><b>Peter</b></span>
            <span>4d ago</span>
          </div>
          <div className="app-review-header">
            <RatingStars rating={5} />
            <span>johndoe</span>
          </div>
          <div className="app-review-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia illo odit exercitationem eligendi maiores rerum quo, quos ullam quam! Quia facilis consequatur vitae cupiditate molestias maiores odit magnam quo itaque.
          </div>
        </div>
        <div className="app-review">
          <div className="app-review-header">
            <span><b>Alim</b></span>
            <span>5d ago</span>
          </div>
          <div className="app-review-header">
            <RatingStars rating={1} />
            <span>johndoe</span>
          </div>
          <div className="app-review-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque ipsa accusantium qui praesentium, obcaecati quae illum, tempora molestias similique nihil sunt in tempore ipsam laborum illo maxime amet quos consectetur!
          </div>
        </div>
      </div>
      {app.versions && app.versions.length > 0 && (
        <>
          <AppstoreBlockTitle title="What's New" />
          <div className="block">
            <p className="display-flex justify-content-space-between" style={{ opacity: 0.55 }}>
              <span>Version {app.versions[app.versions.length - 1].version}</span>
              <span>{formatDate(app.versions[app.versions.length - 1].release_date)}</span>
            </p>
            <p>{app.versions[app.versions.length - 1].release_notes || ''}</p>
          </div>
        </>
      )}
      <AppstoreBlockTitle title="App Privacy" />
      {/* <section class="l-content-width section section--bordered app-privacy"> */}
        <div className="block app-reviews">
            <div className="app-review">
              <div class="privacy-type__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><path d="M58.595 42c1.544 0 2.405.866 2.405 2.45v7.29c0 6.153-3.087 9.26-9.322 9.26h-7.244C42.861 61 42 60.134 42 58.61c0-1.554.86-2.42 2.434-2.42h7.185c2.91 0 4.6-1.582 4.6-4.69v-7.05c0-1.584.833-2.45 2.376-2.45zm-53.22 0c1.543 0 2.404.866 2.404 2.45v7.05c0 3.108 1.633 4.69 4.601 4.69h7.186c1.573 0 2.434.866 2.434 2.42 0 1.524-.86 2.39-2.434 2.39h-7.244C6.117 61 3 57.922 3 51.74v-7.29C3 42.866 3.83 42 5.375 42zM32 34C42.897 34 48 42.988 48 46.399c0 .949-.48 1.601-1.501 1.601H17.501C16.481 48 16 47.348 16 46.399 16 42.988 21.103 34 32 34zM32 14c4.438 0 8 3.82 8 8.412 0 4.916-3.562 8.618-8 8.588-4.437-.029-8-3.672-8-8.588C24 17.82 27.563 14 32 14zM51.678 3C57.913 3 61 6.076 61 12.231v7.32C61 21.103 60.168 22 58.595 22c-1.514 0-2.375-.896-2.375-2.45V12.5c0-3.108-1.692-4.691-4.601-4.691h-7.185c-1.573 0-2.434-.866-2.434-2.42C42 3.837 42.86 3 44.434 3h7.244zM19.566 3C21.139 3 22 3.836 22 5.39c0 1.553-.86 2.419-2.434 2.419H12.38c-2.968 0-4.601 1.583-4.601 4.69v7.051c0 1.554-.83 2.45-2.404 2.45C3.86 22 3 21.104 3 19.55v-7.319C3 6.076 6.117 3 12.322 3h7.244z"></path></svg>
              </div>
              <h3 class="privacy-type__heading">Data Used to Track You</h3>
              <p class="privacy-type__description">The following data may be used to track you across apps and websites owned by other companies:</p>
                <ul class="privacy-type__items">
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--contact-info" aria-hidden="true"><path d="M32.09 61.568c16.185 0 29.586-13.43 29.586-29.587 0-16.186-13.43-29.587-29.616-29.587-16.157 0-29.558 13.4-29.558 29.587 0 16.156 13.43 29.587 29.587 29.587zm-.29-40.175c-2.176 0-3.917-1.74-3.917-3.945 0-2.204 1.74-3.945 3.916-3.945s3.887 1.74 3.887 3.945-1.711 3.945-3.887 3.945zm-4.961 27.093c-1.247 0-2.205-.9-2.205-2.147 0-1.16.958-2.117 2.205-2.117h3.684V30.588h-3.19c-1.22 0-2.176-.899-2.176-2.146 0-1.16.957-2.118 2.175-2.118h5.627c1.538 0 2.35 1.103 2.35 2.727v15.17h3.684c1.247 0 2.204.958 2.204 2.118 0 1.247-.957 2.147-2.204 2.147H26.839z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Contact Info</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--identifiers" aria-hidden="true"><path d="M52.367 24h-14.76C36.704 24 36 23.342 36 22.51c0-.835.705-1.51 1.606-1.51h14.761c.905 0 1.633.675 1.633 1.51 0 .832-.728 1.49-1.633 1.49m0 10h-14.76C36.704 34 36 33.35 36 32.52c0-.85.705-1.52 1.606-1.52h14.761c.905 0 1.633.67 1.633 1.52 0 .83-.728 1.48-1.633 1.48m0 9h-14.76C36.704 43 36 42.33 36 41.484c0-.83.705-1.484 1.606-1.484h14.761c.905 0 1.633.654 1.633 1.484C54 42.33 53.272 43 52.367 43m-24.04 0H12.66C10.7 43 10 42.459 10 41.401 10 38.288 14.028 34 20.493 34 26.973 34 31 38.288 31 41.401 31 42.46 30.305 43 28.328 43m-7.321-22C23.673 21 26 23.31 26 26.425 26 29.58 23.686 32 21.007 32 18.314 32 16 29.58 16 26.452 15.987 23.359 18.327 21 21.007 21m32.158-10h-42.33C5.645 11 3 13.566 3 18.645V45.33C3 50.408 5.644 53 10.835 53h42.33C58.355 53 61 50.408 61 45.329V18.645C61 13.592 58.356 11 53.165 11"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Identifiers</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--other" aria-hidden="true"><path d="M32.09 61.568c16.185 0 29.586-13.43 29.586-29.587 0-16.186-13.43-29.587-29.616-29.587-16.157 0-29.558 13.4-29.558 29.587 0 16.156 13.43 29.587 29.587 29.587zM18.078 36.332c-2.379 0-4.351-1.944-4.351-4.38 0-2.408 1.972-4.351 4.35-4.351 2.408 0 4.381 1.943 4.381 4.35a4.358 4.358 0 01-4.38 4.38zm13.981 0a4.376 4.376 0 01-4.38-4.38c0-2.408 1.973-4.351 4.38-4.351a4.345 4.345 0 014.351 4.35 4.352 4.352 0 01-4.35 4.38zm13.981 0a4.358 4.358 0 01-4.38-4.38 4.352 4.352 0 014.38-4.351c2.38 0 4.352 1.943 4.352 4.35 0 2.437-1.973 4.38-4.352 4.38z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Other Data</span>
                      </span>
                    </li>
                </ul>
            </div>
            <div className="app-review">
              <div class="privacy-type__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><path d="M32.09 61.568c16.185 0 29.586-13.43 29.586-29.587 0-16.186-13.43-29.587-29.616-29.587-16.157 0-29.558 13.4-29.558 29.587 0 16.156 13.43 29.587 29.587 29.587zm0-4.932c-13.692 0-24.628-10.964-24.628-24.655 0-13.692 10.907-24.656 24.598-24.656 13.691 0 24.656 10.964 24.685 24.656.03 13.69-10.965 24.655-24.656 24.655zm-.03-25.555c4.12.03 7.455-3.48 7.455-8.121 0-4.351-3.336-7.977-7.455-7.977s-7.455 3.626-7.455 7.977c0 4.64 3.336 8.092 7.455 8.121zM18.804 46.687h26.512c1.16 0 1.712-.754 1.712-1.827 0-3.162-4.786-11.4-14.968-11.4-10.181 0-14.967 8.238-14.967 11.4 0 1.073.55 1.827 1.711 1.827z"></path></svg>
              </div>
              <h3 class="privacy-type__heading">Data Linked to You</h3>
              <p class="privacy-type__description">The following data may be collected and linked to your identity:</p>
                <ul class="privacy-type__items">
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--health-and-fitness" aria-hidden="true"><path d="M32.09 61.568c16.185 0 29.586-13.43 29.586-29.587 0-16.186-13.43-29.587-29.616-29.587-16.157 0-29.558 13.4-29.558 29.587 0 16.156 13.43 29.587 29.587 29.587zm-7.224-42.814c3.22 0 5.686 1.827 7.194 4.554 1.509-2.727 4.003-4.554 7.194-4.554 5.076 0 8.73 3.828 8.73 9.137 0 7.832-8.353 14.996-14.415 18.97-.494.348-1.045.725-1.45.725-.378 0-1.016-.406-1.567-.725-6.12-3.887-14.417-11.138-14.417-18.97 0-5.309 3.655-9.137 8.731-9.137z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Health &amp; Fitness</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--purchases" aria-hidden="true"><path d="M15.288 61.992h34.483c5.244 0 8.32-3.047 8.32-9.082V22.588c0-6.035-3.105-9.082-9.199-9.082h-4.688c-.146-6.152-5.507-11.397-12.128-11.397-6.622 0-11.983 5.245-12.13 11.397h-4.658c-6.123 0-9.199 3.018-9.199 9.082V52.91c0 6.065 3.076 9.082 9.2 9.082zm16.788-55.43c4.13 0 7.265 3.106 7.412 6.944H24.663c.147-3.838 3.282-6.943 7.413-6.943z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Purchases</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--financial-info" aria-hidden="true"><path d="M53.666 8.773H9.973c-5.279 0-7.93 2.601-7.93 7.83v4.015h59.553v-4.016c0-5.202-2.627-7.83-7.93-7.83zM13.534 46.53c-1.49 0-2.5-1.01-2.5-2.424v-4.672c0-1.44 1.01-2.425 2.5-2.425h6.188c1.464 0 2.475.985 2.475 2.425v4.672c0 1.414-1.01 2.424-2.475 2.424h-6.188zM9.973 55.27h43.693c5.303 0 7.93-2.627 7.93-7.83V26.352H2.042V47.44c0 5.228 2.652 7.829 7.93 7.829z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Financial Info</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--location" aria-hidden="true"><path d="M7.54 33.695l22.177.088c.41 0 .615.176.615.615l.059 22.12c0 2.782 1.23 5.068 3.545 5.068 2.226 0 3.428-2.08 4.482-4.395L60.86 8.851c.557-1.142.821-2.168.821-3.017 0-1.934-1.436-3.399-3.399-3.399-.878 0-1.904.235-3.046.791L6.895 25.638C4.668 26.664 2.5 27.894 2.5 30.15s2.168 3.545 5.04 3.545z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Location</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--contact-info" aria-hidden="true"><path d="M32.09 61.568c16.185 0 29.586-13.43 29.586-29.587 0-16.186-13.43-29.587-29.616-29.587-16.157 0-29.558 13.4-29.558 29.587 0 16.156 13.43 29.587 29.587 29.587zm-.29-40.175c-2.176 0-3.917-1.74-3.917-3.945 0-2.204 1.74-3.945 3.916-3.945s3.887 1.74 3.887 3.945-1.711 3.945-3.887 3.945zm-4.961 27.093c-1.247 0-2.205-.9-2.205-2.147 0-1.16.958-2.117 2.205-2.117h3.684V30.588h-3.19c-1.22 0-2.176-.899-2.176-2.146 0-1.16.957-2.118 2.175-2.118h5.627c1.538 0 2.35 1.103 2.35 2.727v15.17h3.684c1.247 0 2.204.958 2.204 2.118 0 1.247-.957 2.147-2.204 2.147H26.839z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Contact Info</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--contacts" aria-hidden="true"><path d="M32.09 61.568c16.185 0 29.586-13.43 29.586-29.587 0-16.186-13.43-29.587-29.616-29.587-16.157 0-29.558 13.4-29.558 29.587 0 16.156 13.43 29.587 29.587 29.587zm0-19.696c-8.703 0-15.432 3.104-18.362 6.585-3.916-4.352-6.266-10.124-6.266-16.476 0-13.692 10.907-24.656 24.598-24.656 13.691 0 24.656 10.964 24.686 24.656.028 6.352-2.35 12.124-6.266 16.505-2.93-3.481-9.66-6.614-18.39-6.614zm0-4.931c5.568.058 9.949-4.7 9.949-10.936 0-5.86-4.38-10.732-9.95-10.732-5.57 0-9.978 4.873-9.95 10.732.03 6.237 4.38 10.878 9.95 10.936z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Contacts</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--user-content" aria-hidden="true"><path d="M10.227 24.818c0-6.378 3.38-9.713 9.803-9.713h30.333v-.563c0-4.643-2.366-6.987-7.076-6.987H9.122c-4.732 0-7.076 2.344-7.076 6.987v23.73c0 4.643 2.344 6.964 7.076 6.964h1.105V24.818zm10.14 31.28h34.188c4.687 0 7.076-2.344 7.076-6.986V25.156c0-4.62-2.389-6.964-7.076-6.964H20.368c-4.71 0-7.077 2.322-7.077 6.964v23.956c0 4.642 2.367 6.986 7.077 6.986zm8.655-19.2a5.232 5.232 0 01-5.229-5.229c0-2.862 2.344-5.228 5.229-5.228 2.862 0 5.205 2.366 5.205 5.228 0 2.885-2.343 5.228-5.205 5.228zM20.12 52.47c-2.028 0-3.2-1.15-3.2-3.2v-1.848l3.944-3.583c1.983-1.803 3.155-3.043 4.732-3.043 1.623 0 2.907 1.285 4.98 3.065l2.119 1.893 7.37-6.648c2.478-2.231 4.1-3.741 6.061-3.741 2.006 0 3.696 1.465 6.108 3.741l5.769 5.476v4.688c0 2.05-1.194 3.2-3.2 3.2H20.12z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">User Content</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--search-history" aria-hidden="true"><path d="M32.09 61.568c16.185 0 29.586-13.43 29.586-29.587 0-16.186-13.43-29.587-29.616-29.587-16.157 0-29.558 13.4-29.558 29.587 0 16.156 13.43 29.587 29.587 29.587zm-15.693-33.01c0-6.846 5.598-12.473 12.443-12.473 6.846 0 12.444 5.598 12.444 12.473 0 2.552-.812 4.96-2.146 6.904l7.687 7.744c.493.522.812 1.16.812 1.828 0 1.508-.986 2.581-2.437 2.581-.87 0-1.508-.29-2.117-.928l-7.658-7.629c-1.914 1.19-4.177 1.944-6.585 1.944-6.845 0-12.443-5.628-12.443-12.444zm4.09 0c0 4.554 3.77 8.354 8.353 8.354 4.555 0 8.325-3.8 8.325-8.354 0-4.612-3.77-8.383-8.325-8.383-4.583 0-8.354 3.8-8.354 8.383z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Search History</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--browsing-history" aria-hidden="true"><path d="M32.09 61.568c16.185 0 29.586-13.43 29.586-29.587 0-16.186-13.43-29.587-29.616-29.587-16.157 0-29.558 13.4-29.558 29.587 0 16.156 13.43 29.587 29.587 29.587zM16.918 35.113c-1.16 0-2.03-.87-2.03-2.03 0-1.131.87-2.002 2.03-2.002h13.14V13.532a1.97 1.97 0 012.001-2.001c1.131 0 2.03.87 2.03 2.001v19.551c0 1.16-.899 2.03-2.03 2.03H16.92z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Browsing History</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--identifiers" aria-hidden="true"><path d="M52.367 24h-14.76C36.704 24 36 23.342 36 22.51c0-.835.705-1.51 1.606-1.51h14.761c.905 0 1.633.675 1.633 1.51 0 .832-.728 1.49-1.633 1.49m0 10h-14.76C36.704 34 36 33.35 36 32.52c0-.85.705-1.52 1.606-1.52h14.761c.905 0 1.633.67 1.633 1.52 0 .83-.728 1.48-1.633 1.48m0 9h-14.76C36.704 43 36 42.33 36 41.484c0-.83.705-1.484 1.606-1.484h14.761c.905 0 1.633.654 1.633 1.484C54 42.33 53.272 43 52.367 43m-24.04 0H12.66C10.7 43 10 42.459 10 41.401 10 38.288 14.028 34 20.493 34 26.973 34 31 38.288 31 41.401 31 42.46 30.305 43 28.328 43m-7.321-22C23.673 21 26 23.31 26 26.425 26 29.58 23.686 32 21.007 32 18.314 32 16 29.58 16 26.452 15.987 23.359 18.327 21 21.007 21m32.158-10h-42.33C5.645 11 3 13.566 3 18.645V45.33C3 50.408 5.644 53 10.835 53h42.33C58.355 53 61 50.408 61 45.329V18.645C61 13.592 58.356 11 53.165 11"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Identifiers</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--usage-data" aria-hidden="true"><path d="M49.925 53.844h7.098c3.287 0 4.978-1.572 4.978-4.692V14.52c0-3.12-1.69-4.717-4.978-4.717h-7.098c-3.239 0-4.93 1.596-4.93 4.717v34.632c0 3.12 1.691 4.692 4.93 4.692zm-21.412 0h7.097c3.287 0 4.955-1.572 4.955-4.692V21.475c0-3.12-1.668-4.717-4.955-4.717h-7.097c-3.264 0-4.955 1.596-4.955 4.717v27.677c0 3.12 1.691 4.692 4.955 4.692zm-21.413 0h7.074c3.287 0 4.978-1.572 4.978-4.692V28.406c0-3.12-1.691-4.716-4.978-4.716H7.1c-3.264 0-4.955 1.596-4.955 4.716v20.746c0 3.12 1.691 4.692 4.955 4.692z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Usage Data</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--sensitive-info" aria-hidden="true"><path d="M32.079 50.731c17.644 0 29.847-14.274 29.847-18.723 0-4.472-12.225-18.724-29.847-18.724-17.424 0-29.87 14.252-29.87 18.724 0 4.45 12.446 18.723 29.87 18.723zm0-6.454c-6.873 0-12.314-5.573-12.336-12.27-.022-6.872 5.463-12.269 12.336-12.269 6.806 0 12.313 5.397 12.313 12.27 0 6.696-5.507 12.27-12.313 12.27zm0-7.842c2.445 0 4.472-2.004 4.472-4.427 0-2.445-2.027-4.45-4.472-4.45-2.467 0-4.494 2.005-4.494 4.45 0 2.423 2.027 4.427 4.494 4.427z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Sensitive Info</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--diagnostics" aria-hidden="true"><path d="M29.47 61.996h5.234c1.48 0 2.56-.882 2.873-2.332l1.48-6.258c1.109-.37 2.19-.797 3.128-1.252l5.49 3.357c1.223.768 2.617.654 3.64-.37l3.67-3.64c1.024-1.025 1.166-2.504.341-3.727l-3.356-5.433c.483-.995.91-2.02 1.223-3.043l6.314-1.508c1.45-.313 2.304-1.393 2.304-2.872v-5.149c0-1.45-.853-2.531-2.304-2.844l-6.257-1.508c-.37-1.166-.825-2.218-1.223-3.1l3.356-5.518c.796-1.223.711-2.617-.341-3.64l-3.727-3.67c-1.052-.967-2.303-1.138-3.555-.427l-5.575 3.442c-.91-.483-1.962-.91-3.129-1.28l-1.479-6.343c-.313-1.45-1.393-2.332-2.873-2.332h-5.233c-1.48 0-2.56.882-2.901 2.332l-1.48 6.286c-1.109.37-2.19.797-3.157 1.309l-5.518-3.414c-1.251-.71-2.531-.568-3.584.427l-3.697 3.67c-1.053 1.023-1.166 2.417-.342 3.64l3.328 5.518c-.37.882-.825 1.934-1.194 3.1l-6.258 1.508c-1.45.313-2.304 1.394-2.304 2.844v5.149c0 1.479.853 2.56 2.304 2.872l6.315 1.508c.312 1.024.739 2.048 1.194 3.043L8.85 47.774c-.853 1.223-.682 2.702.342 3.726l3.64 3.641c1.024 1.024 2.446 1.138 3.67.37l5.46-3.357c.968.455 2.02.882 3.13 1.252l1.479 6.258c.34 1.45 1.422 2.332 2.9 2.332zm2.618-19.683c-5.518 0-10.04-4.551-10.04-10.07 0-5.489 4.522-10.011 10.04-10.011 5.518 0 10.04 4.522 10.04 10.012 0 5.518-4.522 10.069-10.04 10.069z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Diagnostics</span>
                      </span>
                    </li>
                    <li classs="privacy-type__item">
                      <span class="privacy-type__grid">
                        <span class="privacy-type__grid-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" class="privacy-type__glyph privacy-type__glyph--other" aria-hidden="true"><path d="M32.09 61.568c16.185 0 29.586-13.43 29.586-29.587 0-16.186-13.43-29.587-29.616-29.587-16.157 0-29.558 13.4-29.558 29.587 0 16.156 13.43 29.587 29.587 29.587zM18.078 36.332c-2.379 0-4.351-1.944-4.351-4.38 0-2.408 1.972-4.351 4.35-4.351 2.408 0 4.381 1.943 4.381 4.35a4.358 4.358 0 01-4.38 4.38zm13.981 0a4.376 4.376 0 01-4.38-4.38c0-2.408 1.973-4.351 4.38-4.351a4.345 4.345 0 014.351 4.35 4.352 4.352 0 01-4.35 4.38zm13.981 0a4.358 4.358 0 01-4.38-4.38 4.352 4.352 0 014.38-4.351c2.38 0 4.352 1.943 4.352 4.35 0 2.437-1.973 4.38-4.352 4.38z"></path></svg>
                        </span>
                        <span class="privacy-type__grid-content privacy-type__data-category-heading">Other Data</span>
                      </span>
                    </li>
                </ul>
            </div>
        </div>
      
      {/* </section> */}
      <AppstoreBlockTitle title="Information" />
      <List noHairlines noChevron className="safe-areas-inset app-information-list">
        <ListItem title="Provider" after={app.developer.name} />
        <ListItem title="Size" after={`${Math.floor(app.size / 1000000)} MB`} />
        <ListItem title="Compatibility" after="Works on this iPhone" />
        <ListItem title="Languages" after="English" />
        <ListItem title="Age Rating" after="12+" />
        <ListItem title="In-App Purchases" after="Yes" />
        <ListItem title="Copyright" after={`© ${app.developer.name}`} />
        <ListItem link={`https://apps.apple.com/developer/id${app.developer.id}`} external target="_blank" title="Developer Website">
          <Icon slot="after" f7="compass" />
        </ListItem>
        <ListItem link={`https://apps.apple.com/developer/id${app.developer.id}`} external target="_blank" title="Privacy Policy">
          <Icon slot="after" f7="hand_raised_fill" />
        </ListItem>
      </List>
    </Page>
  );
};

export default AppDetails;
