import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchLicenses, deleteLicense, updateLicense } from '../../api/licenseAPI';
import LicenseTable from './LicenseTable';
import LicenseModal from './LicenseModal';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

function Dashboard() {
    const [licenses, setLicenses] = useState([]);
    const [error, setError] = useState('');
    const [currentLicense, setCurrentLicense] = useState(null);

    useEffect(() => {
        const getLicenses = async () => {
            try {
                const response = await fetchLicenses();
                setLicenses(response.data);
            } catch (err) {
                setError('Failed to fetch licenses. Please try again later.');
                console.error('Error fetching licenses:', err);
            }
        };

        getLicenses();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteLicense(id);
            setLicenses(licenses.filter(license => license._id !== id));
        } catch (err) {
            setError('Failed to delete license. Please try again later.');
            console.error('Error deleting license:', err);
        }
    };

    const handleUpdate = async (licenseData) => {
        try {
            const { data } = await updateLicense(licenseData._id, licenseData);
            setLicenses(licenses.map(lic => lic._id === licenseData._id ? data : lic));
            setCurrentLicense(null);
        } catch (err) {
            setError('Failed to update license. Please try again later.');
            console.error('Error updating license:', err);
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Vehicle No', 'Start Date', 'End Date', 'Email', 'Notes']],
            body: licenses.map(lic => [
                lic.vehicleNo,
                lic.startDate,
                lic.endDate,
                lic.email,
                lic.notes
            ]),
            styles: { fontSize: 8 },
            theme: 'grid'
        });
        doc.save('licenses.pdf');
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold">License Dashboard</h1>
                <div>
                    <button onClick={exportToPDF} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Download PDF
                    </button>
                    <Link to="/addlicense" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add License
                    </Link>
                </div>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <LicenseTable licenses={licenses} onDelete={handleDelete} onUpdate={handleUpdate} />
            {currentLicense && (
                <LicenseModal
                    isOpen={!!currentLicense}
                    onClose={() => setCurrentLicense(null)}
                    license={currentLicense}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
}

export default Dashboard;
