import React from 'react';
import InsuranceModal from './InsuranceModal';

function InsuranceTable({ insurances, onDelete, onUpdate }) {
  const [selectedInsurance, setSelectedInsurance] = React.useState(null);
  const [deleteCandidate, setDeleteCandidate] = React.useState(null);

  const openModal = (insurance) => {
    setSelectedInsurance(insurance);
  };

  const closeModal = () => {
    setSelectedInsurance(null);
  };

  const openDeleteConfirm = (insuranceId) => {
    setDeleteCandidate(insuranceId);
  };

  const closeDeleteConfirm = () => {
    setDeleteCandidate(null);
  };

  const confirmDelete = () => {
    onDelete(deleteCandidate);
    closeDeleteConfirm();
  };

  const handleUpdate = (updatedData) => {
    onUpdate(updatedData);
    closeModal();
  };

  if (insurances.length === 0) {
    return <p>No insurances found.</p>;
  }

  return (
    <>
      {selectedInsurance && (
        <InsuranceModal
          isOpen={!!selectedInsurance}
          onClose={closeModal}
          insurance={selectedInsurance}
          onUpdate={handleUpdate}
        />
      )}
      {deleteCandidate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Are you sure?</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this insurance? This action cannot be undone.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={confirmDelete}>
                  Delete
                </button>
                <button className="mt-3 px-4 py-2 bg-gray-300 text-gray-900 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={closeDeleteConfirm}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Insurance Provider
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Policy Number
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Policy Type
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              End Date
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Premium Amount
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {insurances.map((insurance) => (
            <tr key={insurance._id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {insurance.insuranceProvider}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {insurance.policyNumber}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {insurance.policyType}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {new Date(insurance.startDate).toLocaleDateString()}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {new Date(insurance.endDate).toLocaleDateString()}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {insurance.premiumAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex space-x-4">
                <button
                  onClick={() => openModal(insurance)}
                  className="text-blue-600 hover:text-blue-900">
                  Update
                </button>
                <button
                  onClick={() => openDeleteConfirm(insurance._id)}
                  className="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default InsuranceTable;
