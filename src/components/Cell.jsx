import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faFlag, faWarning } from '@fortawesome/free-solid-svg-icons';

const Cell = ({
  row,
  col,
  isWall,
  isStart,
  isEnd,
  onCellClick,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDragOver,
  onDrop,
  onTouchStart,
  onTouchMove,
  onTouchEnd
}) => {
  const getBgColor = () => {
    // if (isStart) return 'bg-green-500';
    // if (isEnd) return 'bg-red-500';
    // if (isWall) return 'bg-gray-800';
    return 'bg-gray-200';
  };

  return (
    <div
      id={`cell-${row}-${col}`}
      onClick={() => onCellClick(row, col)}
      draggable={isStart || isEnd}
      onDragStart={(e) => onDragStart(e, row, col, isStart, isEnd)}
      onDragEnter={(e) => onDragEnter(e, row, col)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOver(e)}
      onDrop={onDrop}
      onTouchStart={(e) => onTouchStart(e, row, col, isStart, isEnd)}
      onTouchMove={(e) => onTouchMove(e, row, col)}
      onTouchEnd={onTouchEnd}
      className={`w-2 h-2 md:w-4 md:h-4 border border-gray-300 ${getBgColor()} transition-all duration-200 ease-in-out relative`}
      style={{ transitionProperty: 'background-color, transform' }}
    >
      {isWall && (
        <FontAwesomeIcon
          icon={faWarning}
          className="text-black-500 absolute inset-0 m-auto w-auto h-auto md:w-3 md:h-3"
        />
      )}
      {isStart && (
        <FontAwesomeIcon
          icon={faPlay}
          className="text-red-500 absolute inset-0 m-auto w-auto h-auto md:w-3 md:h-3"
          id="start"
        />
      )}
      {isEnd && (
        <FontAwesomeIcon
          icon={faFlag}
          className="text-green-500 absolute inset-0 m-auto w-auto h-auto md:w-3 md:h-3"
          id="end"
        />
      )}
    </div>
  );
};

export default React.memo(Cell);
