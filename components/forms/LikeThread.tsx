"use client"

import { useState, useEffect } from "react";
import { fetchUserLikes, likeThread } from "@/lib/actions/thread.actions";
import Image from "next/image";

interface Props {
  threadId: string;
  currentMongId: string;
}

function LikeThread({
  threadId,
  currentMongId,
}: Props) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Fetch the thread data from the server and check if the current user has liked it
    const checkLikeStatus = async () => {
      try {
        // Fetch the like status asynchronously
        const isLiked = await fetchUserLikes(JSON.parse(threadId), currentMongId);
        // Update the component state based on the fetched like status
        setLiked(isLiked);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };
    checkLikeStatus();
  }, [threadId, currentMongId]);

  const handleLikeClick = async () => {
    // Toggle the liked state
    setLiked(!liked);

    // Perform the likeThread action
    await likeThread(JSON.parse(threadId), currentMongId);
  };

  return (
    <Image
      src={liked ? '/assets/heart-filled.svg' : '/assets/heart-gray.svg'}
      alt='like'
      width={24}
      height={24}
      className='cursor-pointer object-contain'
      onClick={handleLikeClick}
    />
  );
}

export default LikeThread;