// Generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Format a date (YYYY-MM) to a more readable format (Month Year)
export function formatDate(dateString: string): string {
  if (!dateString) return 'Present';
  
  const date = new Date(dateString + '-01'); // Add day to make it a valid date
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// Convert MM-YYYY to YYYY-MM for input fields
export function formatDateForInput(dateString: string): string {
  if (!dateString) return '';
  
  const [month, year] = dateString.split('-');
  return `${year}-${month}`;
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Format phone number
export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format according to length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phoneNumber;
}

// Truncate text if it's too long
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Check if an object has changed compared to another
export function hasChanges(oldObj: any, newObj: any): boolean {
  return JSON.stringify(oldObj) !== JSON.stringify(newObj);
} 