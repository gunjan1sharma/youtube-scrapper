import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import DownloadImage from "../assets/images/download.png";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Root } from "../extras/types";
import VideoInfo from "../components/VideoInfo";
import VideoInfoComponent from "../components/VideoInfo";

const API_BASE_URL = `http://192.168.1.88:5001/extras/v1/api/youtube/video-info?videoUrl=`;
var static_video_url = "";

const sampleResponse: Root = {
  message: "success",
  videoUrl: "https://youtu.be/P-z3aLhp9w4?si=7Z8powxCY5o0TswE",
  videoInfo: {
    title:
      "Aawara Shaam Hai | Meet Bros Ft. Piyush Mehroliyaa | Manjul, Rits Badiani, Shabbir | Hit Song",
    description:
      "The official video of our most Romantic song of 2019, #AawaraShaamHai ! Go hear it now on all audio platforms! ♪  https://mbmusic.fanlink.to/aawarashaamhai\n\nMusic by Meet Bros, sung by Piyush Mehroliya & Lyrics by  Shabbir Ahmed. Featuring Manjul Khattar & Rits Badiani. The video was shot in Shimla by Bideowale Frame Singh.\n\n#MeetBros #PiyushMehroliyaa #ManjulKhattar #RitsBadiani #Trending #GaanaOriginals\n\nFOR MEET BROS & PIYUSH SHOW BOOKING - CONTACT RUCHIR -  9820980000\n\nMB Music is bringing more awesome music for you guys in the coming months so don't forget to Subscribe MB Music : http://bit.ly/SubscribeMBMusic  \n\n--------------------------------------------------------------------------------------------------\nCredits:\n\nSong - Aawara Shaam hai\nMusic - Meet Bros\nSinger - Meet Bros ft. Piyush Mehroliyaa\nLyrics - Shabbir Ahmed\nActor - Manjul Khattar & Rits Badiani\nProgrammed By - Aditya Dev\nGuitars - Pawan Rasaily\nChief Music Assistant & Music Production Head - Uddipan Sharma\nMusic Asst. - Saheb Khan, Piyush Mehroliyaa, Monis Ahmed\nSong Recorded By - Gautam Chakrabortty, Uddipan Sharma & Saheb Khan at Meet Bros Recording Studio \nMix And Mastered By -  Gautam Chakrabortty at Meet Bros Recording Studio\nProduction Managed By - Suraj Kumar, Ruchir Saxena\n\n------------------------------------------------------------------------------------------------\n\n♪ AVAILABLE ON \n\n♪Gaana ; https://gaana.com/song/aawara-shaam-hai\n\n♪ Spotify - https://open.spotify.com/album/0BQZf1njTasEfHzODW19Sq\n\n♪ Wynk - https://wynk.in/music/album/aawara-shaam-hai/pc_EK2892\n\n♪ iTunes -  https://music.apple.com/us/album/aawara-shaam-hai-feat-piyush-mehroliyaa-single/1474053321?ls=1&app=itunes\n\n♪ Apple Music - https://music.apple.com/us/album/aawara-shaam-hai-feat-piyush-mehroliyaa-single/1474053321?ls=1\n\n♪ Jiosaavn - https://www.jiosaavn.com/album/aawara-shaam-hai/V8YNlDBrUO8_\n\n♪ Amazon Music -  https://music.amazon.in/albums/B08DFZ46N5\n\n♪ Hungama - https://www.hungama.com/album/aawara-shaam-hai/55040395/\n\n♪ Resso  - https://m.resso.app/UELUQv/\n\n♪ KKbox  - https://www.kkbox.com/tw/tc/song/P.o00aJ1WA5vCEMxvCEMx0XL-index.html\n\n\n----------------------------------------------------------------------------------------------------------\n\nTo Set Caller Tune Dial Below Codes\n\n♪ Aawara Shaam Hai\nFor Airtel Hello Tunes Dial 5432117153364\nFor Vodafone Caller Tunes Dial 53711501735\nFor Idea Dial Tones Dial 53711501735\nBSNL East & South SMS BT 11501735 to 56700\nMTNL Subscribers SMS PT 11501735 to 56789\n\n♪ Subah Meri Aur Raat Bhi\nFor Airtel Hello Tunes Dial 5432117154091\nFor Vodafone Caller Tunes Dial 53711501755\nFor Idea Dial Tones Dial 53711501755\nBSNL East & South SMS BT 11501755 to 56700\nMTNL Subscribers SMS PT 11501755 to 56789\n\n-----------------------------------------------------------------------------------------------------------\n\nMB Music Team:-\n\nCo-Founder & Label Head:  Raajeev Sharma\nDigital Marketing: Aakash Kumar \nOperations Head: Mitasha Paintal\nAdmin And HR: Madiha Merchant, Vidhi Saraswat, and Yashashree Dasari\n\nGAANA:\nHead- Content & Partnership - Manisha Dey\n\n-----------------------------------------------------------\n Video\n\nFilm By - Bideowale Frame Singh  \nProducer: MB Music\nDirectors - Puneet S Bedi  & Mohit Midda\nDOP - Shoeb Siddiqui \nEditor - Dilpreetvfx\nStill Making - Daas Films\nProduction - Sai Film Productions\nVisual Effects - Fx Corner Studios\nMakeup - Anthea Makeovers\nChoreographer - Sahil\nChild Artist - Lavanya Mittal\nAssistants - Raman, Vivek, Ajay\n\n\nLike/Follow us on:\n\nMB MUSIC\nFacebook: https://www.facebook.com/mbmusicofficial/  \nInstagram: https://www.instagram.com/mbmusicco/\nTwitter: https://twitter.com/MBMusic_Co\n\nMANMEET SINGH\nInstagram:  https://www.instagram.com/meet_bros_manmeet/\nTwitter: https://twitter.com/Mann_meetbros  \n\nHARMEET SINGH\nInstagram: https://www.instagram.com/harmeet_meetbros/ \nTwitter: https://twitter.com/MeetBrosHarmeet \n\nPIYUSH MEHROLIYAA\nInstagram: https://www.instagram.com/piyushmehroliyaa/\n\nMANJUL KHATTAR\nhttps://www.instagram.com/manjullll/\n\nRITS BADIANI\nhttps://www.instagram.com/rits_badiani/\n\nDon't Forget To Like, Comment And Share!!!!!!\n\nManaged and Promoted by ERIK Business Consultancy, Mumbai",
    totalView: "224361170",
    channelName: "MB Music",
    hqThumbnail: {
      url: "https://i.ytimg.com/vi_webp/P-z3aLhp9w4/maxresdefault.webp",
      width: 1920,
      height: 1080,
    },
    durationInMinutes: 5.518983333333333,
  },
};

function HomePage(props: any) {
  const [videoUrl, setVideoUrl] = useState("");
  const [audioResponse, setAudioResponse] = useState<Root>(sampleResponse);
  const [playVideo, setPlayVideo] = useState(false);
  const [isTermsAggred, setIsTermsAggred] = useState(true);
  const [isDownloadSuccess, setIsDownloadSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // setIsDownloadSuccess(true);
    return () => {};
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): any {
    setVideoUrl(event.target.value);
    console.log(event.target.value);
    console.info(videoUrl);
    if (videoUrl !== "" || videoUrl.includes("youtu")) {
      setPlayVideo(true);
    } else {
      setPlayVideo(false);
    }
  }

  function mimicDownload() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }

    if (videoUrl === "" || !videoUrl.startsWith("https://youtu")) {
      alert("A Valid Youtube Video URL is Required!!");
      return;
    }

    handleOpen();
    setAudioResponse(sampleResponse);
    setIsDownloadSuccess(true);
    setPlayVideo(true);
    static_video_url = videoUrl;
    setTimeout(() => {
      handleClose();
      setVideoUrl("");
    }, 5000);
  }

  function handleCheckboxChange(checked: boolean) {
    setIsTermsAggred(checked);
    //setPlayVideo(checked);
  }

  function fetchDownloadableLink(): void {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }

    if (videoUrl === "" || !videoUrl.startsWith("https://youtu")) {
      alert("A Valid Youtube Video URL is Required!!");
      return;
    }
    handleOpen();

    axios.post(API_BASE_URL + videoUrl).then(
      (result) => {
        console.log("Hitting Youtube Dpwnload API is successful");
        setAudioResponse(result.data);
        setIsDownloadSuccess(true);
        setPlayVideo(true);
        static_video_url = videoUrl;
        setTimeout(() => {
          handleClose();
          setVideoUrl("");
        }, 5000);
      },
      (error) => {
        console.log("Something went wrong while hitting data.." + error);
        handleClose();
        alert("Something went wrong while hitting data.." + error);
      }
    );
  }

  function handleVideoPlay(): any {
    if (videoUrl === "" || !videoUrl.includes("youtu")) {
      alert("A Valid Youtube Video URL is Required!!");
      return;
    }
    static_video_url = videoUrl;
    setPlayVideo(true);
  }

  function openLink(audioUrl: string): any {
    if (audioUrl === "" || audioUrl.length < 20) {
      alert("Something went wrong while generating download link, try again..");
      return;
    }
    window.open(audioUrl, "_blank");
  }

  const backdrop = (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
          <h1 className="font-extrabold m-2 text-white text-xl">
            Communicating with server...
          </h1>
        </div>
      </Backdrop>
    </React.Fragment>
  );

  return (
    <div className="m-10 flex flex-col items-center justify-center">
      {backdrop}
      <div className="flex flex-col items-center border shadow-lg p-4">
        <TextField
          fullWidth
          value={videoUrl}
          onChange={handleChange}
          id="url-input"
          label="Enter or Paste Youtube Video Link Here"
          variant="outlined"
        />
        <Button
          onClick={fetchDownloadableLink}
          sx={{ marginTop: "20px", marginBottom: "10px", width: "200px" }}
          variant="contained"
        >
          Scrap Video
        </Button>
        <Button
          onClick={handleVideoPlay}
          sx={{ width: "200px", marginTop: "10px", marginBottom: "15px" }}
          variant="outlined"
        >
          Play Video
        </Button>
        <h3 className="text-xs text-center w-80 m-2">
          A direct video information display will get triggered if video has
          only one format else a list of downloadable video will get presented.
        </h3>
        <div className="flex items-center justify-center">
          <Checkbox
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            defaultChecked
          />
          <h3 className="text-xs text-center m-2">
            By scrapping video you agree to our terms & conditions for fair
            usages policy
          </h3>
        </div>
        <Divider color="black" />
      </div>

      <br />
      <br />
      {isDownloadSuccess && (
        <div className="border-2 text-center border-blue-500 shadow-sm p-4">
          <div className="flex flex-col items-center md:flex-row font-mono mb-5 justify-center">
            <h3 className="font-bold text-xl">Info Fetching Successful</h3>
            <img
              className="m-2"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
            <img
              className="animate-ping"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
          </div>
        </div>
      )}

      {playVideo && (
        <div className="w-full sm:w-50px lg:w-1/2 mt-10 mb-10">
          <ReactPlayer
            width="100%"
            controls={true}
            pip={true}
            volume={1}
            url={static_video_url}
          />
        </div>
      )}

      {isDownloadSuccess && (
        <VideoInfoComponent
          title={audioResponse.videoInfo.title}
          description={audioResponse.videoInfo.description}
          totalView={audioResponse.videoInfo.totalView}
          channelName={audioResponse.videoInfo.channelName}
          hqThumbnail={audioResponse.videoInfo.hqThumbnail}
          durationInMinutes={audioResponse.videoInfo.durationInMinutes}
        />
      )}
    </div>
  );
}

export default HomePage;
