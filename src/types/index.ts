export type EventFormat = 'On-Ground' | 'Online' | 'Hybrid';

export type EventStatus = 'Published' | 'Pending Approval' | 'Completed' | 'Cancelled';

export type EventCategory = 'Conference' | 'Cybersecurity' | 'Hackathon' | 'FinTech' | 'Webinar' | 'AI & ML' | 'Robotics' | 'Workshop' | 'Summit';

export interface EventItem {
  id: string; // e.g. 'EVT-8821'
  title: string;
  category: string;
  format: EventFormat;
  status: EventStatus;
  date: string;
  time: string;
  fullDateTime: string;
  organizer: {
    name: string;
    isVerified: boolean;
    avatarUrl?: string;
  };
  metrics?: {
    registered: number;
    capacity: number;
    grossCollection: number;
    revenue: number;
    platformTake?: number;
  };
  location?: string;
  description?: string;
  tickets?: {
    name: string;
    price: number;
    sold: number;
    total: number;
  }[];
}

export type SidebarSection = 
  | 'event-manage' 
  | 'career' 
  | 'sheem-hub' 
  | 'account-management' 
  | 'feed-moderation' 
  | 'diagnostics-tickets';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert' | 'event';
}

export interface MetricCardData {
  title: string;
  value: string;
  subText?: string;
  subType?: 'growth' | 'rate' | 'take' | 'progress';
  progress?: number;
  badge?: string;
  hasViewBtn?: boolean;
}

// Backward-compatible types
export type ActivityType = 'Event' | 'Job' | 'Scheme';
export type ActivityStatus = 'UPCOMING' | 'ONGOING' | 'REVIEWING' | 'CLOSED' | 'DRAFT';

export interface ActivityItem {
  id: string;
  orderNumber: number;
  title: string;
  subtitle: string;
  category: string;
  type: ActivityType;
  metric: string;
  metricDetail?: {
    current?: number;
    total?: number;
    unit?: string;
  };
  datePosted: string;
  status: ActivityStatus;
  active: boolean;
  avatarGradient?: string;
  badgeIcon?: string;
  tags?: string[];
  link?: string;
}

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  description: string;
  primaryAction: {
    text: string;
    icon?: string;
  };
  secondaryAction: {
    text: string;
  };
}
