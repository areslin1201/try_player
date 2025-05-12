'use client';

import dynamic from 'next/dynamic';

// 延遲加載 SimplePlayer，只在客戶端渲染，不進行 SSR
const DyMediaPlayer = dynamic(() => import('./MediaPlayer'), { ssr: false });

export default DyMediaPlayer;