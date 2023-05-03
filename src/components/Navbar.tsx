import { useState } from "react";
import CartModal from "./CartModal";

const Navbar = (): JSX.Element => {
  const [title, setTitle] = useState<string>("Мой проект");
  const [show, setShow] = useState<Boolean>(false);
  const onClose = () => {
    setShow(false);
  };

  return (
    <nav className="p-shorter2 lg:p-shorter4 bg-white border-b-[2px] border-blue-100">
      <CartModal show={show} onClose={onClose} />
      <div className="flex justify-between flex-wrap sm:flex-nowrap gap-y-4 items-center">
        <div className="flex flex-col sm:w-fit w-full">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-xl text-blueCustom font-medium"
          />
          <label>Размер: 400х280</label>
          <label>мм (в развороте)</label>
        </div>
        <div className="flex gap-4 w-full sm:w-fit items-center justify-end">
          <button
            className="text-white px-3 py-2 bg-black h-fit rounded-md"
            onClick={() => {
              setShow(true);
            }}
          >
            В корзину
          </button>
          <div
            onClick={() => {}}
            className="flex flex-col gap-1 px-4 cursor-pointer"
          >
            <div className="w-1 bg-black aspect-square rounded-full" />
            <div className="w-1 bg-black aspect-square rounded-full" />
            <div className="w-1 bg-black aspect-square rounded-full" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
