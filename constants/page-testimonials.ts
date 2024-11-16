interface Testimonial {
  src: string;
  quote: string;
  name: string;
  designation?: string;
  website?: string;
}

export const testimonialsEnglish: Testimonial[] = [
  {
    name: "Stock and Pricing Calculator",
    quote:
      "This app was built to help factories calculate production costs, determine selling prices, and manage stock levels effectively.",
    src: "/calculation.png",
    designation: "Built for Manufacturing Efficiency",
  },
  {
    name: "Bijoux Vintage",
    quote:
      "This e-commerce app was built to help jewelry businesses manage products, streamline sales, and offer a seamless shopping experience for customers.",
    src: "/eCommerce.png",
    designation: "Creative Director & Business Owner",
    website: "https://www.bijouxvintage.paris/",
  },
  {
    name: "Internal Document Chatbot",
    quote:
      "This chatbot was built to provide precise answers using internal documents, making it an invaluable tool for efficient and accurate information retrieval.",
    src: "/chatbot2.png",
    designation: "Knowledge Management Specialist",
  },
  {
    name: "Content Creation App",
    quote:
      "This app parses the web to search for specific keywords, rates related content, and generates articles using AI, streamlining content creation for businesses.",
    src: "/contentCreationApp.png",
    designation: "Content Strategist",
  },
  {
    name: "Travel Request and Attendance Tracker",
    quote:
      "This internal tool helps teams efficiently track attendance and manage travel requests, streamlining workflows and improving team coordination.",
    src: "/travelRequestApp.png",
    designation: "Team Operations Manager",
  },
  {
    name: "Social Media Insights Dashboard",
    quote:
      "This app extracts data from social media platforms and visualizes it in a comprehensive dashboard, providing actionable insights for businesses and teams.",
    src: "/fourth-backup.png",
    designation: "Data Analyst",
  },
  {
    name: "Claire Le Marechal",
    quote:
      "This website was designed for a photographer to showcase their portfolio, attract clients, and streamline booking processes with a stunning and user-friendly interface.",
    src: "/landingpage.png",
    designation: "Professional Photographer",
    website: "https://www.clairelemarechal.com/",
  },
  {
    name: "Community Jameel Website",
    quote:
      "This website was built to showcase Community Jameel's initiatives, projects, and global impact, with a focus on accessibility, usability, and storytelling.",
    src: "/cj.png",
    designation: "Nonprofit Organization",
  },
  {
    name: "Accounting and Finance Management App",
    quote:
      "This app simplifies financial management, enabling accountants to track expenses, manage budgets, and generate reports with ease.",
    src: "/finance.png",
    designation: "Accounting Professional",
  },
  {
    name: "Jameel Index MIT Website",
    quote:
      "This website was developed to present the Jameel Index's data and insights in an engaging, interactive, and user-friendly format, supporting global research initiatives.",
    src: "/jx.png",
    designation: "Research and Data Visualization Platform",
  }
];
