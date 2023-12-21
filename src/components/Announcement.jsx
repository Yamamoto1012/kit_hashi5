import { auth } from "../firebase";

const Announcement = ({ unreadMessages }) => {
  const currentUser = auth.currentUser;

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <div className="mb-6">
        {currentUser && (
          <div>
            <p className="text-xl font-bold mb-3 text-gray-700">
              あなたへのお知らせ (個人通知)
            </p>
            <div className="border-t border-gray-300 pt-2 space-y-2">
              {/* ここに個人通知の内容を実装する */}
              {unreadMessages > 0 && (
                <p className="text-gray-700">
                  未読メッセージが {unreadMessages} 件あります。
                </p>
              )}
            </div>
            <br />
          </div>
        )}
        <p className="text-xl font-bold mb-3 text-gray-700">
          運営からのお知らせ
        </p>
        <div className="border-t border-gray-300 pt-2 space-y-2">
          {/* ここに全体への通知を実装する */}
          <a
            href="https://forms.office.com/r/dWtKFQ509i"
            className="text-blue-600 hover:text-blue-800 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            アンケートにご協力お願いします
          </a>
        </div>
        <br />
        <p className="text-xl font-bold mb-3 text-gray-700">
          広報
        </p>
        <div className="border-t border-gray-300 pt-2 space-y-2">
          <a
            href="https://civictech-web-2023.vercel.app/"
            className="text-blue-600 hover:text-blue-800 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            CivicTech-web
          </a>
          <p className="text-gray-700">
            ずんだもんによるシビックテックについての説明動画
          </p>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/lhS7QgItOhs?si=bYEdCcAKWbU_jrNJ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-md"
            ></iframe>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Announcement;
