import { useEffect, useState } from 'react';
import { getAllVisits, deleteVisit, Visit } from '../../models/Visit';

const Visits: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      const response = await getAllVisits();
      setVisits(response);
    } catch (error) {
      console.error('Error fetching visits:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteVisit(id);
      fetchVisits();
    } catch (error) {
      console.error('Error deleting visit:', error);
    }
  };

  return (
    <div>
      <h1>Ziyaretçiler</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Country</th>
            <th>City</th>
            <th>Cihaz</th>
            <th>IP</th>
            <th>User Agent</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((visit) => (
            <tr key={visit.id}>
              <td>{visit.id}</td>
              <td>{visit.latitude}</td>
              <td>{visit.longitude}</td>
              <td>{visit.country}</td>
              <td>{visit.city}</td>
              <td>{visit.device}</td>
              <td>{visit.ip}</td>
              <td>{visit.userAgent}</td>
              <td>
                <button onClick={() => handleDelete(visit.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Visits;
