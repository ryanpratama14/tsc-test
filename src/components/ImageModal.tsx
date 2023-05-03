import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ImageModal = ({ show, onClose, data }: any) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative w-[80%] lg:w-[50%] px-shorter pb-shorter pt-longer3 lg:px-shorter2 lg:pb-shorter2 lg:pt-shorter bg-white flex flex-col gap-4 rounded-xl">
                <button
                  onClick={onClose}
                  className="lg:pBigger absolute font-bold top-4 right-4 w-8 aspect-square bg-black text-white rounded-full"
                >
                  X
                </button>
                <img src={data?.name ? URL.createObjectURL(data) : data} />
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImageModal;
