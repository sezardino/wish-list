import {
  Bell,
  Calendar,
  CheckCircle,
  CloudOff,
  Database,
  FileText,
  List,
  Phone,
  Search,
  Settings,
  Share,
  Tag,
} from "lucide-react";

export const homeHeroSection = {
  title: "Create the Perfect Wish List and Manage It with Ease!",
  subtitle: `Our app allows you to easily create and organize wish lists, share them with friends, and receive notifications about important events and discounts.`,
  subHeadline:
    "Take control of your wishes. Manage lists, share them, and receive reminders.",
  cta: "Explore Features",
};

export const homeFeaturesSection = {
  title: "Our Core Features",
  badge: "Features",
  subtitle:
    "Discover the tools that make blogging simple and effective. Each feature is designed to help you create, share, and grow.",
  features: [
    {
      name: "Create and Manage Lists",
      description:
        "Easily create and organize your wish lists. Add, edit, and delete items as needed.",
      icon: List,
    },
    {
      name: "Share Your Lists",
      description:
        "Share your lists with friends and family via link or email. Control who can view or edit your lists.",
      icon: Share,
    },
    {
      name: "Receive Reminders",
      description:
        "Get notifications about important dates and discounts related to your wish list items.",
      icon: Bell,
    },
    {
      name: "Track Your Wishes",
      description:
        "Keep track of your wishes and mark them as completed once fulfilled.",
      icon: CheckCircle,
    },
    {
      name: "Organize by Categories",
      description:
        "Categorize items in your lists to keep things organized and easy to find.",
      icon: Tag,
    },
    {
      name: "Offline Access",
      description:
        "Access your lists even when you’re offline. No need to worry about losing your data.",
      icon: CloudOff,
    },
    {
      name: "Responsive Design",
      description:
        "Use the app seamlessly across all devices, whether on desktop, tablet, or mobile.",
      icon: Phone,
    },
    {
      name: "Customizable Notifications",
      description:
        "Customize your notification preferences for different events and updates.",
      icon: Settings,
    },
    {
      name: "Integrate with Calendar",
      description:
        "Sync your wish list items and reminders with your calendar to keep track of important dates.",
      icon: Calendar,
    },
    {
      name: "Wishlist Templates",
      description:
        "Use pre-made templates to quickly create lists for various occasions like birthdays or holidays.",
      icon: FileText,
    },
    {
      name: "Search and Filter",
      description:
        "Easily search for items and filter your lists by various criteria like categories, tags, or priorities.",
      icon: Search,
    },
    {
      name: "Data Backup",
      description:
        "Automatically back up your lists and data to ensure you never lose your information.",
      icon: Database,
    },
  ],
};
