
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingData, EffectStyle, SectionConfig } from '../types';
import { LANG_OPTIONS } from '../constants';
import Particles from './Particles';
import Calendar from './Calendar';
import Gallery from './Gallery';
import Guestbook from './Guestbook';
import RSVPForm from './RSVPForm';

interface Props {
  data: WeddingData;
}

const Frontend: React.FC<Props> = ({ data }) => {
  const [introVisible, setIntroVisible] = useState(!localStorage.getItem('intro_seen'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLang, setCurrentLang] = useState('ko');
  const [stardust, setStardust] = useState<{ x: number, y: number, id: number }[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!data.groom.name) return;
    document.title = `${data.groom.name} ♥ ${data.bride.name}의 모바일 청첩장`;
  }, [data]);

  const handleInteraction = () => {
    if (introVisible) {
      setIntroVisible(false);
      localStorage.setItem('intro_seen', 'true');
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const id = Date.now();
    setStardust(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
    setTimeout(() => {
      setStardust(prev => prev.filter(s => s.id !== id));
    }, 1000);
  };

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  };

  const handleTTS = () => {
    const speech = new SpeechSynthesisUtterance();
    speech.lang = currentLang === 'ko' ? 'ko-KR' : 'en-US';
    speech.text = document.body.innerText;
    window.speechSynthesis.speak(speech);
  };

  const SectionWrapper: React.FC<{ section: SectionConfig, children: React.ReactNode, title?: string }> = ({ section, children, title }) => {
    const [isOpen, setIsOpen] = useState(!section.isFolded);
    if (!section.isVisible) return null;

    return (
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl mx-auto my-12 px-6"
      >
        {title && (
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-light tracking-widest text-gray-800">{title}</h2>
            <div className="w-12 h-px bg-gold-200 mt-2 bg-yellow-600 opacity-30"></div>
          </div>
        )}
        
        {section.isFolded ? (
          <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-full py-4 px-6 bg-white flex justify-between items-center text-sm text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <span>{isOpen ? '접기' : '정보 보기'}</span>
              <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-white">{children}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-transparent">{children}</div>
        )}
      </motion.section>
    );
  };

  return (
    <div 
      className="relative min-h-screen selection:bg-rose-100"
      onClick={handleClick}
    >
      <Particles style={data.effectStyle} />
      
      {/* Stardust Effect */}
      {stardust.map(s => (
        <motion.div
          key={s.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          style={{ 
            position: 'fixed', left: s.x, top: s.y, 
            width: 4, height: 4, borderRadius: '50%', 
            background: 'gold', pointerEvents: 'none', zIndex: 9999 
          }}
        />
      ))}

      {/* Intro Overlay */}
      <AnimatePresence>
        {introVisible && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center cursor-pointer"
            onClick={handleInteraction}
            onWheel={handleInteraction}
          >
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
              </div>
              <p className="mt-4 text-gray-400 text-sm tracking-widest font-light">SCROLL DOWN</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bar */}
      <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4">
        <div className="flex gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm shadow-sm flex items-center justify-center hover:bg-white transition-all"
          >
             {isPlaying ? '⏸' : '▶️'}
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={handleTTS} className="text-xs text-gray-500 bg-white/50 px-2 py-1 rounded">TTS</button>
          <select 
            onChange={(e) => changeLanguage(e.target.value)}
            className="text-xs bg-white/50 border-none rounded px-2 py-1 outline-none"
          >
            {LANG_OPTIONS.map(opt => (
              <option key={opt.code} value={opt.code}>{opt.flag} {opt.name}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Visual */}
      <section className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 5 }}
        >
          <img src={data.mainImage} alt="Main" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10"></div>
        </motion.div>

        <div className={`relative z-10 w-full px-10 text-center text-white drop-shadow-lg ${
          data.overlayPos === 'top' ? 'mb-auto mt-24' : 
          data.overlayPos === 'bottom' ? 'mt-auto mb-24' : ''
        }`}>
          <h1 className="font-cursive text-5xl md:text-7xl mb-4 opacity-0 animate-[fadeIn_2s_ease-out_forwards]">
            {data.overlayText}
          </h1>
        </div>

        <div className="relative z-10 w-full bg-gradient-to-t from-white via-white/80 to-transparent pt-32 pb-16 px-6 text-center">
          <pre className="whitespace-pre-wrap font-myeongjo text-gray-700 leading-relaxed text-lg tracking-tight">
            {data.mainText}
          </pre>
        </div>
      </section>

      {/* Dynamic Sections */}
      <div className="bg-white">
        {[...data.sections].sort((a, b) => a.order - b.order).map(section => {
          switch (section.id) {
            case 'names':
              return (
                <SectionWrapper key={section.id} section={section}>
                  <div className="text-center space-y-4">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                      <div className="text-lg">
                        <span className="text-gray-400 text-sm block mb-1">Groom</span>
                        <div className="font-bold text-gray-800 text-xl">{data.groom.name}</div>
                        <div className="text-sm text-gray-500 mt-2">
                          {data.groom.father} · {data.groom.mother}의 {data.groom.rank}
                        </div>
                      </div>
                      <div className="text-rose-200 text-2xl font-light">♥</div>
                      <div className="text-lg">
                        <span className="text-gray-400 text-sm block mb-1">Bride</span>
                        <div className="font-bold text-gray-800 text-xl">{data.bride.name}</div>
                        <div className="text-sm text-gray-500 mt-2">
                          {data.bride.father} · {data.bride.mother}의 {data.bride.rank}
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionWrapper>
              );
            case 'calendar':
              return (
                <SectionWrapper key={section.id} section={section} title="Calendar">
                  <Calendar targetDate={data.weddingDate} />
                </SectionWrapper>
              );
            case 'youtube':
              return (
                <SectionWrapper key={section.id} section={section} title="Wedding Video">
                  <div className="aspect-video w-full rounded-xl overflow-hidden shadow-xl">
                    <iframe 
                      className="w-full h-full"
                      src={data.youtubeLink.replace('youtu.be/', 'www.youtube.com/embed/').split('?')[0]} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </SectionWrapper>
              );
            case 'gallery':
              return (
                <SectionWrapper key={section.id} section={section} title="Gallery">
                  <Gallery images={data.galleryImages} />
                </SectionWrapper>
              );
            case 'phone':
              return (
                <SectionWrapper key={section.id} section={section} title="Contact">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border border-rose-50 rounded-xl bg-rose-50/20">
                      <h4 className="text-sm font-bold text-gray-700 mb-3 border-b border-rose-100 pb-2">신랑측 연락처</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span>신랑 {data.groom.name}</span>
                          <a href={`tel:${data.groom.phone}`} className="w-8 h-8 bg-white shadow-sm flex items-center justify-center rounded-full">📞</a>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>부친 {data.groom.father}</span>
                          <a href={`tel:${data.groom.phone}`} className="w-8 h-8 bg-white shadow-sm flex items-center justify-center rounded-full">📞</a>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border border-rose-50 rounded-xl bg-rose-50/20">
                      <h4 className="text-sm font-bold text-gray-700 mb-3 border-b border-rose-100 pb-2">신부측 연락처</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span>신부 {data.bride.name}</span>
                          <a href={`tel:${data.bride.phone}`} className="w-8 h-8 bg-white shadow-sm flex items-center justify-center rounded-full">📞</a>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>부친 {data.bride.father}</span>
                          <a href={`tel:${data.bride.phone}`} className="w-8 h-8 bg-white shadow-sm flex items-center justify-center rounded-full">📞</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionWrapper>
              );
            case 'bank':
              return (
                <SectionWrapper key={section.id} section={section} title="Accounts">
                   <div className="space-y-4">
                      {[data.groom, data.bride].map((person, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-400 mb-2">{i === 0 ? '신랑측' : '신부측'} 마음 전하실 곳</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{person.bank} {person.account}</span>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(person.account);
                                alert("계좌번호가 복사되었습니다.");
                              }}
                              className="text-xs bg-white px-2 py-1 rounded shadow-sm hover:shadow-md"
                            >복사</button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">예금주: {person.bankName}</p>
                        </div>
                      ))}
                   </div>
                </SectionWrapper>
              );
            case 'location':
              return (
                <SectionWrapper key={section.id} section={section} title="Location">
                   <div className="space-y-6">
                      <div className="text-center">
                        <h4 className="font-bold text-lg text-gray-800">{data.venue.guideText.split('\n')[0]}</h4>
                        <p className="text-sm text-gray-500 mt-1">{data.venue.address}</p>
                        <p className="text-sm text-gray-500">{data.venue.phone}</p>
                      </div>
                      
                      {/* Map Simulation */}
                      <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden relative">
                         <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(data.venue.address)}`} 
                            style={{ border: 0 }}
                          ></iframe>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <a href={data.venue.naverMap} target="_blank" className="py-3 bg-green-50 text-green-700 text-center rounded-lg text-xs font-bold">네이버 지도</a>
                        <a href={data.venue.kakaoMap} target="_blank" className="py-3 bg-yellow-50 text-yellow-800 text-center rounded-lg text-xs font-bold">카카오 맵</a>
                        <a href={data.venue.tmap} target="_blank" className="py-3 bg-blue-50 text-blue-700 text-center rounded-lg text-xs font-bold">T-맵</a>
                        <a href={data.venue.googleMap} target="_blank" className="py-3 bg-red-50 text-red-700 text-center rounded-lg text-xs font-bold">구글 맵</a>
                      </div>
                   </div>
                </SectionWrapper>
              );
            case 'guestbook':
              return (
                <SectionWrapper key={section.id} section={section} title="Guestbook">
                  <Guestbook />
                </SectionWrapper>
              );
            case 'rsvp':
              return (
                <SectionWrapper key={section.id} section={section} title="RSVP">
                  <RSVPForm />
                </SectionWrapper>
              );
            case 'share':
              return (
                <SectionWrapper key={section.id} section={section} title="Share">
                  <div className="flex justify-center gap-4 flex-wrap">
                    {['카톡', '페북', '인스타', 'X', '라인', '텔레'].map(sns => (
                      <button key={sns} className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold hover:bg-rose-50 transition-colors">
                        {sns}
                      </button>
                    ))}
                  </div>
                </SectionWrapper>
              );
            default:
              return null;
          }
        })}
      </div>

      <footer className="py-12 bg-gray-50 text-center">
        <p className="text-xs text-gray-300 font-light tracking-widest uppercase">
          Copyright(c) Joe All Right Reserved
        </p>
      </footer>
    </div>
  );
};

export default Frontend;
