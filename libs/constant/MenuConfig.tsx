import {LeftSideMenu} from "../Entity/LeftSideMenu";
import {
    DashboardOutlined,
    DeploymentUnitOutlined, EditOutlined, FileAddOutlined, MessageOutlined, ProjectOutlined,
    ReadOutlined,
    SolutionOutlined,
    TeamOutlined
} from "@ant-design/icons";
import {Role} from "../enum/Role";


const overviewFunctions: LeftSideMenu = {
    href: "/dashboard/manager",
    label: "Overview",
    icon: <DashboardOutlined/>,
    parentNodeLabel:"",
}

const studentFunctions: LeftSideMenu = {
    href: "",
    label: "Student",
    icon: <SolutionOutlined/>,
    parentNodeLabel:"",
    subMenu: [
        {
            href: "/dashboard/manager/students",
            label: "Student List",
            icon: <TeamOutlined/>,
            parentNodeLabel:"Student",
        }
    ]
}

const teacherFunctions: LeftSideMenu = {
    href: "teachers",
    label: "Teacher",
    icon: <DeploymentUnitOutlined/>,
    parentNodeLabel:"",
    subMenu: [
        {
            href: "/dashboard/manager/teachers",
            label: "Teacher List",
            icon: <TeamOutlined/>,
            parentNodeLabel:"Teacher",
        }
    ]
}

const courseFunctions: LeftSideMenu = {
    href: "courses",
    label: "Course",
    icon: <ReadOutlined/>,
    parentNodeLabel:"",
    subMenu: [
        {
            href: "/dashboard/manager/courses",
            label: "All Courses",
            icon: <ProjectOutlined/>,
            parentNodeLabel:"Course",
        },
        {
            href: "/dashboard/manager/courses/add-course",
            label: "Add Course",
            icon: <FileAddOutlined/>,
            parentNodeLabel:"Course",
        },
        {
            href: "/dashboard/manager/courses/edit-course",
            label: "Edit Course",
            icon: <EditOutlined/>,
            parentNodeLabel:"Course",
        },
    ]
}

const messageFunctions: LeftSideMenu = {
    href: "/dashboard/manager/message",
    label: "Message",
    icon: <MessageOutlined/>,
    parentNodeLabel:"",
}

export const routes: Map<Role, LeftSideMenu[]> = new Map([
    [Role.MANAGER, [overviewFunctions, studentFunctions, teacherFunctions, courseFunctions, messageFunctions]],
]);