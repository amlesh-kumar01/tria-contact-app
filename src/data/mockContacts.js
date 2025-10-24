// Mock contact data for the application (Indian contacts)
export const mockContacts = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    company: "Tata Consultancy Services",
    position: "Software Engineer",
    address: "A-12, South Extension, New Delhi, DL 110049",
    dateAdded: "2024-01-10"
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@yahoo.in",
    phone: "+91 91234 56789",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    company: "Infosys",
    position: "UX Designer",
    address: "Flat 5B, Koramangala, Bengaluru, KA 560034",
    dateAdded: "2024-01-22"
  },
  {
    id: 3,
    name: "Rahul Gupta",
    email: "rahul.gupta@wipro.com",
    phone: "+91 99876 54321",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    company: "Wipro",
    position: "Project Manager",
    address: "23 Marine Drive, Mumbai, MH 400020",
    dateAdded: "2024-02-05"
  },
  {
    id: 4,
    name: "Anjali Mehta",
    email: "anjali.mehta@hcl.com",
    phone: "+91 90123 45678",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    company: "HCL Technologies",
    position: "Data Scientist",
    address: "8 Banjara Hills, Hyderabad, TS 500034",
    dateAdded: "2024-02-18"
  },
  {
    id: 5,
    name: "Vikram Patel",
    email: "vikram.patel@flipkart.com",
    phone: "+91 97654 32109",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    company: "Flipkart",
    position: "Backend Engineer",
    address: "Plot 45, Sector 17, Gurugram, HR 122001",
    dateAdded: "2024-03-02"
  },
  {
    id: 6,
    name: "Sanya Reddy",
    email: "sanya.reddy@zomato.com",
    phone: "+91 88776 55443",
    avatar: "https://images.unsplash.com/photo-1545996124-1b3b84b3b6d6?w=150&h=150&fit=crop&crop=face",
    company: "Zomato",
    position: "Product Manager",
    address: "12 Jubilee Hills Rd, Hyderabad, TS 500033",
    dateAdded: "2024-03-12"
  },
  {
    id: 7,
    name: "Karan Kapoor",
    email: "karan.kapoor@ola.in",
    phone: "+91 91200 33445",
    avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    company: "Ola",
    position: "DevOps Engineer",
    address: "5 Nehru Place, New Delhi, DL 110019",
    dateAdded: "2024-03-20"
  },
  {
    id: 8,
    name: "Neha Verma",
    email: "neha.verma@byjus.com",
    phone: "+91 98811 22334",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    company: "BYJU'S",
    position: "Content Strategist",
    address: "101 Bandra Kurla Complex, Mumbai, MH 400051",
    dateAdded: "2024-03-28"
  },
  {
    id: 9,
    name: "Rohit Kumar",
    email: "rohit.kumar@icici.com",
    phone: "+91 97000 11223",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    company: "ICICI Bank",
    position: "Relationship Manager",
    address: "67 Park Street, Kolkata, WB 700016",
    dateAdded: "2024-04-06"
  },
  {
    id: 10,
    name: "Sneha Bose",
    email: "sneha.bose@kotak.com",
    phone: "+91 95555 66778",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    company: "Kotak Mahindra Bank",
    position: "Financial Analyst",
    address: "22 Park Street, Kolkata, WB 700016",
    dateAdded: "2024-04-15"
  },
  {
    id: 11,
    name: "Arjun Nair",
    email: "arjun.nair@larsentoubro.com",
    phone: "+91 94444 55667",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    company: "Larsen & Toubro",
    position: "Site Engineer",
    address: "Plot 9, Vikhroli, Mumbai, MH 400079",
    dateAdded: "2024-05-01"
  },
  {
    id: 12,
    name: "Meera Joshi",
    email: "meera.joshi@tcs.com",
    phone: "+91 93333 22110",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    company: "Cognizant",
    position: "HR Manager",
    address: "88 MG Road, Pune, MH 411001",
    dateAdded: "2024-05-10"
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