import Image from 'next/image';

import CloseCircleGrayIcon from '@/assets/closeCircleGrayIcon.svg';
import BoyImg from '@/assets/images/boy 1.png';
import { CustomButton } from '@/components/CustomButton';
import { CustomModal } from '@/components/CustomModal';

const ConfirmStatusModal = ({
  isOpen,
  onCancel,
  onSuccess,
  content,
  isLoading,
}: {
  isOpen: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
  content: string;
  isLoading?: boolean;
}) => {
  return (
    <CustomModal
      closeIcon={<Image src={CloseCircleGrayIcon} alt="" />}
      isOpen={isOpen}
      onCancel={onCancel}
      onSubmit={onCancel}
      customFooter
      width={500}
    >
      <div className="flex flex-col items-center justify-center gap-6 text-[#1C1C28]">
        <div className="text-xl font-semibold">Hủy đại lý</div>
        <div className="h-[1px] w-full bg-[#C7C9D9]" />
        <Image src={BoyImg} alt="" />
        <div className="flex text-center text-lg">
          Bạn có chắc chắn muốn hủy đại lý của cửa hàng {content} này?
        </div>

        <div className="grid w-full grid-cols-2 gap-4">
          <CustomButton
            outline={true}
            className="!h-11 w-full"
            onClick={onCancel}
          >
            Đóng
          </CustomButton>
          <CustomButton
            disabled={isLoading}
            className="!h-11 w-full"
            onClick={onSuccess}
          >
            Hủy đạy lý
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmStatusModal;
