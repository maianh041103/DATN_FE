import Image from "next/image";

import CloseCircleGrayIcon from "@/assets/closeCircleGrayIcon.svg";
import BoyImg from "@/assets/images/boy 1.png";
import { CustomButton } from "@/components/CustomButton";
import { CustomModal } from "@/components/CustomModal";

/**
 * UpdateStatusModal component renders a modal for updating the status of an item.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {() => void} props.onCancel - Function to call when the cancel button is clicked.
 * @param {() => void} [props.onSuccess] - Optional function to call when the success button is clicked.
 * @param {string} props.content - The content to be displayed in the modal.
 * @param {boolean} [props.isLoading] - Optional flag to indicate if the update action is in progress.
 *
 * @returns {JSX.Element} The rendered UpdateStatusModal component.
 */
const UpdateStatusModal = ({
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
        <div className="text-xl font-semibold">Cập nhật {content}</div>
        <div className="h-[1px] w-full bg-[#C7C9D9]" />
        <Image src={BoyImg} alt="" />
        <div className="flex text-center text-lg">Bạn có chắc chắn muốn cập nhật {content} này?</div>

        <div className="grid w-full grid-cols-2 gap-4">
          <CustomButton outline={true} className="!h-11 w-full" onClick={onCancel}>
            Hủy
          </CustomButton>
          <CustomButton disabled={isLoading} className="!h-11 w-full" onClick={onSuccess}>
            Cập nhật
          </CustomButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default UpdateStatusModal;
