import ReactPlayerComponent from './ReactPlayer';
import CustomPlayer from './CustomPlayer';
import DyMediaPlayer from "./DyMediaPlayer";
import CustomReactPlayer from "@/app/player/CustomReactPlayer";

const Player = () => {
  const m3u8Source_1 = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
  const m3u8Source_2 = 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';
  const dashSource_1 = 'https://bitmovin-a.akamaihd.net/content/sintel/sintel.mpd';
  const mp4Source_1 = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_30MB.mp4';
  const mp4Source_2 = 'https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4';

  return (
    <div style={{paddingBottom: 100}}>
      <p>react player</p>
      <ReactPlayerComponent source={mp4Source_2}/>

      {/*<p>custom player</p>*/}
      {/*<CustomPlayer source={mp4Source_2}/>*/}

      {/*<p>media player</p>*/}
      {/*<DyMediaPlayer source={mp4Source_2}/>*/}

      <p>custom react player</p>
      <CustomReactPlayer source={mp4Source_2}/>
    </div>
  );
};

export default Player;