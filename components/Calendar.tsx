
import React from 'react';

const Calendar: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const date = new Date(targetDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const calendarRows = [];
  let currentDay = 1;

  for (let i = 0; i < 6; i++) {
    const cells = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cells.push(<td key={`${i}-${j}`} className="p-2"></td>);
      } else if (currentDay > daysInMonth) {
        cells.push(<td key={`${i}-${j}`} className="p-2"></td>);
      } else {
        const isTarget = currentDay === day;
        const isSunday = j === 0;
        const isSaturday = j === 6;
        
        cells.push(
          <td key={`${i}-${j}`} className="p-2 text-center text-sm relative">
            <span className={`
              inline-block w-8 h-8 leading-8 rounded-full transition-all
              ${isTarget ? 'bg-rose-100 text-rose-600 font-bold scale-110 shadow-sm' : ''}
              ${isSunday ? 'text-red-500' : ''}
              ${isSaturday ? 'text-blue-500' : ''}
              ${!isTarget && !isSunday && !isSaturday ? 'text-gray-700' : ''}
            `}>
              {currentDay}
            </span>
          </td>
        );
        currentDay++;
      }
    }
    calendarRows.push(<tr key={i}>{cells}</tr>);
    if (currentDay > daysInMonth) break;
  }

  // D-Day 계산
  const today = new Date();
  today.setHours(0,0,0,0);
  const targetMidnight = new Date(date);
  targetMidnight.setHours(0,0,0,0);
  const diffTime = targetMidnight.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold text-gray-800 mb-6">
        {year}. {String(month + 1).padStart(2, '0')}
      </div>
      <table className="w-full max-w-xs border-collapse">
        <thead>
          <tr>
            {['일','월','화','수','목','금','토'].map((d, i) => (
              <th key={d} className={`p-2 text-xs font-light ${i === 0 ? 'text-red-300' : i === 6 ? 'text-blue-300' : 'text-gray-300'}`}>
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarRows}
        </tbody>
      </table>
      <div className="mt-8 text-center bg-gray-50/50 px-8 py-3 rounded-full">
        <p className="text-gray-400 text-xs tracking-widest mb-1 uppercase">우리 함께한지</p>
        <p className="text-gray-800 font-bold text-lg">
          {diffDays === 0 ? 'HAPPY WEDDING DAY!' : diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`}
        </p>
      </div>
    </div>
  );
};

export default Calendar;
