'use client';

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface CustomVideoPlayerProps {
  source: string;
  width?: number | string;
}

const isM3U8 = (url: string) => url.endsWith('.m3u8');

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
  source,
  width = 600,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true); // 初始狀態設為 true，自動播放
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // hls.js 初始化
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (isM3U8(source) && !video.canPlayType('application/vnd.apple.mpegurl')) {
      hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, () => {
        setError('影片無法播放，請確認網址或格式是否正確。');
      });
    } else {
      video.src = source;
    }

    // 嘗試自動播放
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // 如果自動播放失敗，保持暫停並提示用戶
        setIsPlaying(false);
        setError('自動播放失敗，請手動點擊播放按鈕。');
      });

    // 銷毀 hls 實例
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [source]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setError('影片無法播放，請確認網址或格式是否正確。');
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const duration = video.duration || 0;
    setProgress(
      duration && !isNaN(duration)
        ? (video.currentTime / duration) * 100
        : 0
    );
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const duration = video.duration || 0;
    if (duration === 0 || isNaN(duration)) return;
    const newTime = (Number(e.target.value) / 100) * duration;
    video.currentTime = newTime;
    setProgress(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = Number(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    const duration = video.duration || 0;
    setProgress(
      duration && !isNaN(duration)
        ? (video.currentTime / duration) * 100
        : 0
    );
  };

  const handleError = () => {
    setError('影片無法播放，請確認網址或格式是否正確。');
  };

  if (!source) {
    return <div style={{ color: 'red' }}>未提供影片網址</div>;
  }

  return (
    <div
      style={{
        width,
        background: '#222',
        padding: 16,
        borderRadius: 8,
        color: '#fff',
      }}
    >
      {error && (
        <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>
      )}
      <video
        ref={videoRef}
        width="100%"
        controls={false}
        autoPlay
        muted // 確保瀏覽器允許靜音自動播放
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
        style={{ borderRadius: 8, background: '#000' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
        <button
          onClick={handlePlayPause}
          style={{
            marginRight: 8,
            background: '#444',
            color: '#fff',
            border: 'none',
            padding: '6px 16px',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          {isPlaying ? '暫停' : '播放'}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleProgressChange}
          style={{ flex: 1, marginRight: 8 }}
        />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          style={{ width: 80 }}
        />
      </div>
    </div>
  );
};

export default CustomVideoPlayer;