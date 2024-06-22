import React, { useState } from 'react';

const SelectWithInputObat = () => {
    const [selectedObat, setSelectedObat] = useState('');
    const [otherObat, setOtherObat] = useState('');

    const handleObatChange = (e) => {
        const { value } = e.target;
        setSelectedObat(value);

        // Reset input value if other option is selected
        if (value !== 'Obat-Obatan lainnya') {
            setOtherObat('');
        }
    };

    const handleOtherObatChange = (e) => {
        setOtherObat(e.target.value);
    };

    return (
        <div className="flex flex-col -space-y-5">
            <label className="text-black font-secondary-Karla font-bold w-40">
                Obat :
            </label>
            <div className="relative w-full sm:w-[300px]">
                <select
                    name="Obat"
                    value={selectedObat}
                    onChange={handleObatChange}
                    className="p-1 mx-32 w-full  rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                >
                    <option value=""></option>
                    <option value="Antibiotik">Antibiotik</option>
                    <option value="Antiinflamasi">Antiinflamasi</option>
                    <option value="Non Steroid">Non Steroid</option>
                    <option value="Kortikosteroid">Kortikosteroid</option>
                    <option value="Insulin">Insulin</option>
                    <option value="Obat-Obatan lainnya">Obat-Obatan lainnya</option>
                </select>
                {/* Input for Other Obat */}
                {selectedObat === 'Obat-Obatan lainnya' && (
                    <div className="absolute mt-2 left-0 right-0">
                        <input
                            type="text"
                            value={otherObat}
                            onChange={handleOtherObatChange}
                            placeholder="Keterangan Obat Lainnya"
                            className="p-1 w-full mx-32 rounded-md border border-black font-secondary-Karla font-medium text-black focus:outline-none focus:border-blue-500"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectWithInputObat;
