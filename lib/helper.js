export function formatDate(inputDateStr) {
  const inputDate = new Date(inputDateStr);

  const options = {
    year: '2-digit',
    month: 'short',
    day: '2-digit',
  };

  return inputDate.toLocaleDateString('en-US', options);
}
