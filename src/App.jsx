import { useState, useEffect } from "react";

// ===== DATA =====
const OCCASIONS = [
  { id: "birthday", emoji: "🎂", label: "생일", desc: "소중한 사람의 특별한 날" },
  { id: "anniversary", emoji: "💍", label: "기념일", desc: "함께한 시간을 축하하며" },
  { id: "comfort", emoji: "🤗", label: "위로", desc: "힘든 시간을 함께하는 마음" },
  { id: "congrats", emoji: "🎉", label: "축하", desc: "승진, 합격, 새 출발" },
  { id: "propose", emoji: "💐", label: "프러포즈", desc: "평생을 함께할 약속" },
  { id: "daily", emoji: "🌿", label: "일상", desc: "나를 위한 작은 선물" },
  { id: "thanks", emoji: "🙏", label: "감사", desc: "고마운 마음을 전하며" },
  { id: "apology", emoji: "💌", label: "사과", desc: "진심을 담은 사과의 꽃" },
];

const MOODS = [
  { id: "warm", label: "따뜻한", color: "#D4A574", gradient: "from-amber-100 to-orange-100" },
  { id: "bright", label: "화사한", color: "#E8A0BF", gradient: "from-pink-100 to-rose-100" },
  { id: "calm", label: "차분한", color: "#8FA67A", gradient: "from-green-100 to-emerald-100" },
  { id: "elegant", label: "우아한", color: "#9B7DB8", gradient: "from-purple-100 to-violet-100" },
  { id: "fresh", label: "상쾌한", color: "#6BA3BE", gradient: "from-sky-100 to-cyan-100" },
  { id: "passionate", label: "열정적인", color: "#C75B5B", gradient: "from-red-100 to-rose-100" },
];

const WRAPPING = [
  { id: "kraft", label: "크라프트", desc: "내추럴한 감성", color: "#C4A882" },
  { id: "linen", label: "리넨", desc: "고급스러운 질감", color: "#B5ADA5" },
  { id: "pastel", label: "파스텔", desc: "부드러운 색감", color: "#D4B8C4" },
  { id: "mono", label: "모노톤", desc: "세련된 단색", color: "#6B6B6B" },
];

const FLOWER_DB = {
  birthday: {
    warm: [
      { name: "선셋 부케", flowers: ["오렌지 장미", "거베라", "스프레이 장미", "유칼립투스"], meaning: "따뜻한 빛처럼 밝은 하루 되세요", palette: ["#E8956A", "#F2C078", "#D4A574", "#8FA67A"], price: 55000 },
      { name: "골든 블룸", flowers: ["해바라기", "프리지아", "솔리다고", "레몬리프"], meaning: "황금빛 행복이 가득하길", palette: ["#F5C44E", "#E8D06A", "#8FA67A", "#C4A882"], price: 65000 },
      { name: "오텀 위시", flowers: ["카라", "스카비오사", "조팝나무", "그린벨"], meaning: "가장 아름다운 계절을 당신에게", palette: ["#D4A574", "#B8694E", "#F5E6D3", "#6B7F5E"], price: 70000 },
    ],
    bright: [
      { name: "핑크 셀레브레이션", flowers: ["핑크 장미", "작약", "리시안셔스", "안개꽃"], meaning: "당신의 생일을 핑크빛으로 물들여요", palette: ["#E8A0BF", "#F2C4D4", "#FFE0EB", "#D48FB0"], price: 60000 },
      { name: "체리 블로썸", flowers: ["겹벚꽃", "카네이션", "스톡", "유칼립투스"], meaning: "봄처럼 설레는 하루 되세요", palette: ["#F5B0C8", "#E890A8", "#FFD4E0", "#8FA67A"], price: 58000 },
      { name: "코랄 드림", flowers: ["라넌큘러스", "튤립", "스위트피", "이탈리안러스커스"], meaning: "꿈처럼 아름다운 하루", palette: ["#FF8C7C", "#FFB098", "#F5D0C4", "#C4848A"], price: 72000 },
    ],
    calm: [
      { name: "그린 가든", flowers: ["흰 장미", "유칼립투스", "올리브", "라벤더"], meaning: "평온한 하루를 선물합니다", palette: ["#8FA67A", "#A8C090", "#F5F0E8", "#B5C4AA"], price: 55000 },
      { name: "포레스트 위시", flowers: ["리시안셔스", "솔리다고", "그린벨", "레몬리프"], meaning: "숲속의 평화로운 안식을", palette: ["#6B7F5E", "#8FA67A", "#E8E0D0", "#C4CEB8"], price: 50000 },
      { name: "민트 브리즈", flowers: ["수국", "카모마일", "딜", "박하"], meaning: "상쾌한 바람처럼 가벼운 하루", palette: ["#A8D4C0", "#8FC4A8", "#E0F0E8", "#6B9880"], price: 62000 },
    ],
    elegant: [
      { name: "로얄 퍼플", flowers: ["보라 장미", "리시안셔스", "델피니움", "유칼립투스"], meaning: "당신은 세상에서 가장 특별한 사람", palette: ["#9B7DB8", "#B898D0", "#E8D8F0", "#6B5888"], price: 75000 },
      { name: "미드나잇 블룸", flowers: ["카라", "아네모네", "스카비오사", "실버브루니아"], meaning: "밤하늘의 별처럼 빛나는 당신", palette: ["#7B68A8", "#A890C0", "#D8C8E8", "#5B4880"], price: 80000 },
      { name: "라벤더 드림", flowers: ["라벤더", "리시안셔스", "안개꽃", "아이비"], meaning: "은은한 향기처럼 아름다운 하루", palette: ["#9B8AC0", "#C0B0D8", "#E8E0F0", "#7B6898"], price: 68000 },
    ],
    fresh: [
      { name: "스카이 부케", flowers: ["블루스타", "델피니움", "흰 장미", "유칼립투스"], meaning: "맑은 하늘처럼 청명한 하루", palette: ["#6BA3BE", "#8CC0D4", "#E0F0F5", "#5B8898"], price: 65000 },
      { name: "씨 브리즈", flowers: ["수국", "에린지움", "카모마일", "그린벨"], meaning: "바다 바람처럼 시원한 행복", palette: ["#5B98B0", "#78B8D0", "#D0E8F0", "#4B8098"], price: 58000 },
      { name: "아이스 블루", flowers: ["블루레이스", "흰 튤립", "딜", "아스틸베"], meaning: "깨끗하고 순수한 축복", palette: ["#78B0C8", "#A0D0E0", "#E8F4F8", "#5890A8"], price: 70000 },
    ],
    passionate: [
      { name: "레드 로맨스", flowers: ["빨간 장미", "카라", "스카비오사", "아이비"], meaning: "불꽃처럼 뜨거운 축하", palette: ["#C75B5B", "#E07070", "#F5D0D0", "#A04848"], price: 70000 },
      { name: "벨벳 부케", flowers: ["빨간 장미", "라넌큘러스", "코스모스", "유칼립투스"], meaning: "깊고 진한 사랑의 축복", palette: ["#B04050", "#D06070", "#F0D4D8", "#8FA67A"], price: 78000 },
      { name: "플레임", flowers: ["빨간 튤립", "거베라", "글로리오사", "레몬리프"], meaning: "열정으로 빛나는 당신의 하루", palette: ["#D04040", "#E86858", "#F8D0C8", "#C85040"], price: 85000 },
    ],
  },
  // Default fallback for other occasions - reuse birthday with slight variations
};

function getRecommendations(occasion, mood) {
  const occasionData = FLOWER_DB[occasion] || FLOWER_DB.birthday;
  const moodData = occasionData[mood] || occasionData.warm;
  return moodData;
}

const OCCASION_GREETINGS = {
  birthday: "생일 축하의 마음을 담아",
  anniversary: "소중한 기념일을 빛내줄",
  comfort: "따뜻한 위로를 전할",
  congrats: "축하의 마음을 가득 담은",
  propose: "영원한 사랑을 약속할",
  daily: "일상에 작은 행복을 더할",
  thanks: "감사의 마음을 전할",
  apology: "진심 어린 사과를 담은",
};

// ===== COMPONENTS =====
function FadeIn({ children, delay = 0, className = "" }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}>
      {children}
    </div>
  );
}

function ProgressBar({ step, total }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 ${
            i < step ? "bg-amber-700 text-white" : i === step ? "bg-amber-700 text-white ring-4 ring-amber-200" : "bg-stone-200 text-stone-400"
          }`}>
            {i < step ? "✓" : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`w-12 h-0.5 transition-all duration-500 ${i < step ? "bg-amber-700" : "bg-stone-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function ColorPalette({ colors }) {
  return (
    <div className="flex gap-1">
      {colors.map((c, i) => (
        <div key={i} className="w-5 h-5 rounded-full border border-white/50 shadow-sm" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}

// ===== SCREENS =====
function LandingScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #F7F3EE 0%, #F0E8E0 50%, #E8DDD4 100%)" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌿</span>
          <span className="font-serif text-xl text-stone-700 tracking-wide">나화</span>
          <span className="text-xs text-stone-400 mt-1">nahwa</span>
        </div>
        <div className="flex gap-6 text-sm text-stone-500">
          <button className="hover:text-amber-700 transition-colors">소개</button>
          <button className="hover:text-amber-700 transition-colors">구독</button>
          <button className="hover:text-amber-700 transition-colors">문의</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 rounded-full text-sm text-amber-700 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              AI 맞춤 꽃 추천 서비스
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <h1 className="font-serif text-5xl md:text-6xl text-stone-800 leading-tight mb-4">
              꽃, 이제<br />
              <span style={{ color: "#B8694E" }}>어렵지 않아요</span>
            </h1>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="text-lg text-stone-500 mb-10 leading-relaxed">
              상황과 감정만 알려주세요.<br />
              나화의 AI가 당신의 마음을 가장 잘 표현할 꽃을 찾아드립니다.
            </p>
          </FadeIn>

          <FadeIn delay={600}>
            <button
              onClick={onStart}
              className="group px-8 py-4 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #B8694E, #8B5A3C)" }}
            >
              꽃 추천 받기
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </FadeIn>

          {/* Features */}
          <FadeIn delay={800}>
            <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-stone-400">
              {[
                ["🎯", "AI 맞춤 추천"],
                ["🌸", "프렌치 스타일"],
                ["📦", "예약제 운영"],
                ["💝", "기념일 알림"],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2">
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="pb-8 text-center">
        <div className="text-stone-300 text-xs animate-bounce">↓</div>
      </div>
    </div>
  );
}

function OccasionScreen({ onSelect }) {
  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center" style={{ background: "linear-gradient(180deg, #F7F3EE, #FAF8F5)" }}>
      <FadeIn>
        <ProgressBar step={0} total={4} />
      </FadeIn>
      <FadeIn delay={100}>
        <p className="text-sm text-amber-700 font-medium mb-2">STEP 1</p>
        <h2 className="font-serif text-3xl text-stone-800 mb-2 text-center">어떤 상황인가요?</h2>
        <p className="text-stone-400 mb-10 text-center">꽃을 선물할 상황을 선택해주세요</p>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl w-full">
        {OCCASIONS.map((o, i) => (
          <FadeIn key={o.id} delay={200 + i * 80}>
            <button
              onClick={() => onSelect(o.id)}
              className="group p-5 bg-white rounded-2xl shadow-sm hover:shadow-md border border-stone-100 hover:border-amber-200 transition-all duration-300 hover:-translate-y-1 text-center w-full"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{o.emoji}</div>
              <div className="font-medium text-stone-700 mb-1">{o.label}</div>
              <div className="text-xs text-stone-400">{o.desc}</div>
            </button>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function MoodScreen({ occasion, onSelect, onBack }) {
  const occasionData = OCCASIONS.find(o => o.id === occasion);
  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center" style={{ background: "linear-gradient(180deg, #F7F3EE, #FAF8F5)" }}>
      <FadeIn>
        <ProgressBar step={1} total={4} />
      </FadeIn>
      <FadeIn delay={100}>
        <p className="text-sm text-amber-700 font-medium mb-2">STEP 2</p>
        <h2 className="font-serif text-3xl text-stone-800 mb-2 text-center">어떤 분위기를 원하세요?</h2>
        <p className="text-stone-400 mb-10 text-center">
          {occasionData?.emoji} <span className="text-stone-600 font-medium">{occasionData?.label}</span>에 어울리는 분위기를 골라주세요
        </p>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg w-full mb-8">
        {MOODS.map((m, i) => (
          <FadeIn key={m.id} delay={200 + i * 80}>
            <button
              onClick={() => onSelect(m.id)}
              className="group p-6 rounded-2xl shadow-sm hover:shadow-md border border-white/80 transition-all duration-300 hover:-translate-y-1 text-center w-full"
              style={{
                background: `linear-gradient(135deg, ${m.color}18, ${m.color}30)`,
                borderColor: `${m.color}40`,
              }}
            >
              <div
                className="w-10 h-10 rounded-full mx-auto mb-3 group-hover:scale-110 transition-transform shadow-sm"
                style={{ backgroundColor: m.color }}
              />
              <div className="font-medium text-stone-700">{m.label}</div>
            </button>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={700}>
        <button onClick={onBack} className="text-sm text-stone-400 hover:text-stone-600 transition-colors">
          ← 이전 단계로
        </button>
      </FadeIn>
    </div>
  );
}

function RecommendationScreen({ occasion, mood, onSelect, onBack }) {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const recommendations = getRecommendations(occasion, mood);
  const moodData = MOODS.find(m => m.id === mood);
  const greeting = OCCASION_GREETINGS[occasion] || "마음을 담은";

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "linear-gradient(180deg, #F7F3EE, #FAF8F5)" }}>
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-stone-200" />
            <div className="absolute inset-0 rounded-full border-4 border-amber-600 border-t-transparent animate-spin" />
            <div className="absolute inset-3 flex items-center justify-center text-2xl">🌸</div>
          </div>
          <p className="font-serif text-xl text-stone-700 mb-2">AI가 꽃을 고르고 있어요</p>
          <p className="text-sm text-stone-400">
            {moodData?.label} 분위기의 꽃 조합을 찾는 중...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center" style={{ background: "linear-gradient(180deg, #F7F3EE, #FAF8F5)" }}>
      <FadeIn>
        <ProgressBar step={2} total={4} />
      </FadeIn>
      <FadeIn delay={100}>
        <p className="text-sm text-amber-700 font-medium mb-2">STEP 3</p>
        <h2 className="font-serif text-3xl text-stone-800 mb-2 text-center">{greeting}</h2>
        <h2 className="font-serif text-3xl text-stone-800 mb-2 text-center">꽃을 추천해드려요</h2>
        <p className="text-stone-400 mb-10 text-center">마음에 드는 꽃다발을 선택해주세요</p>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
        {recommendations.map((rec, i) => (
          <FadeIn key={i} delay={300 + i * 200}>
            <button
              onClick={() => setSelected(i)}
              className={`group text-left p-0 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 w-full ${
                selected === i ? "border-amber-600 shadow-lg" : "border-transparent"
              }`}
            >
              {/* Color palette header */}
              <div className="h-28 relative overflow-hidden" style={{
                background: `linear-gradient(135deg, ${rec.palette[0]}, ${rec.palette[1]}, ${rec.palette[2]})`
              }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl opacity-60 group-hover:scale-110 transition-transform">💐</span>
                </div>
                {selected === i && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-sm">✓</div>
                )}
                {i === 1 && (
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 rounded-full text-xs font-medium text-amber-700">추천</div>
                )}
              </div>

              <div className="p-5 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg text-stone-800">{rec.name}</h3>
                  <ColorPalette colors={rec.palette} />
                </div>
                <p className="text-sm text-amber-700 italic mb-3">"{rec.meaning}"</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {rec.flowers.map((f, j) => (
                    <span key={j} className="text-xs px-2 py-1 bg-stone-50 text-stone-500 rounded-full">{f}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                  <span className="text-xs text-stone-400">프렌치 스타일</span>
                  <span className="font-medium text-stone-700">{rec.price.toLocaleString()}원</span>
                </div>
              </div>
            </button>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={900}>
        <div className="flex gap-4">
          <button onClick={onBack} className="text-sm text-stone-400 hover:text-stone-600 transition-colors">
            ← 이전 단계로
          </button>
          {selected !== null && (
            <button
              onClick={() => onSelect(recommendations[selected])}
              className="px-6 py-2.5 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all"
              style={{ background: "linear-gradient(135deg, #B8694E, #8B5A3C)" }}
            >
              이 꽃다발로 선택 →
            </button>
          )}
        </div>
      </FadeIn>
    </div>
  );
}

function OrderScreen({ bouquet, occasion, onBack, onComplete }) {
  const [wrapping, setWrapping] = useState("kraft");
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const occasionData = OCCASIONS.find(o => o.id === occasion);
  const wrappingData = WRAPPING.find(w => w.id === wrapping);

  if (showConfirm) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "linear-gradient(180deg, #F7F3EE, #FAF8F5)" }}>
        <FadeIn>
          <div className="max-w-md text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl" style={{ backgroundColor: "#B8694E20" }}>
              ✨
            </div>
            <h2 className="font-serif text-3xl text-stone-800 mb-3">예약이 완료되었어요!</h2>
            <p className="text-stone-500 mb-8 leading-relaxed">
              <span className="font-medium text-stone-700">{bouquet.name}</span> 꽃다발을<br />
              정성껏 준비하겠습니다.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 text-left mb-8">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-400">상품</span>
                  <span className="text-stone-700 font-medium">{bouquet.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">포장</span>
                  <span className="text-stone-700">{wrappingData?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">카드 메시지</span>
                  <span className="text-stone-700 max-w-48 text-right truncate">{message || "(없음)"}</span>
                </div>
                <div className="border-t border-stone-100 pt-3 flex justify-between">
                  <span className="text-stone-700 font-medium">합계</span>
                  <span className="text-amber-700 font-bold text-lg">{bouquet.price.toLocaleString()}원</span>
                </div>
              </div>
            </div>
            <button
              onClick={onComplete}
              className="px-8 py-3 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all"
              style={{ background: "linear-gradient(135deg, #B8694E, #8B5A3C)" }}
            >
              처음으로 돌아가기
            </button>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center" style={{ background: "linear-gradient(180deg, #F7F3EE, #FAF8F5)" }}>
      <FadeIn>
        <ProgressBar step={3} total={4} />
      </FadeIn>
      <FadeIn delay={100}>
        <p className="text-sm text-amber-700 font-medium mb-2">STEP 4</p>
        <h2 className="font-serif text-3xl text-stone-800 mb-2 text-center">마지막 터치를 더해요</h2>
        <p className="text-stone-400 mb-10 text-center">포장과 메시지 카드를 선택해주세요</p>
      </FadeIn>

      <div className="max-w-3xl w-full grid md:grid-cols-2 gap-8">
        {/* Left: Selected bouquet preview */}
        <FadeIn delay={200}>
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
            <div className="h-40 relative" style={{
              background: `linear-gradient(135deg, ${bouquet.palette[0]}, ${bouquet.palette[1]}, ${bouquet.palette[2]})`
            }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">💐</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-1">
                <span>{occasionData?.emoji}</span>
                <span className="text-xs text-stone-400">{occasionData?.label}</span>
              </div>
              <h3 className="font-serif text-xl text-stone-800 mb-2">{bouquet.name}</h3>
              <p className="text-sm text-amber-700 italic mb-3">"{bouquet.meaning}"</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {bouquet.flowers.map((f, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-stone-50 text-stone-500 rounded-full">{f}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                <ColorPalette colors={bouquet.palette} />
                <span className="font-bold text-lg text-stone-800">{bouquet.price.toLocaleString()}원</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Right: Options */}
        <div className="space-y-6">
          {/* Wrapping */}
          <FadeIn delay={300}>
            <div>
              <h3 className="font-medium text-stone-700 mb-3">포장 스타일</h3>
              <div className="grid grid-cols-2 gap-3">
                {WRAPPING.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWrapping(w.id)}
                    className={`p-3 rounded-xl text-left transition-all border-2 ${
                      wrapping === w.id
                        ? "border-amber-600 bg-amber-50/50"
                        : "border-stone-100 bg-white hover:border-stone-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full" style={{ backgroundColor: w.color }} />
                      <span className="text-sm font-medium text-stone-700">{w.label}</span>
                    </div>
                    <span className="text-xs text-stone-400">{w.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Message card */}
          <FadeIn delay={400}>
            <div>
              <h3 className="font-medium text-stone-700 mb-3">메시지 카드</h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="받는 분에게 전할 메시지를 적어주세요..."
                className="w-full p-4 border border-stone-200 rounded-xl text-sm text-stone-700 placeholder-stone-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none bg-white"
                rows={3}
              />
            </div>
          </FadeIn>

          {/* Subscribe CTA */}
          <FadeIn delay={500}>
            <div className="p-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/30">
              <div className="flex items-start gap-3">
                <span className="text-xl">🌿</span>
                <div>
                  <p className="text-sm font-medium text-stone-700 mb-1">정기 구독으로 받아보세요</p>
                  <p className="text-xs text-stone-400">매주/격주/매월 신선한 꽃을 배달해드려요. 첫 구독 20% 할인!</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={600}>
            <div className="flex gap-3">
              <button onClick={onBack} className="px-4 py-3 border border-stone-200 rounded-xl text-sm text-stone-500 hover:bg-stone-50 transition-colors">
                ← 이전
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                className="flex-1 py-3 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all"
                style={{ background: "linear-gradient(135deg, #B8694E, #8B5A3C)" }}
              >
                예약하기 · {bouquet.price.toLocaleString()}원
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

// ===== MAIN APP =====
export default function NahwaApp() {
  const [screen, setScreen] = useState("landing");
  const [occasion, setOccasion] = useState(null);
  const [mood, setMood] = useState(null);
  const [bouquet, setBouquet] = useState(null);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goTo = (s) => { setScreen(s); scrollToTop(); };

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {screen === "landing" && (
        <LandingScreen onStart={() => goTo("occasion")} />
      )}
      {screen === "occasion" && (
        <OccasionScreen
          onSelect={(id) => { setOccasion(id); goTo("mood"); }}
        />
      )}
      {screen === "mood" && (
        <MoodScreen
          occasion={occasion}
          onSelect={(id) => { setMood(id); goTo("recommendation"); }}
          onBack={() => goTo("occasion")}
        />
      )}
      {screen === "recommendation" && (
        <RecommendationScreen
          occasion={occasion}
          mood={mood}
          onSelect={(b) => { setBouquet(b); goTo("order"); }}
          onBack={() => goTo("mood")}
        />
      )}
      {screen === "order" && (
        <OrderScreen
          bouquet={bouquet}
          occasion={occasion}
          onBack={() => goTo("recommendation")}
          onComplete={() => {
            setOccasion(null);
            setMood(null);
            setBouquet(null);
            goTo("landing");
          }}
        />
      )}

      {/* Footer - only on landing */}
      {screen === "landing" && (
        <footer className="py-12 px-6 text-center" style={{ backgroundColor: "#2B2B2B" }}>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xl">🌿</span>
              <span className="font-serif text-lg text-white tracking-wide">나화</span>
              <span className="text-xs text-stone-400">裸花, nahwa</span>
            </div>
            <p className="text-sm text-stone-400 mb-6">자연스러운 아름다움을 AI 기술로 더 가까이</p>
            <div className="flex justify-center gap-6 text-xs text-stone-500">
              <span>서울 창업 예정</span>
              <span>·</span>
              <span>예약 문의: 카카오톡 @nahwa</span>
              <span>·</span>
              <span>Instagram @nahwa_flower</span>
            </div>
            <p className="text-xs text-stone-600 mt-8">© 2026 나화(裸花). All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
}
