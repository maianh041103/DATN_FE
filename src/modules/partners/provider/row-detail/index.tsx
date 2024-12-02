import classNames from 'classnames';
import { useState } from 'react';

import type { IRecord } from '..';
import { Debt } from './Debt';
import { History } from './History';
import { Info } from './Info';

const RowDetail = ({ record }: { record: IRecord }) => {
  const [select, setSelect] = useState(0);

  const menu = ['Thông tin', 'Lịch sử nhập/trả hàng', 'Nợ cần trả NCC'];

  return (
    <div
      className="flex flex-col gap-5 bg-white px-4 pt-4 pb-5"
      style={{ boxShadow: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)' }}
    >
      <div className="flex flex-col">
        <div className="flex gap-3">
          {menu.map((item, index) => (
            <div
              key={index}
              className={classNames(
                'cursor-pointer px-5 py-[6px] rounded-t-lg',
                index === select
                  ? 'bg-[#D64457] text-[white]'
                  : 'text-black-main'
              )}
              onClick={() => setSelect(index)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="h-[1px] w-full bg-[#D64457]" />
      </div>
      {select === 0 && <Info record={record} />}
      {select === 1 && <History record={record} />}
      {select === 2 && <Debt record={record} />}
    </div>
  );
};

export default RowDetail;