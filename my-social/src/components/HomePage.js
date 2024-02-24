import React, { useState, useEffect } from 'react';
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
  { id: 12, title: "Discovering New Technologies", interactions: 250 },
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
  const animationDuration = 30; // Define your desired animation duration in seconds
  const animationDelay = 5; // Define your desired delay between posts in seconds
  const [isAnimating, setIsAnimating] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isAnimating && elapsedTime < 20) {
      timer = setTimeout(() => {
        setElapsedTime(elapsedTime + 1);
      }, 1000);
    } else {
      setIsAnimating(false);
    }
    return () => clearTimeout(timer);
  }, [isAnimating, elapsedTime]);

  const handleMouseDown = () => {
    setIsAnimating(true);
    setElapsedTime(0); // Reset the timer when the user holds down the button
  };

  // Function to pause animation
  const handleMouseUp = () => {
    setIsAnimating(false);
  };

   // Function to determine vehicle type based on interactions
  const getVehicleType = (interactions) => {
    if (interactions < 10) {
      return 'sedan';
    } else if (interactions < 50) {
      return 'suv';
    } else {
      return 'bus';
    }
  };
   // Function to assign a lane based on post id
   const getLane = (postId) => {
    return `lane-${((postId - 1) % 4) + 1}`; // This will cycle through lanes 1 to 4
  };

  // Function to calculate the delay for each post based on its index within its lane
  const getAnimationDelay = (postId) => {
    const laneNumber = (postId - 1) % 4;
    const postsInLane = dummyPosts.filter(post => (post.id - 1) % 4 === laneNumber);
    const indexInLane = postsInLane.findIndex(post => post.id === postId);
    return indexInLane * animationDelay; // Delay based on index within the lane
  };

  return (
    <div className="home-page">
        <div className="profile-section">
          <div className="profile-content">
            <h1>{user?.firstName} {user?.lastName}</h1>
            <p>{user?.email}</p>
            <p>{user?.bio}</p>
          </div>
        </div>
        <div className="button-container">
          <button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
            Hold to Resume Posts
          </button>
        </div>
        <div className="posts-section">
        <div className="postsContainer">
          {dummyPosts.map(post => {
            const vehicleType = getVehicleType(post.interactions);
            const lane = getLane(post.id);
            const delay = getAnimationDelay(post.id);
            return (
              <div
                key={post.id}
                className={`vehicle ${vehicleType} ${lane}`}
                style={{
                  animationDuration: `${animationDuration}s`,
                  animationDelay: `${delay}s`,
                  animationPlayState: isAnimating ? 'running' : 'paused',
                }}
              >
                {post.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;