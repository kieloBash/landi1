import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

const EditMinerMobile = ({ data, miners, setData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMiner, setIsOpenMiner] = useState(false);
  const [Cart, setCart] = useState([]);
  const [selected, setSelected] = useState({});

  const [openEdit, setOpenEdit] = useState(false);
  const [targetPrice, setTargetPrice] = useState(0);
  const [tempPrice, setTempPrice] = useState(0);

  const openModal = () => {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpenMiner(false);
    setIsOpen(false);
  }

  const toggleOpenMiner = (name) => {
    if (isOpenMiner) {
      setIsOpenMiner(false);
      setOpenEdit(false);
    } else {
      let cart = [];
      data.forEach((dataRow) => {
        if (name === dataRow.Recipient) {
          cart.push(dataRow.Price);
        }
      });
      setIsOpenMiner(true);
      setSelected({ name, cart });
    }
  };

  useEffect(() => {
    let Cart = [];

    miners.forEach((miner) => {
      let cart = [];
      data.forEach((dataRow) => {
        if (miner === dataRow.Recipient) {
          cart.push(dataRow.Price);
        }
      });
      Cart.push({ name: miner, cart });
    });

    // console.log(Cart);
    setCart(Cart);
  }, [data,miners]);

  const deletePrice = (name, index) => {
    const newData = [...data];
    let newCart = [...Cart];
    let priceToDel = 0;
    newCart.forEach((miner) => {
      if (name === miner.name) {
        priceToDel = miner.cart[index];
        miner.cart.splice(index, 1);
      }
    });
    setCart(newCart);
    for (let i = 0; i < data.length; i++) {
      if (newData[i].Recipient === name && newData[i].Price === priceToDel) {
        newData.splice(i, 1);
        i = data.length;
      }
    }
    setData(newData);
    setIsOpenMiner(false);
  };

  const toggleEditPrice = (price) => {
    // console.log(price, name, index);
    setTargetPrice(price);
    setTempPrice(price);
    setOpenEdit(true);
  };

  const confirmEdit = (price, name, index) => {
    // console.log(targetPrice,price, name, index);
    const newData = [...data];
    let newCart = [...Cart];
    newCart.forEach((miner) => {
      if (name === miner.name) {
        miner.cart[index] = targetPrice;
        miner.cart.splice(index, 1);
      }
    });
    setCart(newCart);
    for (let i = 0; i < data.length; i++) {
      if (newData[i].Recipient === name && newData[i].Price === price) {
        newData[i].Price = targetPrice;
        i = data.length;
      }
    }
    setData(newData);
    setIsOpenMiner(false);
  };

  return (
    <>
      {Cart.length > 0 ? (
        <>
          <div className="inset-0 flex items-center justify-center">
            <button
              type="button"
              onClick={openModal}
              className="py-2 px-4 flex items-center bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-36 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              <h1 className="mb-[3px] mr-[5px]">Edit Miners</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
          </div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <div className="flex items-center justify-center h-full min-h-full p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="relative flex flex-col w-full p-4 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl py-6 h-full">
                      <div className="absolute top-4 right-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          className="w-8 h-8 stroke-pink-600"
                          onClick={closeModal}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>

                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-bold leading-6 text-center text-pink-600 mb-5 mt-2"
                      >
                        Edit Miners Cart
                      </Dialog.Title>
                      <div className="flex flex-col h-full w-full overflow-y-scroll">
                        {Cart.map((miner, index) => {
                          return (
                            <div className="w-full flex flex-col " key={index}>
                              <div
                                onClick={() => toggleOpenMiner(miner.name)}
                                className="w-full h-[4rem] border bg-white border-gray-200 justify-between items-center flex px-4"
                              >
                                <h1 className="text-xl font-semibold w-10">
                                  {miner.name}
                                </h1>
                                <h1 className="text-lg font-normal">
                                  {miner.cart.length} items
                                </h1>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d={`${
                                      isOpenMiner &&
                                      selected.name === miner.name
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    }`}
                                  />
                                </svg>
                              </div>
                              {isOpenMiner && selected.name === miner.name ? (
                                <div className="w-full bg-gray-100 shadow-inner flex flex-col">
                                  {selected.cart.length > 0 ? (
                                    <>
                                      {selected.cart.map((price, indexCart) => {
                                        return (
                                          <div
                                            className="h-[3rem] w-full flex justify-between items-center p-2 px-4"
                                            key={indexCart}
                                          >
                                            <div className="text-xl text-black/80">
                                              {openEdit &&
                                              selected.name === miner.name &&
                                              price === tempPrice ? (
                                                <input
                                                  type="text"
                                                  value={targetPrice}
                                                  onChange={(e) => {
                                                    setTargetPrice(
                                                      e.target.value
                                                    );
                                                  }}
                                                />
                                              ) : (
                                                <>{price}</>
                                              )}
                                            </div>
                                            {openEdit &&
                                            selected.name === miner.name &&
                                            price === tempPrice ? (
                                              <>
                                                <div className="flex gap-2">
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                    onClick={() =>
                                                      setOpenEdit(false)
                                                    }
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M6 18L18 6M6 6l12 12"
                                                    />
                                                  </svg>
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                    onClick={() =>
                                                      confirmEdit(
                                                        price,
                                                        miner.name,
                                                        indexCart
                                                      )
                                                    }
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M4.5 12.75l6 6 9-13.5"
                                                    />
                                                  </svg>
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                <div className="flex gap-2">
                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                    onClick={() =>
                                                      toggleEditPrice(price)
                                                    }
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                    />
                                                  </svg>

                                                  <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                    onClick={() => {
                                                      deletePrice(
                                                        miner.name,
                                                        indexCart
                                                      );
                                                    }}
                                                  >
                                                    <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                  </svg>
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default EditMinerMobile;
