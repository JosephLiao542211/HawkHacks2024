import React, { useState } from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onAddItem: (item: { param1: string; param2: string; param3: string }) => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onAddItem }) => {
  const [stage, setStage] = useState(1);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({ param1: '', param2: '', param3: '' });

  const handleImageClick = (imageName: string) => {
    if (selectedImages.includes(imageName)) {
      setSelectedImages(selectedImages.filter(image => image !== imageName));
    } else {
      setSelectedImages([...selectedImages, imageName]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleAddItem = () => {
    onAddItem(formData);
    setFormData({ param1: '', param2: '', param3: '' });
    onClose();
  };

  const handleStage2InputChange = (imageName: string, value: string) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [imageName]: value,
    }));
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#141416] p-4 rounded-2xl shadow-lg w-full max-w-[50%] relative">
        <button
          className="absolute top-5 right-10 text-gray-500 hover:text-gray-700 text-3xl p-2"
          onClick={() => { setStage(1); onClose(); }}
        >
          &times;
        </button>

        {stage === 1 && (
          <div>
            <div className='ht1 text-[48px] ml-5'>
              Create New Goal
            </div>
            <div className='h2 text-[16px] w-[75%] ml-5'>
              Fill in the parameters below and issue a challenge to everyone on Better. Remember, always bet on yourself!
            </div>
            <div className="mt-4 p-4">
              <input
                type="text"
                name="param1"
                value={formData.param1}
                onChange={handleInputChange}
                placeholder="Param 1"
                className="w-full mb-2 p2 p-2 border border-gray-300 rounded text-black"
              />
              <input
                type="text"
                name="param2"
                value={formData.param2}
                onChange={handleInputChange}
                placeholder="Param 2"
                className="w-full mb-2 p2 p-2 border border-gray-300 rounded text-black"
              />
              <input
                type="text"
                name="param3"
                value={formData.param3}
                onChange={handleInputChange}
                placeholder="Param 3"
                className="w-full mb-2 p-2 border border-gray-300 rounded text-black"
              />
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded ml-5"
              onClick={() => setStage(2)}
            >
              Next
            </button>
          </div>
        )}

        {stage === 2 && (
          <div>
            <div className='ht1 text-[48px] ml-5'>
              Task
            </div>
            <div className='h2 text-[16px] w-[75%] ml-5'>
              Select Your Challenge
            </div>
            <div className='grid grid-cols-4 gap-4'>
              <img
                src="1.png"
                alt="Image 1"
                className={`w-64 h-auto transition-transform transform hover:scale-125 ${selectedImages.includes('1.png') ? 'border-4 border-blue-500' : ''}`}
                onClick={() => handleImageClick('1.png')}
              />
              <img
                src="2.png"
                alt="Image 2"
                className={`w-64 h-auto transition-transform transform hover:scale-125 ${selectedImages.includes('2.png') ? 'border-4 border-blue-500' : ''}`}
                onClick={() => handleImageClick('2.png')}
              />
              <img
                src="3.png"
                alt="Image 3"
                className={`w-64 h-auto transition-transform transform hover:scale-125 ${selectedImages.includes('3.png') ? 'border-4 border-blue-500' : ''}`}
                onClick={() => handleImageClick('3.png')}
              />
              <img
                src="4.png"
                alt="Image 4"
                className={`w-64 h-auto transition-transform transform hover:scale-125 ${selectedImages.includes('4.png') ? 'border-4 border-blue-500' : ''}`}
                onClick={() => handleImageClick('4.png')}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-4 mx-5">
              {selectedImages.map(imageName => (
                <div key={imageName} className="mb-4">
                  <div className="p2 mb-2">
                    {imageName === '1.png' && 'Reps of Pushups'}
                    {imageName === '2.png' && 'Reps of Squats'}
                    {imageName === '3.png' && 'Distance of Run (km) '}
                    {imageName === '4.png' && 'Reps of Situps'}
                  </div>
                  <input
                    type="number"
                    placeholder="Enter number..."
                    value={inputValues[imageName] || ''}
                    onChange={(e) => handleStage2InputChange(imageName, e.target.value)}
                    className="w-full p-2 text-black border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>

            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded ml-5"
              onClick={() => setStage(1)}
            >
              Back
            </button>

            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => setStage(3)}
            >
              Next
            </button>
          </div>
        )}

        {stage === 3 && (
          <div>
            <div className='ht1 text-[48px] ml-5'>
              Confirm Your Goal
            </div>
            <div className='h2 text-[16px] w-[75%] ml-5'>
              Review the details of your goal and confirm to create it.
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded ml-5"
              onClick={() => setStage(2)}
            >
              Back
            </button>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded ml-2"
              onClick={handleAddItem}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
