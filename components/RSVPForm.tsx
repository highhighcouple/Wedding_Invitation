
import React, { useState } from 'react';
import { addRSVP } from '../dataStore';

const RSVPForm: React.FC = () => {
  const [side, setSide] = useState<'groom' | 'bride'>('groom');
  const [attendance, setAttendance] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [willEat, setWillEat] = useState(true);
  const [count, setCount] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("성함을 입력해주세요.");
      return;
    }
    addRSVP({ side, attendance, name, phone, willEat, count });
    alert("참석 명단에 등록되었습니다. 감사합니다.");
    setName('');
    setPhone('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setSide('groom')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${side === 'groom' ? 'bg-sky-50 text-sky-600' : 'bg-gray-50 text-gray-400'}`}
        >신랑측</button>
        <button 
          onClick={() => setSide('bride')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${side === 'bride' ? 'bg-rose-50 text-rose-600' : 'bg-gray-50 text-gray-400'}`}
        >신부측</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-6 justify-center py-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" checked={attendance} onChange={() => setAttendance(true)} /> 참석
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="radio" checked={!attendance} onChange={() => setAttendance(false)} /> 불참
          </label>
        </div>

        <input 
          type="text" 
          placeholder="성함 입력" 
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 bg-gray-50 border-none rounded-lg text-sm outline-none" 
        />
        <input 
          type="tel" 
          placeholder="010-0000-0000" 
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full p-3 bg-gray-50 border-none rounded-lg text-sm outline-none" 
        />
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-500">식사 여부</span>
          <div className="flex gap-4">
            <label className="text-xs flex items-center gap-1 cursor-pointer">
              <input type="radio" checked={willEat} onChange={() => setWillEat(true)} /> 예정
            </label>
            <label className="text-xs flex items-center gap-1 cursor-pointer">
              <input type="radio" checked={!willEat} onChange={() => setWillEat(false)} /> 미예정
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-500">본인 포함 인원</span>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setCount(Math.max(1, count - 1))} className="w-6 h-6 bg-white rounded flex items-center justify-center">-</button>
            <span className="text-sm font-bold">{count}명</span>
            <button type="button" onClick={() => setCount(count + 1)} className="w-6 h-6 bg-white rounded flex items-center justify-center">+</button>
          </div>
        </div>

        <button type="submit" className="w-full py-4 bg-gray-800 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all">
          참석 여부 등록하기
        </button>
      </form>
    </div>
  );
};

export default RSVPForm;
