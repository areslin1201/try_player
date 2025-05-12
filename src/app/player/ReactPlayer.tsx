'use client';

import React, {useState} from 'react';
import dynamic from 'next/dynamic';

// 動態引入 ReactPlayer，確保其不在伺服器端渲染
const ReactPlayer = dynamic(() => import('react-player'), {ssr: false});

const ReactPlayerComponent = (
  {source}: {
  source: string;
}) => {
  // 控制播放狀態
  const [isPlaying, setIsPlaying] = useState(false);

  // 點擊播放按鈕觸發
  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full h-0" style={{paddingBottom: '56.25%'}}>
      {/* 播放器 */}
      <ReactPlayer
        url={source}
        width="100%"
        height="100%"
        playing={isPlaying}
        controls // 顯示內建的控制器
        style={{position: 'absolute', top: 0, left: 0}}
      />

      {/* 播放按鈕 */}
      {!isPlaying && (
        <div
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            width="64"
            height="64"
          >
            <path d="M7 6v12l10-6z"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default ReactPlayerComponent;

// 'use client';
//
// import React, { useState } from 'react';
// import dynamic from 'next/dynamic';
//
// // 動態引入 ReactPlayer，確保其不在伺服器端渲染
// const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
//
// const ReactPlayerComponent = ({ source }: { source: string }) => {
//   // 控制播放狀態，初始為 true
//   const [isPlaying, setIsPlaying] = useState(true);
//
//   // 點擊播放按鈕觸發
//   const handlePlay = () => {
//     setIsPlaying(true);
//   };
//
//   return (
//     <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
//       {/* 播放器 */}
//       <ReactPlayer
//         url={source}
//         width="100%"
//         height="100%"
//         playing={isPlaying}
//         controls // 顯示內建的控制器
//         style={{ position: 'absolute', top: 0, left: 0 }}
//         muted={true} // 確保靜音
//       />
//
//       {/* 播放按鈕 */}
//       {!isPlaying && (
//         <div
//           onClick={handlePlay}
//           className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="white"
//             viewBox="0 0 24 24"
//             width="64"
//             height="64"
//           >
//             <path d="M7 6v12l10-6z" />
//           </svg>
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default ReactPlayerComponent;
