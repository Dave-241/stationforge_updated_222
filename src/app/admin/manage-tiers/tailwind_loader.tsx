// components/TailwindLoader.js

export default function TailwindLoader() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="loader">
        <div className="dot bg-[#CCFF00]"></div>
        <div className="dot bg-[#CCFF00]"></div>
        <div className="dot bg-[#CCFF00]"></div>
      </div>
      <style jsx>{`
        .loader {
          display: flex;
          align-items: center;
        }

        .dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin: 0 5px;
          animation: bounce 0.6s infinite alternate;
        }

        .dot:nth-child(1) {
          animation-delay: 0s;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          to {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
