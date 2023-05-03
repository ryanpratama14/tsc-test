import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const CartModal = ({ show, onClose }: any) => {
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
              <div className="relative w-[80%] lg:w-[50%] xl:w-[20%] p-shorter lg:p-shorter2 bg-white flex flex-col gap-4 rounded-xl">
                <button
                  onClick={onClose}
                  className="lg:pBigger absolute font-bold top-4 right-4 w-8 aspect-square bg-black text-white rounded-full"
                >
                  X
                </button>
                <p>
                  Продукт успешно
                  <br />
                  добавлен в корзину
                </p>
                <div className="flex w-full justify-center">
                  <button className="w-fit px-3 py-2 text-white bg-black rounded-md">
                    Перейти в корзину
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CartModal;
