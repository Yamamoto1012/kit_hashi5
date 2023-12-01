const Announcement = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <div className="mb-4">
        <p className="text-lg font-bold mb-2 text-gray-700">運営からのお知らせ</p>
        <div className="border-t border-gray-300 pt-2">
          <a
            href="https://forms.office.com/r/dWtKFQ509i"
            className="text-blue-600 hover:text-blue-800 hover:underline"
            target="_blank" rel="noopener noreferrer"
          >
            アンケートにご協力お願いします
          </a>
        </div>
      </div>
      <div>
        <p className="text-lg font-bold mb-2 text-gray-700">あなたへのお知らせ (個人通知)</p>
        <div className="border-t border-gray-300 pt-2">
          {/* ここに個人通知のコンテンツを追加 */}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
