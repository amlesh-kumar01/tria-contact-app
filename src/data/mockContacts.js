// Mock contact data for the application
export const mockContacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    company: "Tech Corp",
    position: "Software Engineer",
    address: "123 Main St, New York, NY 10001",
    dateAdded: "2024-01-15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    company: "Design Studio",
    position: "UI/UX Designer",
    address: "456 Oak Ave, San Francisco, CA 94102",
    dateAdded: "2024-01-20"
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+1 (555) 345-6789",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    company: "Marketing Plus",
    position: "Marketing Manager",
    address: "789 Pine Rd, Chicago, IL 60601",
    dateAdded: "2024-02-01"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    company: "Data Analytics Inc",
    position: "Data Scientist",
    address: "321 Elm St, Boston, MA 02101",
    dateAdded: "2024-02-10"
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 567-8901",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    company: "Finance Solutions",
    position: "Financial Analyst",
    address: "654 Maple Ave, Seattle, WA 98101",
    dateAdded: "2024-02-15"
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    phone: "+1 (555) 678-9012",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    company: "Health Tech",
    position: "Product Manager",
    address: "987 Cedar Ln, Austin, TX 73301",
    dateAdded: "2024-03-01"
  },
  {
    id: 7,
    name: "James Miller",
    email: "james.miller@example.com",
    phone: "+1 (555) 789-0123",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    company: "Engineering Works",
    position: "DevOps Engineer",
    address: "147 Birch St, Denver, CO 80201",
    dateAdded: "2024-03-10"
  },
  {
    id: 8,
    name: "Lisa Garcia",
    email: "lisa.garcia@example.com",
    phone: "+1 (555) 890-1234",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    company: "Creative Agency",
    position: "Creative Director",
    address: "258 Spruce Ave, Miami, FL 33101",
    dateAdded: "2024-03-15"
  },
  {
    id: 9,
    name: "Robert Taylor",
    email: "robert.taylor@example.com",
    phone: "+1 (555) 901-2345",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    company: "Consulting Group",
    position: "Business Consultant",
    address: "369 Willow Dr, Portland, OR 97201",
    dateAdded: "2024-04-01"
  },
  {
    id: 10,
    name: "Amanda Wilson",
    email: "amanda.wilson@example.com",
    phone: "+1 (555) 012-3456",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    company: "Legal Partners",
    position: "Legal Advisor",
    address: "741 Oak St, Phoenix, AZ 85001",
    dateAdded: "2024-04-10"
  },
  {
    id: 11,
    name: "Christopher Lee",
    email: "christopher.lee@example.com",
    phone: "+1 (555) 123-7890",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    company: "Architecture Firm",
    position: "Senior Architect",
    address: "852 Pine St, Las Vegas, NV 89101",
    dateAdded: "2024-04-15"
  },
  {
    id: 12,
    name: "Michelle Rodriguez",
    email: "michelle.rodriguez@example.com",
    phone: "+1 (555) 234-8901",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    company: "Medical Center",
    position: "Healthcare Administrator",
    address: "963 Elm Ave, Nashville, TN 37201",
    dateAdded: "2024-05-01"
  }
];

// Function to generate avatar initials as fallback
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};

// Function to format phone numbers
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
  }
  return phone;
};

// Function to validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate phone number
export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};