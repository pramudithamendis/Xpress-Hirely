import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchInsurances, deleteInsurance, updateInsurance } from '../../api/licenseAPI';
import InsuranceTable from './InsuranceTable';
import InsuranceModal from './InsuranceModal';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

function InsuranceDashboard() {
    const [insurances, setInsurances] = useState([]);
    const [error, setError] = useState('');
    const [currentInsurance, setCurrentInsurance] = useState(null);

    useEffect(() => {
        const getInsurances = async () => {
            try {
                const { data } = await fetchInsurances();
                setInsurances(data);
            } catch (err) {
                setError('Failed to fetch insurances. Please try again later.');
                console.error('Error fetching insurances:', err);
            }
        };

        getInsurances();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteInsurance(id);
            setInsurances(prevInsurances => prevInsurances.filter(ins => ins._id !== id));
        } catch (err) {
            setError('Failed to delete insurance. Please try again later.');
            console.error('Error deleting insurance:', err);
        }
    };

    const handleUpdate = async (insuranceData) => {
        try {
            const { data } = await updateInsurance(insuranceData._id, insuranceData);
            setInsurances(prevInsurances => prevInsurances.map(ins => ins._id === insuranceData._id ? data : ins));
            setCurrentInsurance(null);
        } catch (err) {
            setError('Failed to update insurance. Please try again later.');
            console.error('Error updating insurance:', err);
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Insurance Provider', 'Policy Number', 'Policy Type', 'Coverage Details', 'Start Date', 'End Date', 'Premium Amount', 'Email', 'Status']],
            body: insurances.map(ins => [
                ins.insuranceProvider,
                ins.policyNumber,
                ins.policyType,
                ins.coverageDetails,
                ins.startDate,
                ins.endDate,
                ins.premiumAmount,
                ins.email,
                ins.status
            ]),
            styles: { fontSize: 8 },
            theme: 'grid'
        });
        doc.save('insurances.pdf');
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold">Insurance Dashboard</h1>
                <div>
                    <button onClick={exportToPDF} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Download PDF
                    </button>
                    <Link to="/addinsurance" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add Insurance
                    </Link>
                </div>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <InsuranceTable insurances={insurances} onDelete={handleDelete} onUpdate={handleUpdate} />
            {currentInsurance && (
                <InsuranceModal
                    isOpen={!!currentInsurance}
                    onClose={() => setCurrentInsurance(null)}
                    insurance={currentInsurance}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
}

export default InsuranceDashboard;
