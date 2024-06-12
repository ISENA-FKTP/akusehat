import React, { useState } from 'react';

const SelectWithInput = () => {
  const [selectedFood, setSelectedFood] = useState('');
  const [otherFood, setOtherFood] = useState('');

  const handleFoodChange = (e) => {
    const { value } = e.target;
    setSelectedFood(value);

    // Reset input value if other option is selected
    if (value !== 'Makanan Lainnya') {
      setOtherFood('');
    }
  };

  const handleOtherFoodChange = (e) => {
    setOtherFood(e.target.value);
  };

  return (
    <div className="flex flex-col -space-y-7">
  <label className="text-black font-secondary-Karla font-bold w-40 ">
    Makanan :
  </label>
  <div className="relative w-4/5 sm:w-[300px]">
    <select
      name="Makanan"
      value={selectedFood}
      onChange={handleFoodChange}
      className="p-1 mx-32 w-full  rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
    >
      <option value=""></option>
      <option value="Tidak ada">Tidak ada</option>
      <option value="Seafood">Seafood</option>
      <option value="Gandum">Gandum</option>
      <option value="Susu Sapi">Susu Sapi</option>
      <option value="Kacang-Kacangan">Kacang-Kacangan</option>
      <option value="Makanan Lainnya">Makanan Lainnya</option>
    </select>
    {/* Input for Other Food */}
    {selectedFood === 'Makanan Lainnya' && (
      <div className="absolute mt-2 left-0 right-0">
        <input
          type="text"
          value={otherFood}
          onChange={handleOtherFoodChange}
          placeholder="Keterangan Makanan Lainnya"
          className="p-1 w-full mx-32 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
        />
      </div>
    )}
  </div>
</div>
  );
};

export default SelectWithInput;
