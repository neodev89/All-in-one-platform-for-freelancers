import dynamic from "next/dynamic"

const LazyDashboardComponent = dynamic(() => import("./dashboard-component"));

export default async function DashBoard() {

    return (
        <LazyDashboardComponent />
    )
}