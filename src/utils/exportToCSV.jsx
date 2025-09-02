export const exportToCSV = (data) => {
    const headers = data[0];
  
    const csvRows = [
      headers.join(','),
      ...data.slice(1).map(row => row.map(field => {
        return `"${String(field).replace(/"/g, '""')}"`;
      }).join(','))
    ];
  
    const csvString = csvRows.join('\n');
  
    return csvString
  };
  