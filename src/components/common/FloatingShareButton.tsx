"use client"

import React, { useState, useEffect } from 'react';
import ShareModal from './ShareModal';

interface FloatingShareButtonProps {
  post?: {
    title: string;
    excerpt?: string;
    slug?: { current: string } | string;
    url?: string;
  };
  className?: string;
}

const FloatingShareButton: React.FC<FloatingShareButtonProps> = ({ 
  post, 
  className = ''
}) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

  // スクロール位置に応じてボタンの表示を制御
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <>
      {/* フローティング共有ボタン */}
      <div 
        className={`fixed right-6 bottom-20 z-40 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        } ${className}`}
      >
        <div className="flex flex-col items-center space-y-3">
          {/* メインの共有ボタン */}
          <button
            onClick={handleShareClick}
            className="group relative inline-flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 animate-pulse hover:animate-none"
            aria-label="記事を共有"
          >
            <svg 
              className="w-6 h-6 transition-transform group-hover:scale-110" 
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
            
            {/* ツールチップ */}
            <div className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              記事を共有
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </button>
          
          {/* 共有ラベル */}
          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            共有
          </span>
        </div>
      </div>

      {/* 共有モーダル */}
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

export default FloatingShareButton;
