// 'use client';
//
// import React, { useState, useRef, useEffect } from 'react';
// import dynamic from 'next/dynamic';
//
// // 动态加载 ReactPlayer
// const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
//
// const ReactPlayerComponent = ({ source }: { source: string }) => {
//   const [isPlaying, setIsPlaying] = useState(false); // 播放状态
//   const [muted, setMuted] = useState(false); // 静音状态
//   const [volume, setVolume] = useState(0.8); // 音量
//   const [played, setPlayed] = useState(0); // 已播放进度
//   const [duration, setDuration] = useState(0); // 视频总时长
//   const [isControlVisible, setIsControlVisible] = useState(true); // 控制栏显示状态
//   const [showRecommendations, setShowRecommendations] = useState(false); // 是否显示推荐视频
//
//   const playerRef = useRef<any>(null); // 引用播放器实例
//   const controlTimeout = useRef<number | null>(null); // 定时器用于隐藏控制栏
//
//   const recommendedVideos = [
//     {
//       id: 1,
//       title: '推薦影片 1',
//       thumbnail: 'https://via.placeholder.com/150',
//       source: 'https://www.example.com/video1.mp4',
//     },
//     {
//       id: 2,
//       title: '推薦影片 2',
//       thumbnail: 'https://via.placeholder.com/150',
//       source: 'https://www.example.com/video2.mp4',
//     },
//     {
//       id: 3,
//       title: '推薦影片 3',
//       thumbnail: 'https://via.placeholder.com/150',
//       source: 'https://www.example.com/video3.mp4',
//     },
//   ];
//
//   // 播放或暂停
//   const togglePlayPause = () => {
//     setIsPlaying(!isPlaying);
//     if (!isPlaying) {
//       setShowRecommendations(false); // 恢复播放时隐藏推荐列表
//     } else {
//       setShowRecommendations(true); // 暂停时显示推荐列表
//     }
//   };
//
//   // 静音切换
//   const toggleMute = () => {
//     setMuted(!muted);
//   };
//
//   // 更新播放进度
//   const handleProgress = (state: { played: number }) => {
//     setPlayed(state.played);
//   };
//
//   // 加载完成后获取时长
//   const handleDuration = (dur: number) => {
//     setDuration(dur);
//   };
//
//   // 拖动进度条跳转
//   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newTime = parseFloat(e.target.value);
//     setPlayed(newTime / duration);
//     if (playerRef.current) {
//       playerRef.current.seekTo(newTime); // 跳转到指定时间
//     }
//   };
//
//   // 切换推荐视频播放
//   const playRecommendedVideo = (videoSource: string) => {
//     if (playerRef.current) {
//       playerRef.current.seekTo(0); // 跳转到开始时间
//     }
//     setIsPlaying(true); // 自动播放新视频
//     console.log('播放推薦影片:', videoSource);
//   };
//
//   // 显示/隐藏控制栏
//   const toggleControls = () => {
//     setIsControlVisible(!isControlVisible);
//     if (controlTimeout.current) {
//       clearTimeout(controlTimeout.current);
//     }
//     if (isControlVisible) {
//       controlTimeout.current = window.setTimeout(() => setIsControlVisible(false), 3000);
//     }
//   };
//
//   // 组件卸载时清除计时器
//   useEffect(() => {
//     return () => {
//       if (controlTimeout.current) {
//         clearTimeout(controlTimeout.current);
//       }
//     };
//   }, []);
//
//   return (
//     <div
//       className="relative w-full h-0 bg-black"
//       style={{ paddingBottom: '56.25%' }}
//       onClick={toggleControls} // 点击屏幕显示/隐藏控制栏
//     >
//       {/* 播放器 */}
//       <ReactPlayer
//         ref={playerRef}
//         url={source}
//         width="100%"
//         height="100%"
//         playing={isPlaying}
//         muted={muted}
//         volume={volume}
//         onProgress={handleProgress}
//         onDuration={handleDuration}
//         controls={false} // 禁用默认控制栏
//         style={{ position: 'absolute', top: 0, left: 0 }}
//       />
//
//       {/* 自定义控制栏 */}
//       {isControlVisible && !showRecommendations && (
//         <div
//           className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-70 text-white flex items-center justify-between transition-opacity duration-300"
//         >
//           {/* 播放/暂停按钮 */}
//           <button onClick={togglePlayPause}>
//             {isPlaying ? 'Pause' : 'Play'}
//           </button>
//
//           {/* 音量控制 */}
//           <div className="flex items-center">
//             <button onClick={toggleMute}>
//               {muted ? 'Unmute' : 'Mute'}
//             </button>
//             <input
//               type="range"
//               min="0"
//               max="1"
//               step="0.1"
//               value={muted ? 0 : volume}
//               onChange={(e) => setVolume(parseFloat(e.target.value))}
//             />
//           </div>
//
//           {/* 进度条 */}
//           <div className="flex items-center w-full">
//             <span className="mr-2">{(played * duration).toFixed(2)}s</span>
//             <input
//               type="range"
//               min="0"
//               max={duration}
//               step="0.1"
//               value={played * duration}
//               onChange={handleSeek}
//               className="w-full"
//             />
//             <span className="ml-2">{duration.toFixed(2)}s</span>
//           </div>
//         </div>
//       )}
//
//       {/* 暂停时的推荐视频列表 */}
//       {showRecommendations && !isPlaying && (
//         <div
//           className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 text-white flex flex-col justify-center items-center"
//           style={{ zIndex: 10 }}
//         >
//           <h2 className="text-2xl font-semibold mb-4">精彩推荐</h2>
//
//           <div className="grid grid-cols-3 gap-4 w-4/5">
//             {recommendedVideos.map((video) => (
//               <div
//                 key={video.id}
//                 className="flex flex-col items-center cursor-pointer"
//                 onClick={() => playRecommendedVideo(video.source)}
//               >
//                 <img
//                   src={video.thumbnail}
//                   alt={video.title}
//                   className="w-full rounded-lg"
//                 />
//                 <p className="text-center text-sm mt-2">{video.title}</p>
//               </div>
//             ))}
//           </div>
//
//           <button
//             onClick={togglePlayPause}
//             className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             返回播放
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default ReactPlayerComponent;

'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// 动态加载 ReactPlayer
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const ReactPlayerComponent = ({ source }: { source: string }) => {
  const [isPlaying, setIsPlaying] = useState(true); // 播放状态
  const [played, setPlayed] = useState(0); // 已播放比例
  const [buffered, setBuffered] = useState(0); // 缓冲比例
  const [duration, setDuration] = useState(0); // 视频总时长
  const playerRef = useRef<any>(null); // 引用播放器实例

  // 切换播放和暂停
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // 当播放进度改变时触发
  const handleProgress = (state: { played: number; loaded: number }) => {
    setPlayed(state.played); // 已播放比例
    setBuffered(state.loaded); // 缓冲比例
  };

  // 加载完成时获取时长
  const handleDuration = (dur: number) => {
    setDuration(dur);
  };

  // 跳转播放位置
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration; // 将百分比转换为时间
    if (playerRef.current) {
      playerRef.current.seekTo(newTime);
    }
    setPlayed(parseFloat(e.target.value) / 100); // 同步更新 UI
  };

  return (
    <div className="relative w-full h-0 bg-black" style={{ paddingBottom: '56.25%' }}>
      {/* 播放器 */}
      <ReactPlayer
        ref={playerRef}
        url={source}
        width="100%"
        height="100%"
        playing={isPlaying}
        onProgress={handleProgress}
        onDuration={handleDuration}
        controls={false} // 禁用默认控制条
        style={{ position: 'absolute', top: 0, left: 0 }}
      />

      {/* 自定义控制栏 */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-70 text-white">
        {/* 播放/暂停按钮 */}
        <button onClick={togglePlayPause} className="px-4 py-2 bg-blue-500 rounded-md">
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        {/* 进度条容器 */}
        <div className="relative w-full h-4 mt-4 bg-white rounded-full overflow-hidden">
          {/* 已缓冲部分（蓝色） */}
          <div
            className="absolute top-0 left-0 h-full bg-blue-300"
            style={{ width: `${buffered * 100}%` }}
          ></div>

          {/* 已播放部分（粉红色） */}
          <div
            className="absolute top-0 left-0 h-full bg-pink-500"
            style={{ width: `${played * 100}%` }}
          ></div>

          {/* 进度条的隐藏输入 */}
          <input
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            type="range"
            min="0"
            max="100"
            value={played * 100}
            onChange={handleSeek}
          />
        </div>
      </div>
    </div>
  );
};

export default ReactPlayerComponent;