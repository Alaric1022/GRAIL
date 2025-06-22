// 你的主程式內容如下（就是你前面提供的，完整貼上即可）
import React from "react";

// 字體自動加載（放這裡即可，無需再去 public/index.html）
if (!document.querySelector("link[href*='fonts.googleapis.com']")) {
  const styleFont = document.createElement("link");
  styleFont.rel = "stylesheet";
  styleFont.href =
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Noto+Sans+TC:wght@400;700&display=swap";
  document.head.appendChild(styleFont);
}

// 判斷是否白天（0:00~11:59）
function getIsDay() {
  const hour = new Date().getHours();
  return hour >= 0 && hour < 12;
}
// 偵測手機寬度
function useIsMobile(threshold = 700) {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth < threshold : false
  );
  React.useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < threshold);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [threshold]);
  return isMobile;
}

// 雙語詞庫
const dict = {
  zh: {
    siteName: "穿搭進化論",
    slogan: "AI．風格．無極限",
    heroBtn: "立即體驗",
    cards: [
      {
        title: "AI 穿搭建議",
        desc: "專屬你的靈感，每天推薦新穿搭。",
        icon: "✨",
      },
      {
        title: "虛擬試穿體驗",
        desc: "手機即拍即換裝，輕鬆挑新衣。",
        icon: "🪞",
      },
      {
        title: "設計師平台",
        desc: "作品上架全球，創作輕鬆變現。",
        icon: "🎨",
      },
    ],
    testimonials: [
      "「G.R.A.I.L 讓我買衣服超開心！」 — Alice",
      "「我的設計第一次被世界看到，超感動！」 — Joe（設計師）",
    ],
    langSwitch: "English",
    footer: {
      about: "關於我們",
      social: "FB ｜ IG",
      email: "Email: GroupforresearchAI7@grail.com",
      copyright: "© 2025 G.R.A.I.L",
    },
  },
  en: {
    siteName: "Style Evolution",
    slogan: "AI · Style · Unlimited",
    heroBtn: "Try Now",
    cards: [
      {
        title: "AI Outfit Advisor",
        desc: "Personalized inspiration, daily new outfit ideas.",
        icon: "✨",
      },
      {
        title: "Virtual Try-On",
        desc: "Try on clothes instantly with your phone.",
        icon: "🪞",
      },
      {
        title: "Designer Platform",
        desc: "Showcase your work globally, monetize easily.",
        icon: "🎨",
      },
    ],
    testimonials: [
      '"G.R.A.I.L made shopping for clothes so much fun!" — Alice',
      '"My designs are seen globally for the first time, so touched!" — Joe (Designer)',
    ],
    langSwitch: "繁體中文",
    footer: {
      about: "About",
      social: "FB | IG",
      email: "Email: GroupforresearchAI7@grail.com",
      copyright: "© 2025 G.R.A.I.L",
    },
  },
};

// 卡片元件
function Card({ isDay, title, desc, icon }) {
  const cardTitle = isDay ? "#2193b0" : "#42aaff";
  const cardDesc = isDay ? "#5588a7" : "#b6e4fc";
  const cardBg = isDay ? "#fff" : "#191b1e";
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: cardBg,
        borderRadius: 28,
        border: "3px solid transparent",
        position: "relative",
        boxShadow: hover
          ? isDay
            ? "0 16px 48px #42aaff55"
            : "0 16px 48px #42aaff90"
          : isDay
          ? "0 6px 24px #e0e8fc33"
          : "0 6px 24px #2228",
        minWidth: 220,
        maxWidth: 270,
        textAlign: "center",
        fontFamily: `'Montserrat','Noto Sans TC',sans-serif`,
        transform: hover ? "translateY(-12px) scale(1.06)" : "none",
        margin: "0 8px",
        zIndex: hover ? 1 : 0,
        padding: 0,
        overflow: "hidden",
        color: isDay ? "#222" : "#fff",
        transition:
          "box-shadow 0.3s, transform 0.3s, background 0.5s, color 0.5s",
        cursor: "pointer",
      }}
    >
      {/* 漸層邊框 */}
      <div
        style={{
          position: "absolute",
          top: -3,
          left: -3,
          right: -3,
          bottom: -3,
          zIndex: -1,
          borderRadius: 32,
          background: "linear-gradient(120deg, #42aaff, #b6e4fc 80%)",
          filter: hover ? "brightness(1.16)" : "brightness(1)",
        }}
      />
      <div style={{ padding: "38px 28px" }}>
        {/* emoji 或 SVG icon */}
        <div
          style={{
            fontSize: 44,
            marginBottom: 10,
            transition: "transform 0.25s",
            transform: hover ? "scale(1.13) rotate(-8deg)" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        <b style={{ fontSize: 22, color: cardTitle, letterSpacing: 1.2 }}>
          {title}
        </b>
        <div style={{ color: cardDesc, marginTop: 15, fontSize: 17 }}>
          {desc}
        </div>
      </div>
    </div>
  );
}

// Navbar 元件，語言切換按鈕在右上角
function Navbar({ isDay, lang, setLang }) {
  const [hoverIndex, setHoverIndex] = React.useState(null);
  const navStyle = {
    display: "flex",
    alignItems: "center",
    background: isDay ? "#fff" : "#111",
    padding: "24px 40px 10px 40px",
    borderBottom: isDay ? "1px solid #e0e0e0" : "1px solid #333",
    position: "sticky",
    top: 0,
    zIndex: 10,
    transition: "background 0.4s, color 0.4s",
    fontFamily: `'Montserrat','Noto Sans TC',sans-serif`,
  };
  const links = ["首頁", "產品", "聯絡我們"];
  return (
    <div style={navStyle}>
      <img
        src="https://via.placeholder.com/120x40?text=GRAIL"
        alt="logo"
        style={{
          marginRight: 40,
          filter: isDay
            ? "drop-shadow(0 1px 8px #b6e4fc99)"
            : "drop-shadow(0 1px 8px #222)",
        }}
      />
      {links.map((label, idx) => {
        // 決定滑鼠移過去時的反色
        const hovered = hoverIndex === idx;
        const bgColor = hovered ? (isDay ? "#111" : "#fff") : "transparent";
        const color = hovered
          ? isDay
            ? "#fff"
            : "#111"
          : isDay
          ? "#111"
          : "#fff";
        return (
          <span
            key={label}
            style={{
              fontSize: 18,
              color,
              background: bgColor,
              marginRight: 28,
              cursor: "pointer",
              fontWeight: 700,
              letterSpacing: 1,
              padding: "4px 16px",
              borderRadius: 8,
              transition:
                "box-shadow 0.22s, background 0.15s, color 0.13s, transform 0.22s",
              boxShadow: hovered
                ? "0 4px 18px #42aaff44, 0 2px 6px #b6e4fc33"
                : "none",
              transform: hovered ? "translateY(-3px) scale(1.06)" : "none",
            }}
            onMouseEnter={() => setHoverIndex(idx)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {label}
          </span>
        );
      })}
      {/* 語言切換按鈕放最右側 */}
      <button
        style={{
          marginLeft: "auto",
          fontWeight: 800,
          border: "none",
          background: "none",
          color: isDay ? "#2193b0" : "#b6e4fc",
          fontSize: 17,
          letterSpacing: 2,
          cursor: "pointer",
          padding: "6px 22px",
          borderRadius: 16,
          transition: "color 0.3s, background 0.3s",
          outline: "none",
        }}
        onClick={setLang}
      >
        {dict[lang].langSwitch}
      </button>
    </div>
  );
}

// Footer 元件
function Footer({ isDay, lang }) {
  const content = dict[lang].footer;
  return (
    <div
      style={{
        background: isDay ? "#f8fbfe" : "#191b1e",
        padding: 28,
        color: isDay ? "#2193b0" : "#b6e4fc",
        fontSize: 15,
        textAlign: "center",
        marginTop: 60,
        letterSpacing: 1,
        fontFamily: `'Noto Sans TC', 'Montserrat', sans-serif`,
        borderTop: isDay ? "1px solid #e0e0e0" : "1px solid #333",
      }}
    >
      <div style={{ marginBottom: 8 }}>
        <img
          src="https://via.placeholder.com/80x20?text=GRAIL"
          alt="logo"
          style={{
            verticalAlign: "middle",
            marginBottom: 2,
            filter: isDay
              ? "drop-shadow(0 1px 4px #b6e4fc88)"
              : "drop-shadow(0 1px 4px #42aaffaa)",
          }}
        />
      </div>
      <div style={{ marginBottom: 8 }}>{content.about} ｜ {content.social}</div>
      <div>{content.email}</div>
      <div style={{ marginTop: 8, fontSize: 13 }}>{content.copyright}</div>
    </div>
  );
}

// App 主元件
function App() {
  const isDay = getIsDay();
  const isMobile = useIsMobile(700);
  const [lang, setLang] = React.useState("zh");
  const [show, setShow] = React.useState(true); // 漸顯動畫控制
  const content = dict[lang];

  // 語言切換時的動畫
  function handleLangSwitch() {
    setShow(false);
    setTimeout(() => {
      setLang((prev) => (prev === "zh" ? "en" : "zh"));
      setShow(true);
    }, 240);
  }

  return (
    <div
      style={{
        background: isDay
          ? "linear-gradient(120deg, #e0f7fa 0%, #b6e4fc 80%)"
          : "linear-gradient(120deg, #1c2331 0%, #293548 80%)",
        minHeight: "100vh",
        color: isDay ? "#111" : "#fff",
        transition: "background 0.5s, color 0.5s",
      }}
    >
      <Navbar isDay={isDay} lang={lang} setLang={handleLangSwitch} />
      {/* 漸顯動畫包裹層 */}
      <div
        style={{
          opacity: show ? 1 : 0,
          transition: "opacity 0.35s",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: isMobile ? "32px 10px 24px 10px" : "76px 24px 24px 24px",
            textAlign: "center",
            fontFamily: `'Montserrat','Noto Sans TC',sans-serif`,
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? 32 : 52,
              fontWeight: 900,
              letterSpacing: 3,
              margin: "0 0 16px 0",
              color: isDay ? "#111" : "#fff",
              textShadow: isDay ? "0 4px 32px #42aaff22" : "0 4px 32px #42aaff55",
            }}
          >
            {content.siteName}
          </h1>
          <div
            style={{
              fontSize: isMobile ? 18 : 26,
              color: isDay ? "#1a3b51" : "#b6e4fc",
              marginBottom: 36,
              fontWeight: 500,
              letterSpacing: 2,
              fontFamily: `'Noto Sans TC', 'Montserrat',sans-serif`,
            }}
          >
            {content.slogan}
          </div>
          {/* 主行動按鈕 */}
          <button
            style={{
              background: isDay
                ? "linear-gradient(90deg, #42aaff 0%, #b6e4fc 100%)"
                : "linear-gradient(90deg, #42aaff 0%, #111 100%)",
              color: isDay ? "#111" : "#fff",
              border: "none",
              borderRadius: 30,
              padding: isMobile ? "14px 36px" : "20px 60px",
              fontSize: isMobile ? 18 : 24,
              fontWeight: 900,
              letterSpacing: 2,
              boxShadow: isDay ? "0 6px 32px #42aaff44" : "0 6px 32px #42aaff99",
              marginBottom: 40,
              cursor: "pointer",
              transition: "background 0.3s, color 0.2s",
            }}
          >
            {content.heroBtn}
          </button>
          {/* 三大亮點卡片 */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              gap: 36,
              margin: "60px 0 0 0",
              justifyContent: "center",
            }}
          >
            {content.cards.map((c, i) => (
              <Card key={i} {...c} isDay={isDay} />
            ))}
          </div>
          {/* 用戶見證／Testimonials */}
          <div
            style={{
              margin: "70px 0 0 0",
              color: isDay ? "#fff" : "#111",
              background: isDay ? "#111" : "#fff",
              fontStyle: "italic",
              fontSize: isMobile ? 16 : 19,
              textAlign: "center",
              lineHeight: 1.8,
              fontFamily: `'Noto Sans TC', 'Montserrat',sans-serif`,
              borderRadius: 18,
              padding: isMobile ? "22px 0" : "40px 0",
              boxShadow: isDay
                ? "0 8px 40px #1112, 0 1.5px 7px #42aaff11"
                : "0 8px 40px #b6e4fc33, 0 1.5px 7px #1c233111",
              textShadow: isDay
                ? "0 2px 12px #000a"
                : "0 2px 8px #b6e4fc88, 0 1px 6px #fff8",
              transition: "background 0.35s, color 0.25s",
              width: isMobile ? "96%" : 605,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {content.testimonials.map((t, idx) => (
              <div key={idx}>{t}</div>
            ))}
          </div>
        </div>
      </div>
      <Footer isDay={isDay} lang={lang} />
    </div>
  );
}

export default App;