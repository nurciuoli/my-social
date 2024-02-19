import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext'; // Import useUser from your context
import './HomePage.css'
// Dummy posts data
const dummyPosts = [
  { id: 1, title: "First Post", interactions: 10 },
  { id: 2, title: "Second Post", interactions: 5 },
  { id: 3, title: "Third Post", interactions: 15 },
  { id: 4, title: "Fourth Post", interactions: 8 },
  { id: 5, title: "Fifth Post", interactions: 12 },
  { id: 6, title: "Sixth Post", interactions: 3 },
  { id: 7, title: "Seventh Post", interactions: 20 },
  { id: 8, title: "Eighth Post", interactions: 6 },
  { id: 9, title: "Ninth Post", interactions: 18 },
  { id: 10, title: "Tenth Post", interactions: 7 },
  { id: 11, title: "Eleventh Post", interactions: 14 },
  { id: 12, title: "Twelfth Post", interactions: 9 },
  { id: 13, title: "Thirteenth Post", interactions: 16 },
  { id: 14, title: "Fourteenth Post", interactions: 4 },
  { id: 15, title: "Fifteenth Post", interactions: 11 },
];

const HomePage = () => {
  const { user } = useUser();

  // Constants for layout calculations
  const postWidth = 100;
  const postHeight = 100;
  const sectionWidth = 800;
  const sectionHeight = 600;
  const minGap = 25;
  const maxAttempts = 1000;
  const animationDuration = 60; // Duration in seconds

  // Function to generate non-overlapping offsets for posts
  const generateOffsets = (postCount, sectionWidth, sectionHeight, postWidth, postHeight, minGap) => {
    let offsets = [];
    let attempts = 0;
  
    while (offsets.length < postCount && attempts < maxAttempts) {
      let randomX = Math.floor(Math.random() * (sectionWidth - postWidth)-minGap) - minGap;
      let randomY = Math.floor(Math.random() * (sectionHeight - postHeight)) + minGap;
      let position = { x: randomX, y: randomY };
  
      let collision = offsets.some(offset => (
        randomX < offset.x + postWidth + minGap &&
        randomX + postWidth + minGap > offset.x &&
        randomY < offset.y + postHeight + minGap &&
        randomY + postHeight + minGap > offset.y
      ));
  
      if (!collision) {
        offsets.push(position);
      } else {
        attempts++;
      }
    }
  
    if (attempts >= maxAttempts) {
      console.error('Could not place all posts without overlap after maximum attempts');
    }
  
    return offsets;
  };

  // Generate offsets for posts
  const offsets = generateOffsets(dummyPosts.length, sectionWidth, sectionHeight, postWidth, postHeight, minGap);
  
  // Initialize posts state with xOffset and yOffset
  const [posts] = useState(dummyPosts.map((post, index) => ({
    ...post,
    xOffset: offsets[index].x,
    yOffset: offsets[index].y
  })));

  return (
    <div className="home-page">
      <div className="profile-section">
        <div className="profile-content">
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
        </div>
      </div>
      <div className="posts-section">
        <div className="postsContainer">
          {posts.map(post => (
            <div
              key={post.id}
              className="post"
              style={{
                '--interactions': post.interactions,
                left: `${post.xOffset}px`,
                top: `${post.yOffset}px`,
                animationDuration: `${animationDuration}s`
              }}
            >
              {post.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;