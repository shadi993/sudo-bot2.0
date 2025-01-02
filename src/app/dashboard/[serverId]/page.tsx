import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage({ params }: { params: { serverId: string } }) {
  const { serverId } = params;
  const [serverDetails, setServerDetails] = useState<any>(null);

  useEffect(() => {
    async function fetchServerDetails() {
      try {
        const response = await fetch(`/api/servers/${serverId}`);
        const data = await response.json();
        setServerDetails(data);
      } catch (error) {
        console.error("Failed to fetch server details:", error);
      }
    }
    fetchServerDetails();
  }, [serverId]);

  return (
    <div>
      <h1>Dashboard for Server ID: {serverId}</h1>
      {serverDetails ? (
        <div>
          <h2>{serverDetails.name}</h2>
          {/* Add more server-specific details */}
        </div>
      ) : (
        <p>Loading server details...</p>
      )}
    </div>
  );
}