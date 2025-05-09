import { BriefcaseBusinessIcon, Calendar, Code2Icon, CommandIcon, LayoutDashboardIcon, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const SidebarOptions = [
    {
        name: 'Dashboard',
        icon: LayoutDashboardIcon,
        path: '/dashboard'
    },

    {
        name: 'Scheduled Interview',
        icon: Calendar,
        path: '/scheduled-interview'
    },

    {
        name: 'All Interview',
        icon: List,
        path: '/all-interview'
    },

    {
        name: 'Billing',
        icon: WalletCards,
        path: '/billing'
    },

    {
        name: 'Settings',
        icon: Settings,
        path: '/settings'
    }
]

export const InterviewType = [
    {
        title: 'Technical', 
        icon: Code2Icon
    },
    {
        title: 'Behavioural',
        icon:User2Icon
    },
    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },
    {
        title: 'Problem Solving',
        icon: Puzzle
    },
    {
        title: 'Leadership',
        icon: CommandIcon
    }
]