import React, { useState, useEffect, useRef } from "react";
import { LanguageService } from "../../services/languageService";
import Slider from "react-input-slider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination, Autoplay } from "swiper/modules";
import { Paths } from "../../asset/paths";
import ImageWithFallback from "../common/ImageWithFallback";
import LinkWithHandler from "../common/LinkWithHandler";
import Notify from "../common/Notify";
import "./main.scss";
import { storekit, storekit2 } from "./../../asset/Storekit/storekit";
import audios from "./../../asset/Music/audio";

// Cấu hình cho Swiper (danh sách video)
const swiperPerson = {
  modules: [Navigation, Thumbs, Pagination, Autoplay],
  pagination: true,
  loop: true,
  rewind: true,
  speed: 600,
  grabCursor: true,
  navigation: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
};

// Cấu hình cho Swiper (danh sách Storekit)
const swiperPerson2 = {
  modules: [Pagination, Autoplay],
  pagination: true,
  loop: true,
  rewind: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  slidesPerView: 3,
};

// Cấu hình cho thanh trượt thời gian nhạc
const sliderStyles = {
  track: { backgroundColor: "#fce9bb", height: "5px" },
  active: { backgroundColor: "#7a2a1b", height: "5px" },
  thumb: {
    marginTop: "-1px",
    width: "10px",
    height: "10px",
    backgroundColor: "#7a2a1b",
  },
};

const Main = () => {
  const [showIOSAlert, setShowIOSAlert] = useState(false); // Kiểm soát hiển thị thông báo iOS

  // Xử lý khi nhấn vào nút iOS
  const handleIOSClick = (e) => {
    e.preventDefault();
    setShowIOSAlert(true); // Hiển thị thông báo
  };

  const audioRef = useRef(null); // Tham chiếu đến phần tử audio
  const [audioIndex, setAudioIndex] = useState(0); // Chỉ số bài hát hiện tại
  const [currentTime, setCurrentTime] = useState(0); // Thời gian hiện tại của bài hát
  const [duration, setDuration] = useState(0); // Thời lượng bài hát
  const [isPlay, setPlay] = useState(false); // Trạng thái phát/dừng
  const [sliderValue, setSliderValue] = useState(0); // Giá trị thanh trượt
  const [isDragging, setIsDragging] = useState(false); // Kiểm soát trạng thái kéo thanh trượt

  const videoStorekit = storekit; // Dữ liệu video
  const storekitData = storekit2; // Dữ liệu hình ảnh

  // Định dạng thời gian (phút:giây)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  // Xử lý khi dữ liệu audio được tải
  const handleLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setSliderValue(audioRef.current.currentTime);
      if (isPlay) {
        audioRef.current.play();
      }
    }
  };

  // Xử lý khi nhấn nút phát/tạm dừng
  const handlePausePlayClick = () => {
    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlay((prev) => !prev);
    }
  };

  // Cập nhật thời gian hiện tại của bài hát
  const handleTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Xử lý khi bài hát kết thúc
  const handleAudioEnded = () => setPlay(false);

  // Xử lý khi chuyển bài hát
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setCurrentTime(0);
      setSliderValue(0);
      if (isPlay) {
        audioRef.current.play();
      }
    }
  }, [audioIndex]);

  // Chuyển bài hát trước đó
  const handlePrevTrack = () => {
    setAudioIndex((prev) => (prev - 1 + audios.length) % audios.length);
  };

  // Chuyển bài hát tiếp theo
  const handleNextTrack = () => {
    setAudioIndex((prev) => (prev + 1) % audios.length);
  };

  const lang = LanguageService.detectLanguage(); // Xác định ngôn ngữ hiện tại
  const translations = LanguageService.getTranslations(); // Lấy bản dịch theo ngôn ngữ
  const links = LanguageService.getLinks(); // Lấy các đường dẫn theo ngôn ngữ
  const imageSet = {
    title: lang === "vi" ? Paths.text.Title : Paths.text.Title_en,
    title1: lang === "vi" ? Paths.text.Title1 : Paths.text.Title1_en,
    title2: lang === "vi" ? Paths.text.Title2 : Paths.text.Title2_en,
    line: lang === "vi" ? Paths.text.line : Paths.text.line_en,
    line_mb: lang === "vi" ? Paths.text.line_mb : Paths.text.line_mb_en,
    android: lang === "vi" ? Paths.buttons.Android : Paths.buttons.Android_en,
    apk: lang === "vi" ? Paths.buttons.Apk : Paths.buttons.Apk_en,
    ios: lang === "vi" ? Paths.buttons.Ios : Paths.buttons.Ios_en,
  };

  return (
    <div className="Main container">
      {/* Logo */}
      <div className="Main__logo">
        <ImageWithFallback src={Paths.logo.logo} alt="Logo" loading="lazy" />
      </div>
      {/* Danh sách video */}
      <div className="list__video">
        <div className="title">
          <ImageWithFallback
            src={imageSet.title}
            alt="title/listvideo"
            loading="lazy"
          />
        </div>
        <div className="list">
          <Swiper {...swiperPerson}>
            {videoStorekit.map((item, index) => (
              <SwiperSlide key={`video-${index}`}>
                <div className="list__a">
                  <ImageWithFallback
                    className="video__img"
                    src={lang === "vi" ? item?.tag : item?.tag_en}
                    alt={`video-${index}`}
                    loading="lazy"
                  />
                  <a
                    className={item.play === true ? "video show" : "video hide"}
                    href={lang === "vi" ? item?.link : item?.link_en}
                    target="_blank"
                  >
                    <ImageWithFallback
                      className="video__phay"
                      src={Paths.videos.Play_video}
                      alt=""
                      loading="lazy"
                    />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Danh sách Storekit */}
      <div className="list__storikit">
        <div className="title">
          <img src={imageSet.title1} alt="title/liststorikit" loading="lazy" />
        </div>
        <div className="list">
          <div className="pc">
            {storekitData.map((item, index) => (
              <div className="list__a" key={`storekit-pc-${index}`}>
                <img
                  src={lang === "vi" ? item?.tag : item?.tag_en}
                  alt={`storekit-pc-${index}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="mobile">
            <Swiper {...swiperPerson2}>
              {storekitData.map((item, index) => (
                <SwiperSlide key={`storekit-mobile-${index}`}>
                  <div className="list__a">
                    <img
                      src={lang === "vi" ? item?.tag : item?.tag_en}
                      alt={`storekit-mobile-${index}`}
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Danh sách nhạc */}
      <div className="list__music">
        <div className="title">
          <ImageWithFallback
            src={imageSet.title2}
            alt="title/listmusic"
            loading="lazy"
          />
        </div>
        <div className="list">
          <div className="bg">
            <ImageWithFallback
              src={Paths.music.BG_CD}
              alt="BG_CD"
              loading="lazy"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <div className="cd">
            <ImageWithFallback
              src={Paths.music.CD}
              alt="cd"
              className="cd-rotating"
              style={{
                animationPlayState: isPlay ? "running" : "paused",
                animationDelay: `-${currentTime % 0}s`,
              }}
              loading="lazy"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
          <div className="thumbnail">
            <ImageWithFallback
              src={audios[audioIndex].thumbnail}
              alt="thumbnail"
              loading="lazy"
            />
          </div>

          <div className="time-display">
            <span>{formatTime(isDragging ? sliderValue : currentTime)}</span>
            <div className="song">
              <div className="Control-Button-Group">
                <div className="Prev-Button" onClick={handlePrevTrack}>
                  <img
                    src={Paths.music.pre_music}
                    alt="previous track"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <div
                  className="Pause-Play-Button"
                  onClick={handlePausePlayClick}
                >
                  <img
                    src={isPlay ? Paths.music.play : Paths.music.pause}
                    alt="play/pause"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
                <div className="Next-Button" onClick={handleNextTrack}>
                  <img
                    src={Paths.music.next_music}
                    alt="next track"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>
              <Slider
                axis="x"
                x={isDragging ? sliderValue : currentTime}
                xmin={0}
                xmax={duration || 100}
                onChange={({ x }) => setSliderValue(x)}
                onChangeStart={() => setIsDragging(true)}
                onChangeEnd={() => {
                  const newTime = Number.isFinite(sliderValue)
                    ? sliderValue
                    : 0;
                  if (audioRef.current) {
                    audioRef.current.currentTime = newTime;
                  }
                  setCurrentTime(newTime);
                  setIsDragging(false);
                }}
                style={{ width: "100%" }}
                styles={sliderStyles}
              />
              <audio
                ref={audioRef}
                src={audios[audioIndex].src}
                preload="auto"
                onLoadedData={handleLoadedData}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleAudioEnded}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="line">
          <img className="pc" src={imageSet.line} alt="line" loading="lazy" />
          <img
            className="mobile"
            src={imageSet.line_mb}
            alt="line"
            loading="lazy"
          />
        </div>
        <div className="nav_menu__button">
          <ul className="nav_menu__button__bar">
            <LinkWithHandler
              href={links.ios}
              className="ten__hover"
              onClick={handleIOSClick}
              rel="noopener noreferrer"
            >
              <li>
                <img src={imageSet.ios} alt="ios" loading="lazy" />
              </li>
            </LinkWithHandler>
            <LinkWithHandler
              href={links.android}
              className="ten__hover"
              onClick={handleIOSClick}
              rel="noopener noreferrer"
            >
              <li>
                <img src={imageSet.android} alt="android" loading="lazy" />
              </li>
            </LinkWithHandler>
            <LinkWithHandler
              href={links.apk}
              className="ten__hover"
              onClick={handleIOSClick}
              rel="noopener noreferrer"
            >
              <li>
                <img src={imageSet.apk} alt="apk" loading="lazy" />
              </li>
            </LinkWithHandler>
          </ul>
        </div>
      </div>
      {/* Thông báo iOS */}
      <Notify
        show={showIOSAlert}
        message={translations.message}
        closeButtonText={translations.closeButton}
        onClose={() => setShowIOSAlert(false)}
      />
    </div>
  );
};

export default Main;
