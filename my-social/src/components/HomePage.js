import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext'; // Import useUser from your context
import './HomePage.css'
// Dummy posts data with random titles
const dummyPosts = [
  { id: 1, title: "Mysteries of the Ocean", interactions: 10 },
  { id: 2, title: "The Hidden Treasures", interactions: 5 },
  { id: 3, title: "Adventures in Space", interactions: 15 },
  { id: 4, title: "Secrets of the Pyramids", interactions: 8 },
  { id: 5, title: "Journey Through Time", interactions: 12 },
  { id: 6, title: "Exploring the Amazon", interactions: 3 },
  { id: 7, title: "Tales of the Desert", interactions: 20 },
  { id: 8, title: "The Lost City of Atlantis", interactions: 6 },
  { id: 9, title: "The Art of Meditation", interactions: 18 },
  { id: 10, title: "Cooking with Spices", interactions: 7 },
  { id: 11, title: "The World of Dreams", interactions: 14 },
  { id: 12, title: "Discovering New Technologies", interactions: 9 },
  { id: 13, title: "The Science of Happiness", interactions: 16 },
  { id: 14, title: "The Power of Mindfulness", interactions: 4 },
  { id: 15, title: "Unraveling Historical Myths", interactions: 11 },
  { id: 16, title: "The Evolution of Art", interactions: 13 },
  { id: 17, title: "Breaking Down Quantum Physics", interactions: 2 },
  { id: 18, title: "Climbing the Tallest Mountains", interactions: 19 },
  { id: 19, title: "The Philosophy of Time", interactions: 17 },
  { id: 20, title: "The Future of Robotics", interactions: 6 },
  { id: 21, title: "The Beauty of Astronomy", interactions: 8 },
  { id: 22, title: "Understanding the Human Brain", interactions: 5 },
  { id: 23, title: "The Language of Music", interactions: 12 },
  { id: 24, title: "The Mystery of Black Holes", interactions: 20 },
  { id: 25, title: "The Intricacies of Chess", interactions: 9 },
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
  const [posts] = useState(dummyPosts.map((post, index) => {
    const offset = offsets[index];
    // Check if the offset is defined for the current post
    if (offset) {
      return {
        ...post,
        xOffset: offset.x,
        yOffset: offset.y
      };
    } else {
      // Provide a fallback position or handle the error appropriately
      console.error(`No offset found for post with id ${post.id}`);
      return {
        ...post,
        xOffset: 0, // Fallback X position
        yOffset: 0, // Fallback Y position
      };
    }
  }));

  return (
    <div className="home-page">
      <div className="profile-section">
        <div className="profile-content">
          <h1>{user?.firstName} {user?.lastName}</h1>
          <p>{user?.email}</p>
          <p>{user?.bio}</p>
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