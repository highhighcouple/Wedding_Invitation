
import React, { useState } from 'react';
import { addGuestbook, getGuestbook } from '../dataStore';
import { GuestbookEntry } from '../types';

const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(getGuestbook());
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    
    addGuestbook({ name, content });
    setEntries(getGuestbook());
    setName('');
    setContent('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {entries.slice(0, 3).map(entry => (
          <div key={entry.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-800 text-sm">{entry.name}</span>
              <span className="text-[10px] text-gray-400">{new Date(entry.date).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{entry.content}</p>
          </div>
        ))}
        {entries.length === 0 && <p className="text-center text-gray-400 text-sm py-8">첫 번째 축복의 한마디를 남겨주세요.</p>}
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex-1 py-3 bg-gray-800 text-white rounded-lg text-sm font-bold shadow-lg hover:bg-gray-700 transition-colors"
        >축하 메시지 남기기</button>
        {entries.length > 3 && (
          <button className="px-6 py-3 border border-gray-200 rounded-lg text-sm text-gray-500">더보기</button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">방명록 작성</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="성함을 입력해주세요." 
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={20}
                className="w-full p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-200"
              />
              <textarea 
                placeholder="내용을 입력해주세요. (최대 255자)" 
                value={content}
                onChange={e => setContent(e.target.value)}
                maxLength={255}
                className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-rose-200 resize-none"
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-500 rounded-lg text-sm">취소</button>
                <button type="submit" className="flex-1 py-3 bg-rose-400 text-white rounded-lg text-sm font-bold">등록하기</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guestbook;
