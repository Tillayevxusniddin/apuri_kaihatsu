import React from 'react';

interface YouTubeEmbedProps {
  videoUrl: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoUrl }) => {
  return (
    <div className="aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden shadow-lg h-full">
      <iframe
        src={`${videoUrl}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default YouTubeEmbed;

