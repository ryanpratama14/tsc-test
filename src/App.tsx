import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Icon } from "@iconify/react";
import { Toaster, toast } from "react-hot-toast";
import bg from "./assets/bg.jpeg";
import { motion } from "framer-motion";

interface BookData {
  pages: PageData[];
}

interface PageData {
  images: any[];
  bg: any;
}

interface ToggleItems {
  id: number;
  files: any[];
  label: string;
}

const App = (): JSX.Element => {
  const [drag, setDrag] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(0);
  const [selectedToggle, setSelectedToggle] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [data, setData] = useState<BookData>({
    pages: [
      {
        images: [],
        bg: "",
      },
    ],
  });

  const [toggleData, setToggleData] = useState<ToggleItems[]>([
    {
      id: 0,
      files: [],
      label: "Галерея",
    },
    {
      id: 1,
      files: [],
      label: "Шаблоны",
    },
    {
      id: 2,
      files: [bg],
      label: "Фон",
    },
  ]);

  function dragStartHandler(e: any) {
    e.preventDefault();
    e?.type === "dragover" && setDrag(true);
  }

  function dragLeaveHandler(e: any) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e: any) {
    e.preventDefault();
    const newPages = [...data?.pages];
    const currentPage = newPages[selected];
    currentPage?.images?.push(
      e?.dataTransfer?.files[0]
        ? e?.dataTransfer?.files[0]
        : toggleData[selectedToggle]?.files[selectedImage]
    );
    setData({
      ...data,
      pages: newPages,
    });
    setDrag(false);
  }

  function setSelectedAndAddPage(index: number) {
    setSelected(index);
    if (index >= data?.pages?.length) {
      setData({
        ...data,
        pages: [
          ...data?.pages,
          {
            images: [],
            bg: "",
          },
        ],
      });
      toast.success("Новая страница добавлена");
    }
  }

  const handleChange = (e: any) => {
    if (e?.target?.files[0]) {
      const newData = [...toggleData];
      newData[selectedToggle]?.files?.unshift(e?.target?.files[0]);
      toast.success("Фото добавлено");
      setToggleData(newData);
    }
  };

  const handleImageClick = (index: number) => {
    if (isEdit) {
      if (selectedImages?.includes(index)) {
        setSelectedImages(selectedImages?.filter((i) => i !== index));
      } else {
        setSelectedImages([...selectedImages, index]);
      }
    } else {
      const newPages = [...data?.pages];
      const currentPage = newPages[selected];
      const selectedFile = toggleData[selectedToggle]?.files[index];
      if (selectedToggle === 2) {
        currentPage.bg = selectedFile;
        toast.success("Фон добавлен");
      } else if (selectedToggle === 0 || selectedToggle === 1) {
        currentPage?.images?.push(selectedFile);
        toast.success("Изображение добавлен");
      }
      setData({
        ...data,
        pages: newPages,
      });
    }
  };

  const handleDeleteImages = () => {
    if (selectedImages?.length) {
      const newData = { ...toggleData };
      const imagesToDelete = selectedImages?.sort((a, b) => b - a);
      imagesToDelete?.forEach((i) =>
        newData[selectedToggle]?.files?.splice(i, 1)
      );
      setSelectedImages([]);
      toast.success("Сохранено");
    } else {
      toast.error("Нет данных");
    }
  };

  useEffect(() => {
    !toggleData[selectedToggle]?.files?.length && setIsEdit(false);
  }, [toggleData[selectedToggle]?.files?.length]);

  return (
    <main className="lg:px-longer10 xl:px-longer-12 2xl:px-longer14 px-normal py-shorter2">
      <Toaster />
      <div className="p-shorter2 lg:p-shorter4 bg-grayCustom">
        <div className="border-[2px] border-gray-300">
          <Navbar />
          <section className="p-shorter2 lg:p-shorter4 bg-white">
            <span>
              <Icon width={30} icon="mdi:book-open-blank-variant" />
            </span>
          </section>
          <section className="p-shorter2 lg:p-shorter4 bg-grayCustom">
            {/* <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            > */}
            <div
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
              onDrop={(e) => onDropHandler(e)}
              className={`${drag ? "bg-gray-300" : "bg-white border-[2px]"} 
              w-full aspect-[4/3] relative flex justify-center items-center border-gray-300 transition-all`}
            >
              {data?.pages[selected]?.images?.length ? (
                data?.pages[selected]?.images?.map((e: any, i: number) => {
                  return (
                    <motion.img
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      variants={{
                        hidden: { opacity: 0, y: -50 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      key={i}
                      src={URL.createObjectURL(e)}
                      className="absolute z-20 rounded-md w-[50%] aspect-square"
                    />
                  );
                })
              ) : (
                <></>
              )}
              {data?.pages[selected]?.bg && (
                <img
                  className="z-10 absolute object-cover w-full h-full"
                  src={
                    data?.pages[selected]?.bg?.name
                      ? URL.createObjectURL(data?.pages[selected]?.bg)
                      : data?.pages[selected]?.bg
                  }
                />
              )}
            </div>
            {/* </motion.div> */}
            <section className="flex gap-4 items-center justify-center mt-shorter2 lg:mt-shorter4">
              <button
                onClick={() => {
                  if (selected !== 0) {
                    setSelectedAndAddPage(selected - 1);
                  }
                }}
                className="w-12 aspect-square text-black bg-gray-300 flex justify-center items-center rounded-full"
              >
                <Icon icon="material-symbols:arrow-back-ios-new" width={20} />
              </button>
              <label className="p text-blueCustom">
                Страница: {selected + 1}
              </label>
              <button
                onClick={() => setSelectedAndAddPage(selected + 1)}
                className="w-12 aspect-square text-black bg-gray-300 flex justify-center items-center rounded-full"
              >
                <Icon
                  icon="material-symbols:arrow-back-ios-new"
                  width={20}
                  rotate={2}
                />
              </button>
            </section>
          </section>
          <section className="bg-white">
            <div className="flex gap-12 border-b-[2px] border-grayCustom justify-center items-center bg-white">
              {toggleData?.map((e: any, i: number) => {
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedToggle(i)}
                    className={`py-2 transition-all outline-none text-blueCustom border-b-[2px] ${
                      selectedToggle === i
                        ? "border-blueCustom"
                        : "border-transparent"
                    }`}
                  >
                    {e?.label}
                  </button>
                );
              })}
            </div>
            <div className="p-shorter2 lg:p-shorter4 ">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={handleDeleteImages}
                    className="bg-grayCustom flex gap-2 text-black p-2 rounded-md"
                  >
                    <span>
                      <Icon width={25} icon="material-symbols:close" />
                    </span>
                    Очистить
                  </button>
                  <button
                    onClick={() => {
                      toggleData[selectedToggle]?.files?.length
                        ? setIsEdit(!isEdit)
                        : toast.error("Нет данных");
                      setSelectedImages([]);
                    }}
                    className="bg-grayCustom flex gap-2 text-black p-2 rounded-md"
                  >
                    <span>
                      <Icon width={25} icon="ic:baseline-delete-forever" />
                    </span>
                    Выбрать
                  </button>
                </div>
                <button className="flex gap-2 items-center">
                  <span>
                    <Icon icon="ant-design:fullscreen-outlined" width={20} />
                  </span>
                  <span className="hidden sm:flex">Развернуть</span>
                </button>
              </div>
            </div>
            <section className="lg:px-shorter4 px-shorter2 pb-shorter2 lg:pb-shorter4 gap-4 grid grid-cols-2 md:grid-cols-3">
              <div
                className={`relative aspect-square flex justify-center items-center text-center border-dotted border-[2px] border-black rounded-md  ${
                  isEdit ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {!isEdit && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleChange(e)}
                    className={`absolute w-full h-full opacity-0 cursor-pointer cursor-pinter`}
                  />
                )}
                Добавить
                <br />
                фотографию
              </div>
              {toggleData[selectedToggle]?.files?.length ? (
                toggleData[selectedToggle]?.files?.map((e: any, i: number) => {
                  return (
                    <div
                      key={i}
                      draggable={selectedToggle !== 2 ? true : false}
                      onDragStart={() => {
                        setSelectedImage(i);
                      }}
                      onClick={() => {
                        handleImageClick(i);
                      }}
                      className={`relative transition-all aspect-square cursor-pointer ${
                        selectedImages.includes(i) && "scale-95"
                      }`}
                    >
                      <img
                        src={e?.name ? URL.createObjectURL(e) : e}
                        className="absolute object-cover rounded-md w-full aspect-square"
                      />
                      <div
                        className={`flex justify-center items-center absolute w-full aspect-square bg-gray-200 rounded-md
                        ${
                          selectedImages.includes(i)
                            ? "opacity-50"
                            : "opacity-0"
                        }
                        `}
                      >
                        <Icon icon="material-symbols:check" width={35} />
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </section>
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
