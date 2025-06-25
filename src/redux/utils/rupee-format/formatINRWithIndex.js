export const formatINRWithIndex = (value, index = null, formType = null) => {
    // Ensure values is a valid number
    const rawValue = String(value).replace(/,/g, '').trim();
    if (isNaN(rawValue) || rawValue === '') {
        return index !== null ? { index, formType, formattedValue: '' } : '';
    }
    
    // Format the value in INR format
    const formattedValue = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(parseFloat(rawValue));

    // Return object if index is provided, otherwise return just the formatted string
    return index !== null ? { index, formType, formattedValue } : formattedValue;
};