export const saveToLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getFromLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
};

function convertArrayToCSV(arr) {
  const headers = Object.keys(arr[0]);
  const csvRows = [headers.join(",")];

  for (const row of arr) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
}

export function downloadCSVFile(data, filename) {
  const csvData = convertArrayToCSV(data);
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const locales = {
  English: "en",
  French: "fr",
  Spanish: "es",
  German: "de",
};
