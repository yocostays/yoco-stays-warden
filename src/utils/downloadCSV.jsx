
export const downloadCSV = (csvString, fileName) => {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
  
    link.setAttribute('href', url);
    link.setAttribute('download', fileName || 'candidates.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  