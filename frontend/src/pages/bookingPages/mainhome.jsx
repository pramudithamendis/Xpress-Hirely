import React from "react";

const mainhome = () => {
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
<div className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between">
  <img
    src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
    alt=""
    className="w-full h-64 object-cover mb-4"
  />
  <div>
    <h1 className="text-xl text-blue-600 font-bold">LIST1</h1>
    <p className="text-gray-600"></p>
    <p className="bg-green-500 text-white inline-block px-2 py-1 rounded-md"></p>
    <p className="font-bold"></p>
    <p className="text-sm"></p>
    <p className="text-green-500 font-bold">Free cancellation</p>
    <p className="text-green-500 text-sm">You can cancel later, so lock in this great price today!</p>
  </div>
  <div className="flex justify-between items-center mt-4">
    <div className="flex items-center">
      <span className="text-green-500 font-semibold"></span>
      <button className="bg-blue-600 text-white px-2 py-1 rounded-md ml-2"></button>
    </div>
    <div>
      {/* <span className="text-xl text-green-500 font-semibold">{price}</span> */}
      <p className="text-gray-500 text-sm">Includes taxes and fees</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2">
        <a href="/books/create">Book Now</a>
        </button>
    </div>
  </div>
</div>
</div>
)
}
export default mainhome;