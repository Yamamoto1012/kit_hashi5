export default function Popup() {
  return (
    <div className="fixed p-2 bottom-0 left-0 right-0 text-center rainbow-bg">
      <style>
        {`
          @keyframes rainbow-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .rainbow-bg {
            background: linear-gradient(270deg, red, orange, yellow, green, blue, indigo, violet);
            background-size: 400% 400%;
            animation: rainbow-animation 8s ease infinite;
          }
          .rainbow-text {
            animation: rainbow 2s infinite;
          }
        `}
      </style>
      <p>こっちも見てほしいです... 
        <a href="https://civictech-web-2023.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline">CivicTechWebへ</a>
      </p>
    </div>
  );
}
