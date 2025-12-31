const Card = ({ note, time, onDelete, index }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-indigo-500 transform hover:-translate-y-1" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
            <h2 className="text-lg font-semibold text-gray-800 break-words">{note}</h2>
          </div>
          <div className="flex items-center gap-2 text-sm bg-indigo-50 p-3 rounded-lg">
            <svg className="w-5 h-5 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">Remind me at</span>
              <span className="text-sm text-gray-800 font-semibold">{time}</span>
            </div>
          </div>
        </div>
        <button onClick={onDelete} className="bg-red-500 hover:bg-red-600 active:scale-95 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;