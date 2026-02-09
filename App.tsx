
import React, { useState, useRef } from 'react';
import { AppStep, StoryChapter, Decoration } from './types';
import { getChapters, STORY_TITLE, STICKERS } from './constants';
import { generateChapterImage } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.UPLOAD);
  const [childName, setChildName] = useState<string>('');
  const [childPhoto, setChildPhoto] = useState<string | null>(null);
  const [chapters, setChapters] = useState<StoryChapter[]>([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Interaction State
  const [decorations, setDecorations] = useState<{ [key: number]: Decoration[] }>({});
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setChildPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const startMagic = async () => {
    if (!childPhoto || !childName) return;

    setStep(AppStep.GENERATING);
    setError(null);
    setGeneratingProgress(0);
    setDecorations({});

    const initialChapters = getChapters(childName);
    const completedChapters: StoryChapter[] = [];

    try {
      for (let i = 0; i < initialChapters.length; i++) {
        setGeneratingProgress(i + 1);
        const imageUrl = await generateChapterImage(childPhoto, initialChapters[i].imagePrompt);
        completedChapters.push({ ...initialChapters[i], imageUrl });
      }
      setChapters(completedChapters);
      setStep(AppStep.STORY);
    } catch (err) {
      console.error(err);
      setError("동화책을 그리는 도중 마법 지팡이가 고장 났어요. 다시 한 번 시도해 주세요!");
      setStep(AppStep.UPLOAD);
    }
  };

  const reset = () => {
    setStep(AppStep.UPLOAD);
    setChildPhoto(null);
    setChildName('');
    setChapters([]);
    setCurrentChapterIndex(0);
    setDecorations({});
    setSelectedSticker(null);
  };

  const addDecoration = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedSticker || !imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newDecoration: Decoration = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedSticker,
      x,
      y,
      scale: 1
    };

    setDecorations(prev => ({
      ...prev,
      [currentChapterIndex]: [...(prev[currentChapterIndex] || []), newDecoration]
    }));
  };

  const undoDecoration = () => {
    setDecorations(prev => ({
      ...prev,
      [currentChapterIndex]: (prev[currentChapterIndex] || []).slice(0, -1)
    }));
  };

  const currentChapter = chapters[currentChapterIndex];
  const currentDecorations = decorations[currentChapterIndex] || [];

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-start max-w-2xl mx-auto overflow-x-hidden">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-2 storybook-font">
          ✨ {STORY_TITLE} ✨
        </h1>
        {step !== AppStep.STORY && (
          <p className="text-amber-700 text-lg">아이가 주인공이 되어 상상을 더하는 특별한 동화</p>
        )}
      </header>

      {/* Main Container */}
      <div className="w-full bg-white rounded-3xl shadow-2xl border-8 border-amber-100 flex flex-col min-h-[550px] relative transition-all duration-500">
        
        {/* Step: Upload */}
        {step === AppStep.UPLOAD && (
          <div className="p-8 flex flex-col items-center gap-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-amber-900">꼬마 주인공의 정보를 입력해 주세요!</h2>
            <input
              type="text"
              placeholder="아이의 이름을 입력하세요"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full p-4 border-2 border-amber-200 rounded-xl text-xl focus:outline-none focus:border-amber-400 text-center bg-amber-50"
            />
            <div className="w-full aspect-square max-w-[250px] bg-amber-50 rounded-2xl border-4 border-dashed border-amber-200 flex flex-col items-center justify-center relative overflow-hidden group hover:border-amber-400 transition-colors">
              {childPhoto ? (
                <img src={childPhoto} alt="Child" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <span className="text-5xl mb-2 block animate-bounce">📸</span>
                  <p className="text-amber-600">얼굴이 잘 나온 사진을<br/>선택해 주세요!</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
            <button
              onClick={startMagic}
              disabled={!childName || !childPhoto}
              className={`w-full py-4 rounded-2xl text-xl font-bold transition-all transform active:scale-95 ${
                childName && childPhoto ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              마법 동화책 만들기 📖
            </button>
            {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-2 rounded-lg">{error}</p>}
          </div>
        )}

        {/* Step: Generating */}
        {step === AppStep.GENERATING && (
          <div className="p-8 flex flex-col items-center justify-center flex-1 space-y-8 animate-pulse">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 border-8 border-amber-100 border-t-amber-500 rounded-full animate-spin"></div>
              <span className="text-5xl animate-bounce">🪄</span>
            </div>
            <div className="text-center w-full">
              <h2 className="text-2xl font-bold text-amber-900 mb-4">상상력으로 그림을 그리고 있어요...</h2>
              <div className="w-full bg-amber-100 h-6 rounded-full max-w-[300px] mx-auto overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500 ease-out" 
                  style={{ width: `${(generatingProgress / 5) * 100}%` }}
                ></div>
              </div>
              <p className="mt-4 text-amber-700 italic text-lg font-medium">
                {generatingProgress} / 5 번째 페이지 완성!
              </p>
            </div>
          </div>
        )}

        {/* Step: Story Flow */}
        {step === AppStep.STORY && currentChapter && (
          <div className="flex flex-col h-full animate-fadeIn overflow-hidden rounded-2xl">
            {/* Image Layer with Interactive Decorations */}
            <div 
              ref={imageContainerRef}
              onClick={addDecoration}
              className={`w-full aspect-[4/3] bg-amber-50 relative group ${selectedSticker ? 'cursor-crosshair' : ''}`}
            >
              <img src={currentChapter.imageUrl} alt="Scene" className="w-full h-full object-cover select-none pointer-events-none" />
              
              {/* Decorations (Stickers) */}
              {currentDecorations.map((deco) => (
                <div
                  key={deco.id}
                  style={{ left: `${deco.x}%`, top: `${deco.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-5xl pointer-events-none drop-shadow-xl select-none animate-pop"
                >
                  {deco.type}
                </div>
              ))}

              {/* Page Number */}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full text-amber-900 font-bold text-sm z-10 shadow-sm border border-amber-100">
                {currentChapterIndex + 1} / 5
              </div>

              {/* Interaction UI for specific chapters */}
              {currentChapter.allowDecoration && (
                <div className="absolute bottom-4 left-4 right-4 flex flex-col items-center gap-2 z-20">
                   <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-2xl flex gap-3 overflow-x-auto max-w-full no-scrollbar border-2 border-amber-200">
                      {STICKERS.map(sticker => (
                        <button
                          key={sticker.name}
                          title={sticker.name}
                          onClick={(e) => { e.stopPropagation(); setSelectedSticker(sticker.icon); }}
                          className={`text-3xl p-3 rounded-xl transition-all flex-shrink-0 ${selectedSticker === sticker.icon ? 'bg-amber-400 scale-110 shadow-inner' : 'hover:bg-amber-100 hover:scale-105'}`}
                        >
                          {sticker.icon}
                        </button>
                      ))}
                      <div className="w-[1px] bg-amber-200 mx-1"></div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); undoDecoration(); }}
                        className="p-3 text-sm font-bold text-amber-600 bg-amber-50 rounded-xl hover:bg-amber-200 active:scale-90 transition-all flex-shrink-0"
                      >
                        지우기
                      </button>
                   </div>
                   <p className="text-white text-sm font-bold bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg">
                     {selectedSticker ? `그림을 터치해 '${selectedSticker}'를 달아주세요!` : `도화지 위에 상상을 더해볼까요? 스티커를 골라보세요!`}
                   </p>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 bg-[#fffcf5] flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-amber-900 mb-4 storybook-font border-b-2 border-amber-100 pb-2">
                {currentChapter.title}
              </h3>
              <div className="text-xl text-amber-800 leading-relaxed whitespace-pre-wrap flex-1 overflow-y-auto max-h-[250px] pr-2 no-scrollbar">
                {currentChapter.text}
              </div>
              
              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => {
                    if (currentChapterIndex > 0) {
                      setCurrentChapterIndex(prev => prev - 1);
                      setSelectedSticker(null);
                    }
                  }}
                  disabled={currentChapterIndex === 0}
                  className={`flex-1 py-4 rounded-xl font-bold transition-all ${currentChapterIndex === 0 ? 'bg-gray-100 text-gray-300' : 'bg-amber-100 text-amber-800 hover:bg-amber-200 hover:shadow-md active:scale-95'}`}
                >
                  이전 페이지
                </button>
                {currentChapterIndex < 4 ? (
                  <button
                    onClick={() => {
                      setCurrentChapterIndex(prev => prev + 1);
                      setSelectedSticker(null);
                    }}
                    className="flex-[2] py-4 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    다음 페이지로 →
                  </button>
                ) : (
                  <button
                    onClick={reset}
                    className="flex-[2] py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    마법 끝! 새로운 동화 만들기 ✨
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-amber-700 opacity-60 text-sm">
        <p>© 2024 {STORY_TITLE} - 우리 아이의 반짝이는 생각을 응원합니다.</p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          0% { transform: translate(-50%, -50%) scale(0) rotate(-10deg); }
          80% { transform: translate(-50%, -50%) scale(1.2) rotate(5deg); }
          100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-pop { animation: pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
      `}</style>
    </div>
  );
};

export default App;
