"use client"

import React, { useState } from 'react';
import ShareModal from './ShareModal';

interface ShareButtonProps {
  post?: {
    title: string;
    excerpt?: string;
    slug?: { current: string } | string;
    url?: string;
  };
  className?: string;
  variant?: 'button' | 'icon';
}

const ShareButton: React.FC<ShareButtonProps> = ({ 
  post, 
  className = '',
  variant = 'button'
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // 記事データのデフォルト値
  const defaultPost = {
    title: "記事を共有",
    excerpt: "興味深い記事をぜひご覧ください。",
    url: typeof window !== 'undefined' ? window.location.href : ""
  };

  const currentPost = post || defaultPost;
  
  // URLの生成
  const postUrl = currentPost.url || 
    (typeof window !== 'undefined' && post?.slug 
      ? `${window.location.origin}/blog/${typeof post.slug === 'string' ? post.slug : post.slug.current}`
      : (typeof window !== 'undefined' ? window.location.href : "")
    );

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsShareModalOpen(false);
  };

  if (variant === 'icon') {
    return (
      <>
        <button
          onClick={handleShareClick}
          className={`inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 ${className}`}
          aria-label="記事を共有"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" 
            />
          </svg>
        </button>

        <ShareModal
          title={currentPost.title}
          text={currentPost.excerpt || ""}
          url={postUrl}
          isOpen={isShareModalOpen}
          onClose={handleCloseModal}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleShareClick}
        className={`inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${className}`}
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" 
          />
        </svg>
        記事を共有
      </button>

      <ShareModal
        title={currentPost.title}
        text={currentPost.excerpt || ""}
        url={postUrl}
        isOpen={isShareModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ShareButton;
