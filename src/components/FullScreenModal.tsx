import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const FullScreenModal = ({ show, onClose, data }: any) => {
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
          <div className="flex items-center justify-center min-h-full text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative w-[100%] min-h-screen max-h-screen p-shorter lg:p-shorter2 bg-white flex flex-col gap-4">
                <button
                  onClick={onClose}
                  className="lg:pBigger absolute font-bold top-4 right-4 w-8 aspect-square bg-black text-white rounded-full"
                >
                  X
                </button>
                {data}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FullScreenModal;
